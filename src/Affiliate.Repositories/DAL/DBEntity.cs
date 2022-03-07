﻿using Affiliate.Repositories.Enums;
using System.Collections.Generic;
using System.Data;

namespace Affiliate.Repositories.DAL
{
    public class DBEntity
    {
        #region DB Properties
        public IDbConnection Connection { get; set; }
        public IDataReader DataReader { get; set; }
        public DataProvider ProviderType { get; set; }
        public string ConnectionString { get; set; }
        public IDbCommand Command { get; set; }
        public IDbTransaction Transaction { get; set; }
        public IDbDataParameter[] Parameters { get; set; }

        public List<IDbDataParameter> Par { get; set; }


        #endregion
    }

    public class DBParameterEntity
    {
        public string parameterName { get; set; }
        public object parameterValue { get; set; }
    }

    public class DBSettingEntity
    {
        public DBSettingEntity(DataProvider dataProviderType, string conString, CommandType cmdType, string cmdText, bool isTrans, int cmdTimeOut = 30)
        {
            providerType = dataProviderType;
            connectionString = conString;
            commandType = cmdType;
            commandText = cmdText;
            IsTransaction = isTrans;
            commandTimeOut = cmdTimeOut;
            parameters = new List<DBParameterEntity>();
        }

        private DBSettingEntity() { }

        public DataProvider providerType { get; set; }
        public string connectionString { get; set; }
        public CommandType commandType { get; set; }
        public string commandText { get; set; }
        public int commandTimeOut { get; set; }
        public List<DBParameterEntity> parameters { get; set; }
        public bool IsTransaction { get; set; }


        public void AddParameters(string paramName, object paramValue, ParameterDirection direction)
        {
            parameters.Add(new DBParameterEntity() { parameterName = paramName, parameterValue = paramValue });
        }

    }
}
