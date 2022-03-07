using Affiliate.Service.Models.Response.InternalPartner;
using System.Collections.Generic;

namespace Affiliate.Service.Interfaces
{
    public interface IRegionService
    {
        List<RegionManagementResultResponse> GetAllCountryAccessibilities();
        bool IsRegionManagementServerSPIURLAvailable();
    }
}
