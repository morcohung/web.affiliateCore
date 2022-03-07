using Affiliate.Service.Enums;
using Affiliate.Service.Models.Response.InternalPartner;
using System;
using System.Collections.Generic;

namespace Affiliate.Service.Interfaces
{
    public interface IInternalPartnerService
    {
        bool isiOvationEnabled();

        AgileCheckResponse GetAccessType(string affUserName, string clientIpAddress, string blackboxId, DateTime registrationDate, AgileCheckEnum.RuleSet ruleSet);

        Dictionary<string, RegionManagementAllowanceResponse> GetBlockedRegionToRegisterList();

        Dictionary<string, RegionManagementAllowanceResponse> RegionManagementAllowance();
    }
}
