using Affiliate.Repositories.DAL;
using Affiliate.Repositories.Enums;
using Dapper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics;
using System.Text;

namespace Affiliate.Repositories.Utilities
{
    public class DapperDbAgent : IDisposable
    {
        #region Private Members

        private readonly IDbConnection _dbConnection;
        private bool _disposed;

        private void Dispose(bool disposing)
        {
            if (false == disposing || _disposed)
                return;

            _dbConnection.Dispose();
            _disposed = true;
        }

        #endregion

        #region Public Members

        public bool LoggingPerformance { get; set; }
        public bool DumpingParameters { get; set; }

        public DapperDbAgent(DataProvider dataProvider, string connectionString, bool dumpingParameters = true, bool loggingPerformance = true)
        {
            DumpingParameters = dumpingParameters;
            LoggingPerformance = loggingPerformance;

            _dbConnection = DBManagerFactory.BuilConnection(dataProvider, connectionString);
            _dbConnection.Open();
        }

        public int ExecuteNonQuery(string commandText, object parameters,
            CommandType commandType = CommandType.StoredProcedure, int? commandTimeout = null)
        {
            return ExecuteAndLogExecutionTime(SqlMapper.Execute, commandText, parameters, commandType, commandTimeout);
        }

        public T ExecuteScalar<T>(string commandText, object parameters,
            CommandType commandType = CommandType.StoredProcedure, int? commandTimeout = null)
        {
            return ExecuteAndLogExecutionTime(SqlMapper.ExecuteScalar<T>, commandText, parameters, commandType,
                commandTimeout);
        }

        public T ExecuteObject<T>(string commandText, object parameters,
            CommandType commandType = CommandType.StoredProcedure, int? commandTimeout = null)
        {
            return ExecuteAndLogExecutionTime(SqlMapper.QuerySingleOrDefault<T>, commandText, parameters, commandType,
                commandTimeout);
        }

        public IEnumerable<T> ExecuteObjects<T>(string commandText, object parameters,
            CommandType commandType = CommandType.StoredProcedure, int? commandTimeout = null)
        {
            // Indicates buffered as true by default and Dapper executes ToList() automatically.
            return ExecuteAndLogExecutionTime(SqlMapper.Query<T>, commandText, parameters, commandType, commandTimeout);
        }

        public void ExecuteMultiple(string commandText, object parameters, Action<SqlMapper.GridReader> factoryAction,
            CommandType commandType = CommandType.StoredProcedure, int? commandTimeout = null)
        {
            ExecuteAndLogExecutionTime(SqlMapper.QueryMultiple, commandText, parameters, commandType, commandTimeout,
                factoryAction);
        }

        private TReturn ExecuteAndLogExecutionTime<TReturn>(
            Func<IDbConnection, CommandDefinition, TReturn> dapperMethod, string commandText, object parameters,
            CommandType commandType, int? commandTimeout, Action<SqlMapper.GridReader> factoryAction = null)
        {
            var definition = new CommandDefinition(commandText, parameters, null, commandTimeout, commandType);
            if (false == LoggingPerformance)
                return Execute(dapperMethod, definition, factoryAction);

            var sw = new Stopwatch();
            var sb = new StringBuilder();
            try
            {
                sb.AppendFormat("Command Text: {0}, Command Type: {1}, Command Timeout: {2}.\n",
                    definition.CommandText, definition.CommandType, definition.CommandTimeout ?? -1);

                if (DumpingParameters)
                    sb.AppendFormat("Command Parameters:\n{0}\n",
                        JsonConvert.SerializeObject(definition.Parameters, Formatting.Indented));

                sw.Start();
                return Execute(dapperMethod, definition, factoryAction);
            }
            catch (System.Exception ex)
            {
                sb.AppendFormat("Encountered error, exception message: {0}\n", ex.Message);
                throw;
            }
            finally
            {
                if (sw.IsRunning)
                {
                    sw.Stop();
                    sb.AppendFormat("Execution Time: {0}", sw.Elapsed);
                }
                //LogHelper.RequestPerformance(sw.Elapsed, sb.ToString(), specialKey: "DB");
            }
        }

        private TResult Execute<TResult>(Func<IDbConnection, CommandDefinition, TResult> dapperMethod,
            CommandDefinition definition, Action<SqlMapper.GridReader> factoryAction)
        {
            var result = dapperMethod.Invoke(_dbConnection, definition);

            // Programmer called QueryMultiple() if result is GridReader
            var reader = result as SqlMapper.GridReader;

            // If not, return result directly
            if (reader == null)
                return result;

            if (factoryAction == null)
                throw new InvalidOperationException(
                    "You invoked SqlMapper.QueryMultiple() but no factory action was supplied.");

            // If true, invoke factory action with reader then return null.
            factoryAction.Invoke(reader);
            reader.Dispose();
            return default(TResult);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
