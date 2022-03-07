using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.IMDB;
using log4net;
using System;

namespace Affiliate.Service.Implements
{
    public class GeoIpIMDBService : IGeoIpIMDBService
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(GeoIpIMDBService));
        public IIpCountryRedisCache ipCountryRedisCache { get; set; }

        public GeoIpIMDBService(IIpCountryRedisCache _ipCountryRedisCache)
        {
            ipCountryRedisCache = _ipCountryRedisCache;
        }

        public string GetCountryCode(string ip)
        {
            GeoLocationResponse geoLocation = null;         
            try
            {
                geoLocation = ipCountryRedisCache.GetGeoLocation(ip);
                Log.Debug($"ConverToLongIP - IP : {ip}");
                return geoLocation?.CountryCode;
            }
            catch (Exception ex)
            {
                Log.Error(ex);
            }
            return "TW";
        }
    }
}
