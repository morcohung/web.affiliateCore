using Affiliate.Service.Models.Response.IMDB;

namespace Affiliate.Service.Interfaces
{
    public interface IIpCountryRedisCache
    {
        GeoLocationResponse GetGeoLocation(string ipAddress);
    }
}
