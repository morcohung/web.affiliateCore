using System;
using System.Collections;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Threading;
using Dapper;

namespace Affiliate.Repositories.DAL
{
    public static class DataTableHelper
    {
        private static readonly Type[] SupportedColumnTypes =
        {
            typeof (long), // bigint
            typeof (byte[]), // binary, varbinary(max), image, rowversion, timestamp, varbinary
            typeof (bool), // bit
            typeof (string), // char, nchar, ntext, nvarchar, text, varchar
            typeof (char[]), // char, nchar, ntext, nvarchar, text, varchar
            typeof (DateTime), // date, datetime, datetime2, smalldatetime
            typeof (DateTimeOffset), // datetimeoffset
            typeof (decimal), // decimal, money, numeric, smallmoney
            typeof (double), // float
            typeof (int), // int
            typeof (float), // real
            typeof (short), // smallint
            typeof (TimeSpan), // time
            typeof (byte), // tinyint
            typeof (Guid) // uniqueidentifier
        };

        private static readonly ConcurrentDictionary<Type, List<DataColumnInfo>> ColumnInfoCache =
            new ConcurrentDictionary<Type, List<DataColumnInfo>>();

        private static readonly ConcurrentDictionary<Type, string> TableTypeNameCache =
            new ConcurrentDictionary<Type, string>();

        public static DataTable ToDataTable<TSource>(this IEnumerable<TSource> items)
        {
            return ToDataTable(items, typeof(TSource));
        }

        public static DataTable ToDataTable(IEnumerable items, Type sourceType)
        {
            var dataTable = BuildDataTable(sourceType);
            if (items == null)
            {
                return dataTable;
            }

            InsertItems(dataTable, items, sourceType);
            return dataTable;
        }

        private static DataTable BuildDataTable(Type sourceType)
        {
            var dataTable = new DataTable();
            dataTable.SetTableTypeNameIfExists(sourceType);

            var columnInfo = GetColumnInfo(sourceType);
            foreach (var info in columnInfo)
            {
                dataTable.Columns.Add(info.ColumnName, info.ColumnType);
            }

            return dataTable;
        }

        private static void InsertItems(DataTable dataTable, IEnumerable items, Type sourceType)
        {
            var columnInfo = GetColumnInfo(sourceType);
            var values = new object[columnInfo.Count];

            foreach (var item in items)
            {
                var index = 0;
                foreach (var info in columnInfo)
                {
                    values[index++] = info.GetValue.Invoke(item);
                }

                dataTable.Rows.Add(values);
            }
        }

        private static List<DataColumnInfo> GetColumnInfo(Type sourceType)
        {
            return ColumnInfoCache.GetOrAdd(sourceType, BuildColumnInfo);
        }

        private static List<DataColumnInfo> BuildColumnInfo(Type sourceType)
        {
            var lockTaken = false;

            try
            {
                Monitor.Enter(ColumnInfoCache, ref lockTaken);

                List<DataColumnInfo> result;
                if (ColumnInfoCache.TryGetValue(sourceType, out result))
                {
                    return result;
                }

                result = new List<DataColumnInfo>();
                var columnType = Nullable.GetUnderlyingType(sourceType) ?? sourceType;
                if (SupportedColumnTypes.Contains(columnType))
                {
                    // single column
                    result.Add(new DataColumnInfo(columnType, "Item", value => value)); // return the value directly
                }
                else if (sourceType.IsClass)
                {
                    var descriptors = TypeDescriptor.GetProperties(sourceType);
                    foreach (
                        var descriptor in
                            descriptors.Cast<PropertyDescriptor>()
                                .Where(
                                    descriptor => false == descriptor.Attributes.OfType<NoConversionAttribute>().Any()))
                    {
                        columnType = Nullable.GetUnderlyingType(descriptor.PropertyType) ?? descriptor.PropertyType;
                        if (columnType.IsEnum)
                        {
                            // always use int to instead of enum
                            columnType = Enum.GetUnderlyingType(columnType);
                        }

                        if (false == SupportedColumnTypes.Contains(columnType))
                        {
                            throw new InvalidOperationException(
                                $"Cannot convert the property to SQL Data Type. Type: {sourceType}, Property Name: {descriptor.Name}, Property Type: {descriptor.PropertyType}");
                        }

                        result.Add(new DataColumnInfo(columnType, descriptor.Name, descriptor.GetValue));
                    }
                }
                else
                {
                    throw new InvalidOperationException(
                        $"The type {sourceType} is unsupported to convert to DataTable. Only supports class or SQL Types.");
                }

                if (false == result.Any())
                {
                    throw new InvalidOperationException(
                        $"The type {sourceType} has no property to convert to DataTable.");
                }

                return result;
            }
            finally
            {
                if (lockTaken)
                    Monitor.Exit(ColumnInfoCache);
            }
        }

        private static void SetTableTypeNameIfExists(this DataTable dataTable, Type sourceType)
        {
            var typeName = TableTypeNameCache.GetOrAdd(sourceType, key =>
            {
                var lockTaken = false;
                try
                {
                    Monitor.Enter(TableTypeNameCache, ref lockTaken);

                    string name;
                    if (TableTypeNameCache.TryGetValue(key, out name))
                    {
                        return name;
                    }

                    // Because DbTableTypeAttribute doesn't allow multiple, so should use SingleOrDefault().
                    return
                        TypeDescriptor.GetAttributes(key)
                            .Cast<Attribute>()
                            .OfType<DbTableTypeAttribute>()
                            .SingleOrDefault()?
                            .Name;
                }
                finally
                {
                    if (lockTaken)
                        Monitor.Exit(TableTypeNameCache);
                }
            });

            if (false == string.IsNullOrEmpty(typeName))
                dataTable.SetTypeName(typeName);
        }

        private class DataColumnInfo
        {
            public DataColumnInfo(Type columnType, string columnName, Func<object, object> getValue)
            {
                ColumnType = columnType;
                ColumnName = columnName;
                GetValue = getValue;
            }

            public Type ColumnType { get; }
            public string ColumnName { get; }
            public Func<object, object> GetValue { get; }
        }
    }
}
