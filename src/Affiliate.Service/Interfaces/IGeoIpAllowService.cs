
namespace Affiliate.Service.Interfaces
{
    public interface IGeoIpAllowService
    {
        bool IsIpAllowed(string ip);
    }
}
