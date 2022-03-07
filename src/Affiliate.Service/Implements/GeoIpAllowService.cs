using Affiliate.General.Models.Config;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.IMDB;
using Affiliate.Service.Utilities;
using log4net;
using Microsoft.Extensions.Options;
using System;
using System.IO;
using System.Reflection;

namespace Affiliate.Service.Implements
{
    public class GeoIpAllowService : IGeoIpAllowService
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(GeoIpAllowService));
        
        public ISQLiteService sqliteService { get; set; }
        private readonly IOptions<ConnectionConfig> _options;

        public GeoIpAllowService(IOptions<ConnectionConfig> options, ISQLiteService _sqliteService)
        {
            _options = options;
            sqliteService  = _sqliteService;
        }

        private IpConfigAllowResponse IpConfig { get; set; }
        public static string CONN_STR_IPCOUNTRY = (string)null;

        public void InitGeoIpAllowService()
        {       
            try
            {
                string sql = "SELECT * FROM ipallow";
                if (string.IsNullOrEmpty(CONN_STR_IPCOUNTRY))
                {
                    //string localPath = new Uri(Path.GetDirectoryName(Assembly.GetExecutingAssembly().GetName().CodeBase)).LocalPath;
                    string localPath = Directory.GetCurrentDirectory();
                    CONN_STR_IPCOUNTRY = _options.Value.IpCountryConnectionString;
                    CONN_STR_IPCOUNTRY = CONN_STR_IPCOUNTRY.Insert("data source=".Length, localPath + "\\");
                }

                IpConfig = sqliteService.ExecuteSQLiteIpAllowStatement(sql, CONN_STR_IPCOUNTRY);

                Log.Info(string.Format("IP Config count : {0}", IpConfig.IpAllowList.Count.ToString()));
            }
            catch (Exception ex)
            {
                Log.Error($"InitGeoIpAllowService : {ex}");              
            }
        }

        public bool IsIpAllowed(long ip)
        {
            foreach (var line in IpConfig.IpAllowList)
            {
                if (ip >= line.StartIp && ip <= line.EndIp)
                {
                    Log.Info($"IP Allow description : {line.Description}");
                    return true;
                }
            }

            return false;
        }

        public bool IsIpAllowed(string ip)
        {
            InitGeoIpAllowService();
            long numIp = CommonHelper.ConvertToLongIp(CommonHelper.ConvertToFullIpV4(ip));
            Log.Debug(string.Format("ConverToLongIP - IP : {0} - LongIP : {1}", ip, numIp));

            return IsIpAllowed(numIp);
        }
    }
}
