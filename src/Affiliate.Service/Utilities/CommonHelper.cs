using Affiliate.Repositories.Constant;
using Affiliate.Service.Models.Response.InternalPartner;
using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography;
using System.Text;

namespace Affiliate.Service.Utilities
{
    public class CommonHelper
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(CommonHelper));
        private static List<RegionManagementResultResponse> _regions = null;
        private static readonly object obj_lock = new object();

        public static string HashPassword(string password)
        {
            using (var md5 = SHA1.Create())
            {
                var result = md5.ComputeHash(Encoding.UTF8.GetBytes(password));
                var strResult = BitConverter.ToString(result);
                return strResult.Replace("-", "").ToUpper();
            }
        }

        public static string GetIpAddress(HttpContext context)
        {
            string logStr = "GetIpAddress: Http hander type is {0}";
            if (!string.IsNullOrEmpty(context.Request.Headers["HTTP_X_FORWARDED_FOR"]))
            {
                Log.Debug(string.Format(logStr, "HTTP_X_FORWARDED_FOR"));              
                var ip = context.Request.Headers["X-Forwarded-For"].FirstOrDefault();
                return string.IsNullOrEmpty(ip) ? "" : context.Connection.RemoteIpAddress.ToString();
            }

            if (CheckIP(context.Request.Headers[AipConstant.HttpClientIp]))
            {
                Log.Debug(string.Format(logStr, AipConstant.HttpClientIp));
                return context.Request.Headers[AipConstant.HttpClientIp];
            }

            if (CheckIP(context.Request.Headers[AipConstant.HttpXForwarded]))
            {
                Log.Debug(string.Format(logStr, AipConstant.HttpXForwarded));
                return context.Request.Headers[AipConstant.HttpXForwarded];
            }

            if (CheckIP(context.Request.Headers[AipConstant.HttpXClusterClientIp]))
            {
                Log.Debug(string.Format(logStr, AipConstant.HttpXClusterClientIp));
                return context.Request.Headers[AipConstant.HttpXClusterClientIp];
            }

            if (CheckIP(context.Request.Headers[AipConstant.HttpForwardedFor]))
            {
                Log.Debug(string.Format(logStr, AipConstant.HttpForwardedFor));
                return context.Request.Headers[AipConstant.HttpForwardedFor];
            }

            if (CheckIP(context.Request.Headers[AipConstant.HttpForwarded]))
            {
                Log.Debug(string.Format(logStr, AipConstant.HttpForwarded));
                return context.Request.Headers[AipConstant.HttpForwarded];
            }
           
            string clientIP = context.Request.Headers[AipConstant.RemoteAddr];
            if (clientIP != null)
            {
                Log.Debug(string.Format(logStr, AipConstant.RemoteAddr));
                clientIP = clientIP.Trim();
            }
            else
            {
                clientIP = context.Request.HttpContext.Features.Get<IHttpConnectionFeature>().RemoteIpAddress.ToString();
            }

            return clientIP;
        }

        private static bool CheckIP(string addr)
        {
            IPAddress iPAddress;
            return !string.IsNullOrEmpty(addr) && IPAddress.TryParse(addr, out iPAddress);
        }

        private static bool IsPrivateIpAddress(string ipadress)
        {
            if (string.IsNullOrEmpty(ipadress))
            {
                return false;
            }
            string text = ipadress.Trim();
            bool result = false;
            if (text.StartsWith("10.") || text.StartsWith("192.168.") || text.StartsWith("127.0.0.1") || text.StartsWith("::1"))
            {
                result = true;
            }
            else
            {
                if (text.StartsWith("172."))
                {
                    IPAddress iPAddress = IPAddress.Parse(text);
                    byte[] addressBytes = iPAddress.GetAddressBytes();
                    int num = (int)addressBytes[0];
                    int num2 = (int)addressBytes[1];
                    result = (num == 172 && num2 >= 16 && num2 <= 31);
                }
            }
            return result;
        }

        public static long ConvertToLongIp(string dottedIp)
        {
            if (string.IsNullOrEmpty(dottedIp))
                return 0;

            long result = 0;
            var ipArr = dottedIp.Split('.');

            if (ipArr.Length != 4)
                return result;

            for (var i = ipArr.Length - 1; i >= 0; i--)
            {
                result = result + (long)((Convert.ToInt32(ipArr[i]) % 256) * Math.Pow(256, 3 - i));
            }

            return result;
        }

        public static string ConvertToFullIpV4(string dottedIp)
        {
            if (string.IsNullOrEmpty(dottedIp))
                return "000.000.000.000";

            var ipArr = dottedIp.Split('.');

            if (ipArr.Length != 4)
                return "000.000.000.000";

            return Convert.ToInt32(ipArr[0]).ToString("D3") + "." +
                   Convert.ToInt32(ipArr[1]).ToString("D3") + "." +
                   Convert.ToInt32(ipArr[2]).ToString("D3") + "." +
                   Convert.ToInt32(ipArr[3]).ToString("D3");
        }

        public static string FormatLandingUrl(string url)
        {
            if (!url.EndsWith("/")) url = url + "/";

            if (!url.StartsWith(AipConstant.HttpProtocol) && !url.StartsWith(AipConstant.HttpsProtocol))
            {
                return AipConstant.HttpsProtocol + url; //Force https
            }
            else
            {
                return url;
            }
        }  
    }
}
