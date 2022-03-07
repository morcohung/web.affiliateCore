using StackExchange.Redis;

namespace Affiliate.Service.Interfaces
{
    public interface IDataEntity
    {
        string GetCitySegment(IDatabase database, string key, double ipDecimal);
    }
}
