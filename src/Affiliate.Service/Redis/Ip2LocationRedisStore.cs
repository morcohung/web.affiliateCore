using Affiliate.General.Models.Config;
using Microsoft.Extensions.Options;
using StackExchange.Redis;
using System;

namespace Affiliate.Service.Redis
{
    public class Ip2LocationRedisStore
    {
        private static readonly Lazy<ConnectionMultiplexer> LazyConnection;
       
        private static readonly ConnectionConfig _options;

        //public Ip2LocationRedisStore(ConnectionConfig options)
        //{
        //    _options = options;
        //}

        static Ip2LocationRedisStore()
        {
            LazyConnection = new Lazy<ConnectionMultiplexer>(() =>
            {
                var redisConnectionString = _options.Ip2Location;
                return ConnectionMultiplexer.Connect(redisConnectionString);
            });
        }

        public static ConnectionMultiplexer Connection
        {
            get
            {
                return LazyConnection.Value;
            }
        }

        public static IDatabase GetDB
        {
            get
            {
                return Connection.GetDatabase();
            }
        }
    }
}
