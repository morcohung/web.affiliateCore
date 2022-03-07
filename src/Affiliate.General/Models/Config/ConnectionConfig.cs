namespace Affiliate.General.Models.Config
{
    public class ConnectionConfig
    {
        /// <summary>
        /// API2 Database
        /// </summary>
        public string AIP2Connection { get; set; }
        /// <summary>
        /// XDM Database
        /// </summary>
        public string AIP2XUENNConnection { get; set; }
        /// <summary>
        /// Redis
        /// </summary>
        public string RedisConnectionString { get; set; }
        /// <summary>
        /// Ip Country IMDB
        /// </summary>
        public string IpCountryConnectionString { get; set; }
        /// <summary>
        /// Ip Allow IMDB
        /// </summary>
        public string IpAllowConnectionstr { get; set; }
        /// <summary>
        /// Ip Country Redis
        /// </summary>
        public string Ip2Location { get; set; }
    }
}
