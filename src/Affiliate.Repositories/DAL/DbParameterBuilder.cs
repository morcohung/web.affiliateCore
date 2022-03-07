using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using Dapper;

namespace Affiliate.Repositories.DAL
{
    public static class DbParameterBuilder
    {
        public static DbParameterBuilder<object> Create()
        {
            var builder = new DbParameterBuilder<object>(null);
            return builder;
        }

        public static DbParameterBuilder<TModel> Create<TModel>(TModel obj, bool excludeAll = false)
        {
            var builder = new DbParameterBuilder<TModel>(obj).ExcludeAll(excludeAll);
            return builder;
        }
    }

    public class DbParameterBuilder<TModel>
    {
        #region Static Members

        private static string GetPropertyName<TPorperty>(Expression<Func<TModel, TPorperty>> expression)
        {
            var stack = new Stack<string>();

            var temp = expression.Body;
            while (temp != null)
            {
                switch (temp.NodeType)
                {
                    case ExpressionType.MemberAccess:
                        var me = (MemberExpression)temp;
                        stack.Push($".{me.Member.Name}");
                        temp = me.Expression;
                        break;
                    case ExpressionType.Parameter:
                        temp = null;
                        break;
                    default:
                        throw new InvalidOperationException(
                            "Invalid expression, only ExpressionType.MemberAccess is supported.");
                }
            }

            return stack.Count == 0 ? string.Empty : stack.Aggregate((left, right) => left + right).Trim('.');
        }

        private static ConcurrentDictionary<Type, PropertyDescriptor[]> PropertyDescriptorCache =
            new ConcurrentDictionary<Type, PropertyDescriptor[]>();

        #endregion

        #region Private Members

        private readonly TModel _value;

        private readonly Dictionary<string, Func<TModel, object>> _valueFactories =
            new Dictionary<string, Func<TModel, object>>();

        private readonly Dictionary<string, Func<object>> _additionParameters = new Dictionary<string, Func<object>>();

        private readonly HashSet<string> _includedList = new HashSet<string>();
        private readonly HashSet<string> _excludedList = new HashSet<string>();
        private readonly PropertyDescriptor[] _propertyDescriptors;

        private bool _excludeAll;

        #endregion

        #region Internal Members

        internal DbParameterBuilder(TModel value)
        {
            _value = value;
            _propertyDescriptors = PropertyDescriptorCache.GetOrAdd(typeof(TModel), key =>
            {
                var lockTaken = false;

                try
                {
                    Monitor.Enter(PropertyDescriptorCache, ref lockTaken);

                    PropertyDescriptor[] descriptors;
                    if (PropertyDescriptorCache.TryGetValue(key, out descriptors))
                    {
                        return descriptors;
                    }

                    return TypeDescriptor.GetProperties(key).Cast<PropertyDescriptor>().ToArray();
                }
                finally
                {
                    if (lockTaken)
                        Monitor.Exit(PropertyDescriptorCache);
                }
            });
        }

        #endregion

        #region Public Members

        public DbParameterBuilder<TModel> Include<TProperty>(Expression<Func<TModel, TProperty>> expression,
            Func<TModel, object> valueFactory = null)
        {
            var propertyName = GetPropertyName(expression);
            _includedList.Add(propertyName);

            if (valueFactory != null)
            {
                _valueFactories.Add(propertyName, valueFactory);
            }

            return this;
        }

        public DbParameterBuilder<TModel> Exclude<TProperty>(Expression<Func<TModel, TProperty>> expression)
        {
            var propertyName = GetPropertyName(expression);
            _excludedList.Add(propertyName);

            return this;
        }

        public DbParameterBuilder<TModel> AddValueFactory<TProperty>(Expression<Func<TModel, TProperty>> expression,
            Func<TModel, object> valueFactory)
        {
            if (valueFactory == null)
                throw new ArgumentNullException(nameof(valueFactory));

            var propertyName = GetPropertyName(expression);
            _valueFactories.Add(propertyName, valueFactory);

            return this;
        }

        public DbParameterBuilder<TModel> AddDataTableFactory<TParameter>(
            Expression<Func<TModel, IEnumerable<TParameter>>> expression)
        {
            var propertyName = GetPropertyName(expression);
            Func<TModel, object> factory = x => expression.Compile().Invoke(_value).ToDataTable();
            _valueFactories.Add(propertyName, factory);

            return this;
        }

        public DbParameterBuilder<TModel> AddAdditionalParameter(string parameterName, Func<object> valueFactory)
        {
            if (string.IsNullOrEmpty(parameterName))
            {
                throw new ArgumentNullException(nameof(parameterName));
            }

            if (_propertyDescriptors.Any(x => x.Name == parameterName))
            {
                throw new ArgumentException(
                    $"You cannot use the name '{parameterName}' which already belongs to the model.",
                    nameof(parameterName));
            }

            if (valueFactory == null)
            {
                throw new ArgumentNullException(nameof(valueFactory));
            }

            _additionParameters.Add(parameterName, valueFactory);

            return this;
        }

        public DbParameterBuilder<TModel> ExcludeAll(bool flag)
        {
            _excludeAll = flag;

            return this;
        }


        public DynamicParameters Build()
        {
            var parameters = new DynamicParameters();
            foreach (var descriptor in _propertyDescriptors)
            {
                if (_excludeAll && false == _includedList.Contains(descriptor.Name))
                    continue;

                if (false == _excludeAll && _excludedList.Contains(descriptor.Name))
                    continue;

                var value = _valueFactories.ContainsKey(descriptor.Name)
                    ? _valueFactories[descriptor.Name].Invoke(_value)
                    : descriptor.GetValue(_value);

                var dataTable = value as DataTable;
                if (dataTable != null)
                {
                    // Attribute on Property has high proprity than Attribute on Class
                    var typeName =
                        descriptor.Attributes.Cast<Attribute>()
                            .OfType<DbTableTypeAttribute>()
                            .SingleOrDefault()?
                            .Name;

                    if (false == string.IsNullOrEmpty(typeName))
                    {
                        dataTable.SetTypeName(typeName);
                    }

                    if (string.IsNullOrEmpty(dataTable.GetTypeName()))
                    {
                        throw new InvalidOperationException(
                            $"The property '{descriptor.Name}' type is DataTable but you did not give it a table type name. You can add DbTableTypeAttribute to that property or its type.");
                    }
                }

                parameters.Add(descriptor.Name, value);
            }

            foreach (var parameter in _additionParameters)
            {
                parameters.Add(parameter.Key, parameter.Value.Invoke());
            }

            return parameters;
        }

        #endregion
    }
}
