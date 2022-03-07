using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using Microsoft.Extensions.Logging;
using System.Text;
using Dapper;
using Affiliate.Repositories.Interfaces.IManager;
using Affiliate.General.EventHandlers;
using Affiliate.Repositories.Enums;
using Affiliate.General.Enums;
using Affiliate.Repositories.Utilities;

namespace Affiliate.Repositories.Implements.Manager
{
    public class DBManager : BaseLog, IAFFDBManager
    {
        /// <summary>
        /// 
        /// </summary>
        private readonly DbConnection _conn;
        /// <summary>
        /// 
        /// </summary>
        protected DbTransaction _tran;
        private TargetDB _targetDB = TargetDB.None;

        /// <summary>
        /// 
        /// </summary>
        public TargetDB TargetDB
        {
            get
            {
                if (_targetDB == TargetDB.None)
                {
                    throw new ArgumentException("Please specify target DB");
                }
                return _targetDB;
            }
            set => _targetDB = value;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="conn"></param>
        public DBManager(DbConnection conn)
        {
            _conn = conn ?? throw new ArgumentNullException(nameof(conn));

        }

        /// <summary>
        /// 
        /// </summary>
        public void Open()
        {
            _conn.Open();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public DbConnection GetConnection()
        {
            return _conn;
        }

        /// <summary></summary>
        public void Close()
        {
            if (_tran != null) EndTransaction();
            _conn.Close();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <returns></returns>
        public DbTransaction BeginTransaction()
        {
            _tran = _conn.BeginTransaction();
            return _tran;
        }

        /// <summary>
        /// 
        /// </summary>
        public void EndTransaction()
        {
            _tran.Dispose();
        }

        /// <summary>
        /// 
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="commandString"></param>
        /// <param name="commandType"></param>
        /// <param name="params"></param>
        /// <param name="ex"></param>
        private void ProcessErrorMessage<T>(string commandString, CommandType commandType, List<DbParameter> @params, Exception ex)
        {
            var errorData = new StringBuilder();
            errorData.Append(commandString);
            errorData.Append("#");
            if (@params != null)
            {
                foreach (var param in @params)
                {
                    errorData.Append($"{param.ParameterName}:{param.Value},");
                }
            }
            Log<T>(LogLevel.Critical, LogSourcePoint.Repository, $"Exception:{ex.Message} Data:{errorData.ToString()}", ex);
        }

        /// <summary>
        /// 
        /// </summary>
        public void Dispose()
        {
            if (_tran != null) _tran.Dispose();
            if (_conn != null) _conn.Dispose();
        }

        public void DBLog<T>(LogLevel level, LogSourcePoint point, string message, Exception ex, string callerMemberClass, string callerMemberName)
        {
            base.Log<T>(level, point, message, ex, callerMemberClass, callerMemberName);
        }

        public void ExecuteReader<T>(string commandString, CommandType commandType, List<DbParameter> @params, Action<DbDataReader> executeReader)
        {
            throw new NotImplementedException();
        }

        public int ExecuteNonQuery<T>(string commandString, CommandType commandType, List<DbParameter> @params)
        {
            throw new NotImplementedException();
        }

        public void ExecuteNonQueryByDapper<T>(string commandString, DynamicParameters parameters)
        {
            using (
            var agent = new DapperDbAgent(DataProvider.SqlServer, _conn.ConnectionString))
            {
                agent.ExecuteNonQuery(commandString
                , parameters);
            }
        }

        public List<T> ExecuteReaderByDapper<T>(string commandString, DynamicParameters parameters)
        {
            using (
            var agent = new DapperDbAgent(DataProvider.SqlServer, _conn.ConnectionString))
            {
                return agent.ExecuteObjects<T>(commandString, parameters).AsList();
            }
        }
    }
}
