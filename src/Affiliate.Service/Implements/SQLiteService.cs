using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.IMDB;
using Microsoft.Data.Sqlite;

namespace Affiliate.Service.Implements
{
    public class SQLiteService : ISQLiteService
    {
        //public IpConfigIMDBResponse ExecuteSQLiteIMDBStatement(string sql, string connStr)
        //{
        //    //string str = (string)null;
        //    var ipConfig = new IpConfigIMDBDto();
        //    using (SqliteConnection connection = new SqliteConnection(connStr))
        //    {
        //        connection.Open();
        //        using (SqliteCommand sqLiteCommand = new SqliteCommand(sql, connection))
        //        {
        //            using (SqliteDataReader sqLiteDataReader = sqLiteCommand.ExecuteReader())
        //            {
        //                while (sqLiteDataReader.Read())
        //                {
        //                    var ipLine = new IpLineIMDBResponse();

        //                    ipLine.StartIp = sqLiteDataReader.GetInt64(sqLiteDataReader.GetOrdinal("IPFROM"));
        //                    ipLine.EndIp = sqLiteDataReader.GetInt64(sqLiteDataReader.GetOrdinal("IPTO"));
        //                    ipLine.CountryCode = sqLiteDataReader.GetString(sqLiteDataReader.GetOrdinal("COUNTRYCODE"));
        //                    ipLine.CountryName = sqLiteDataReader.GetString(sqLiteDataReader.GetOrdinal("COUNTRYNAME"));

        //                    ipConfig.IpIMDBList.Add(ipLine);
        //                }
        //            }
        //        }
        //    }

        //    return ipConfig;
        //}

        public IpConfigAllowResponse ExecuteSQLiteIpAllowStatement(string sql, string connStr)
        {
            //string str = (string)null;
            var ipConfig = new IpConfigAllowResponse();
            using (SqliteConnection connection = new SqliteConnection(connStr))
            {
                connection.Open();
                using (SqliteCommand sqLiteCommand = new SqliteCommand(sql, connection))
                {
                    using (SqliteDataReader sqLiteDataReader = sqLiteCommand.ExecuteReader())
                    {
                        while (sqLiteDataReader.Read())
                        {
                            var ipLine = new IpLineAllowResponse();

                            ipLine.StartIp = sqLiteDataReader.GetInt64(sqLiteDataReader.GetOrdinal("IPFROM"));
                            ipLine.EndIp = sqLiteDataReader.GetInt64(sqLiteDataReader.GetOrdinal("IPTO"));
                            ipLine.Description = sqLiteDataReader.GetString(sqLiteDataReader.GetOrdinal("Description"));
                            ipConfig.IpAllowList.Add(ipLine);
                        }
                    }
                }
            }

            return ipConfig;
        }
    }
}
