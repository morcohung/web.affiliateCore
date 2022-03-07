namespace Affiliate.Service.Interfaces
{
    public interface IHttpService
    {
        string HttpPost(string targetUrl, string requestParameter, string contentType, string requestHeader = null, int secondsTimeout = 5 * 60 * 1000);
    }
}
