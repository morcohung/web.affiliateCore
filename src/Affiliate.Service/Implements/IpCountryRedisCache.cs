using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.IMDB;
using Affiliate.Service.Redis;
using StackExchange.Redis;
using System;
using System.Net;

namespace Affiliate.Service.Implements
{
    public class IpCountryRedisCache: IIpCountryRedisCache
    {
        private static IDatabase _redisdb;
        private static readonly string _IpToCityID = "ip2cityid";
        private static readonly char[] _Idsplitor = new char[] { '_' };

        public IpCountryRedisCache(IDatabase redisDb)
        {
            _redisdb = redisDb;           
        }

        public GeoLocationResponse GetGeoLocation(string ipAddress)
        {
            var db = _redisdb;
            if (IsPrivateIpAddress(ipAddress))
            {
                return new GeoLocationResponse();
            }
            uint num = Ip2Decimal(ipAddress);
            string citySegment = new DataEntity().GetCitySegment(db, _IpToCityID, num);
            if (citySegment.StartsWith("-"))
            {
                return new GeoLocationResponse();
            }
            RedisHashEntry<GeoLocationResponse> _db = new RedisHashEntry<GeoLocationResponse>(db);
            string cityId = GetCityId(citySegment);
            return _db.Get(cityId);
        }

        public static bool IsPrivateIpAddress(string IpAddress)
        {
            if (string.IsNullOrEmpty(IpAddress))
            {
                return false;
            }
            string text = IpAddress.Trim();
            bool result = false;
            if (text.StartsWith("10.") || text.StartsWith("192.168.") || text.StartsWith("::"))
            {
                result = true;
            }
            else
            {
                if (text.StartsWith("172."))
                {
                    byte[] expr_49 = IPAddress.Parse(text).GetAddressBytes();
                    int num = (int)expr_49[0];
                    int num2 = (int)expr_49[1];
                    result = (num == 172 && num2 >= 16 && num2 <= 31);
                }
            }
            return result;
        }
        private static uint Ip2Decimal(string ipAddress)
        {
            byte[] addressBytes = IPAddress.Parse(ipAddress).GetAddressBytes();
            if (BitConverter.IsLittleEndian)
            {
                Array.Reverse(addressBytes);
            }
            return BitConverter.ToUInt32(addressBytes, 0);
        }
        private static string GetCityId(string citysegment)
        {
            return citysegment.Split(_Idsplitor, StringSplitOptions.RemoveEmptyEntries)[0];
        }

    }
}
