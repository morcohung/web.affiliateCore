using Affiliate.Repositories.Constant;
using Affiliate.Service.Interfaces;
using System.IO;
using System.Net;
using System.Text;

namespace Affiliate.Service.Implements
{
    public class HttpService : IHttpService
    {
        public string HttpPost(string targetUrl, string requestParameter, string contentType = null, string requestHeader = null, int secondsTimeout = 5 * 60 * 1000)
        {
            WebRequest webRequest = WebRequest.Create(targetUrl);
            webRequest.Timeout = secondsTimeout;
            webRequest.Method = "POST";
            byte[] byteArray = Encoding.UTF8.GetBytes(requestParameter);
            if (string.IsNullOrEmpty(contentType))
            {
                webRequest.ContentType = AipConstant.DefaultContentType;
            }
            else
            {
                webRequest.ContentType = contentType;
            }
            webRequest.ContentLength = byteArray.Length;
            if (!string.IsNullOrEmpty(requestHeader))
            {
                webRequest.Headers.Add("mid", requestHeader);
            }

            using (Stream requestStream = webRequest.GetRequestStream())
            {
                requestStream.Write(byteArray, 0, byteArray.Length);
                requestStream.Close();
            }

            using (WebResponse response = webRequest.GetResponse())
            {
                using (var responseStream = response.GetResponseStream())
                {
                    using (StreamReader reader = new StreamReader(responseStream, Encoding.UTF8))
                    {
                        string responseFromServer = reader.ReadToEnd();
                        reader.Close();
                        responseStream.Close();
                        response.Close();
                        return responseFromServer;
                    }
                }
            }
        }
    }
}
