using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace Affiliate.Repositories.Constant
{
    public static class AipConstant
    {
        public const string HttpHost = "HTTP_HOST";
        public const string HttpAccept = "HTTP_ACCEPT";
        public const string HttpUserAgent = "HTTP_USER_AGENT";
        public const string XWapProfile = "HTTP_X_WAP_PROFILE";
        public const string HttpClientIp = "HTTP_CLIENT_IP";
        public const string HttpXForwarded = "HTTP_X_FORWARDED";
        public const string HttpXClusterClientIp = "HTTP_X_CLUSTER_CLIENT_IP";
        public const string HttpForwardedFor = "HTTP_FORWARDED_FOR";
        public const string HttpForwarded = "HTTP_FORWARDED";
        public const string RemoteAddr = "REMOTE_ADDR";
        public const string ServerPortSecure = "SERVER_PORT_SECURE";
        public const string LocalAddr = "LOCAL_ADDR";

        #region HTTP Constant
        public static string JsonContentType = "application/json";
        public static string JsonPContentType = "application/javascript";
        public static string XmlContentType = "text/xml";
        public static string DefaultContentType = "	application/x-www-form-urlencoded";

        public static readonly string HttpProtocol = string.Format("{0}://", Uri.UriSchemeHttp);
        public static readonly string HttpsProtocol = string.Format("{0}://", Uri.UriSchemeHttps);

        #endregion

        public static string DateFormatMmYyyyWithDash = "MM-yyyy";
        public static string DateFormatMmmYyyy = "MMM yyyy";
        public static string DateFormatMmmmYyyy = "MMMM yyyy";
        public static string DateFormatDdMmmYyyy = "dd MMM yyyy";
        public static string DateFormatDdMmYyyyWithDash = "dd-MM-yyyy";
        public static string DateFormatDdMmYyyyWithSlash = "dd/MM/yyyy";
        public static string DateFormatDdMmmYyyyWithDash = "dd-MMM-yyyy";
        public static string DateFormatDdMmmYyyyHhMmSs = "dd MMM yyyy, HH:mm:ss";
        public static string DateFormatDdddDdMmmmYyyyHhMmSs = "dddd, dd MMMM yyyy, HH:mm:ss";
        public static string DateFormatDdMmYyyyHhMmSsWithDash = "dd-MM-yyyy HH:mm:ss";

        public static string SessionCultureCode = "CultureCode";

        public static readonly IList<int> RemovedCountries = new ReadOnlyCollection<int>
           (
               new List<int> { 236, 183 }
           );
    }
}
