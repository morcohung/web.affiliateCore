using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using Affiliate.General.Enums;
using Affiliate.General.EventHandlers;
using Affiliate.Repositories.Enums;
using Dapper;
using Microsoft.Extensions.Logging;

namespace Affiliate.Repositories.Interfaces.IManager
{
    public interface IDBManager : IDisposable
    {
        TargetDB TargetDB { get; set; }

        event LogHandler OnLog;

        void Open();

        DbTransaction BeginTransaction();

        void EndTransaction();

        DbConnection GetConnection();

        void Close();

        void ExecuteReader<T>(string commandString, CommandType commandType, List<DbParameter> @params, Action<DbDataReader> executeReader);

        List<T> ExecuteReaderByDapper<T>(string commandString, DynamicParameters parameters);

        void ExecuteNonQueryByDapper<T>(string commandString, DynamicParameters parameters);

        int ExecuteNonQuery<T>(string commandString, CommandType commandType, List<DbParameter> @params);

        void DBLog<T>(LogLevel level, LogSourcePoint point, string message, Exception ex, [System.Runtime.CompilerServices.CallerFilePath] string callerMemberClass = "", [System.Runtime.CompilerServices.CallerMemberName] string callerMemberName = "");
    }
    /// <summary>
    /// 
    /// </summary>
    public interface IAFFDBManager : IDBManager { }
}
