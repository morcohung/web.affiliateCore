namespace Affiliate.Service.Interfaces
{
    public interface IGeoIpIMDBService
    {  
        string GetCountryCode(string ip);
    }
}
