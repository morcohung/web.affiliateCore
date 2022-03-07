using Affiliate.General.Enums;
using Affiliate.General.EventHandlers;
using Affiliate.General.Models.Config;
using Affiliate.Repositories.Constant;
using Affiliate.Service.Enums;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Request.InternalPartner;
using Affiliate.Service.Models.Response.InternalPartner;
using Affiliate.Service.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;

namespace Affiliate.Service.Implements
{
    public class InternalPartnerService : BaseLog, IInternalPartnerService
    {
        public IHttpService HttpService { get; set; }      
       
        public static IRegionService regionService { get; set; }
        public IGeoIpIMDBService geoIpService { get; set; }
        public IHttpContextAccessor httpContextAccessor { get; set; }
        private static List<RegionManagementResultResponse> _regions = null;
        private static readonly object obj_lock = new object();

        private readonly IOptions<InternalPartnerConfig> options;
        public InternalPartnerService(IOptions<InternalPartnerConfig> _options, IRegionService _regionService, IGeoIpIMDBService _geoIpService, IHttpContextAccessor _httpContextAccessor)
        {
            options = _options;
            regionService = _regionService;
            geoIpService = _geoIpService;
            httpContextAccessor = _httpContextAccessor;
        }

        public bool isiOvationEnabled()
        {
            return options.Value.IOvationEnabled;
        }

        public AgileCheckResponse GetAccessType(string affUserName, string clientIpAddress, string blackboxId, DateTime registrationDate, AgileCheckEnum.RuleSet ruleSet)
        {
            Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, "FireToAgileCheck Start", null);

            string agileCheckApiUrl = options.Value.IOvationUrlHost + options.Value.IOvationUrlService;
            var agileCheckRequestParam = new AgileCheckRequest();
            agileCheckRequestParam.BuId = options.Value.IOvationBusinessUnitId;
            agileCheckRequestParam.Address = clientIpAddress;
            agileCheckRequestParam.UserCode = affUserName + options.Value.IOvationSuffix;
            agileCheckRequestParam.DeviceId = string.Empty;
            agileCheckRequestParam.BlackBox = blackboxId;
            agileCheckRequestParam.RegisterDate = registrationDate;
            agileCheckRequestParam.RuleSet = ruleSet;

            var serializerSetting = new JsonSerializerSettings
            {
                DateFormatHandling = DateFormatHandling.MicrosoftDateFormat
            };

            var jsonString = JsonConvert.SerializeObject(agileCheckRequestParam, serializerSetting);
            var result = HttpService.HttpPost(agileCheckApiUrl, jsonString, AipConstant.JsonContentType);
            var agileCheckResponse = JsonConvert.DeserializeObject<AgileCheckResponse>(result);

            Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, "FireToAgileCheck End", null);

            return agileCheckResponse;
        }

        public Dictionary<string, RegionManagementAllowanceResponse> GetBlockedRegionToRegisterList()
        {
            Dictionary<string, RegionManagementAllowanceResponse> list = new Dictionary<string, RegionManagementAllowanceResponse>();

            list = GetRegionSettingList();

            if (list == null || list.Count == 0) throw new NullReferenceException("list is null, return null from RegionManagement Singleton");
            //Remove list where isAllowedToRegister false
            foreach (var x in list.Where(x => x.Value.IsAllowedToRegister).ToList())
            {
                list.Remove(x.Key);
            }

            return list;
        }

        public Dictionary<string, RegionManagementAllowanceResponse> GetRegionSettingList()
        {          
            var accessibilities = GetRegions();
            Dictionary<string, RegionManagementAllowanceResponse> regionAllowance = new Dictionary<string, RegionManagementAllowanceResponse>();

            Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, $"SPI Result Count:{accessibilities.Count}", null);

            foreach (var data in accessibilities)
            {
                if (AipConstant.RemovedCountries.All(p => p != data.CountryId))
                {
                    var allowance = new RegionManagementAllowanceResponse();
                    allowance.IsAllowedToAccess = data.CanAccessMemberSite;
                    allowance.IsAllowedToRegister = data.CanMemberRegister;

                    if (!regionAllowance.ContainsKey(data.Code))
                    {
                        regionAllowance.Add(data.Code, allowance);
                    }
                }
            }  
            return regionAllowance;
        }

        public static List<RegionManagementResultResponse> GetRegions()
        {
            lock (obj_lock)
            {
                if (_regions == null)
                {
                    _regions = new List<RegionManagementResultResponse>();
                    if (regionService.IsRegionManagementServerSPIURLAvailable())
                    {
                        _regions = GetRegionsFromSPI();   
                    }
                }
            }

            return _regions;
        }

        public bool IsRegionManagementServerSPIURLAvailable()
        {
            bool isSPIAvailable = false;

            string SPIURL = options.Value.regionManagementSPIURL;

            try
            {

                HttpClient client = new HttpClient();

                var callSPI = client.GetAsync(options.Value.regionManagementSPIURL);
                HttpResponseMessage response = callSPI.Result;

                if (response != null && response.StatusCode == HttpStatusCode.OK)
                {
                    isSPIAvailable = true;
                    Log<bool>(LogLevel.Debug, LogSourcePoint.General, $"Region Management SPIURL Available: {SPIURL}", null);
                }
                
                else
                {                  
                    Log<bool>(LogLevel.Debug, LogSourcePoint.General, $"Region Management SPIURL not Available: {SPIURL},Description: {response.ReasonPhrase},Status code: {response.StatusCode}", null);
                }
            }
            catch (Exception ex)
            {         
                Log<bool>(LogLevel.Critical, LogSourcePoint.General, $"Region Management SPIURL not Available: {SPIURL}", ex);
            }

            return isSPIAvailable;
        }

        private static List<RegionManagementResultResponse> GetRegionsFromSPI()
        {
            List<RegionManagementResultResponse> result = new List<RegionManagementResultResponse>();

            result = regionService.GetAllCountryAccessibilities();

            return result;
        }

        public Dictionary<string, RegionManagementAllowanceResponse> RegionManagementAllowance()
        {
            Dictionary<string, RegionManagementAllowanceResponse> list = new Dictionary<string, RegionManagementAllowanceResponse>();
            Dictionary<string, RegionManagementAllowanceResponse> regionAllowance = new Dictionary<string, RegionManagementAllowanceResponse>();

            list = GetRegionSettingList();

            if (list == null || list.Count == 0) throw new NullReferenceException("list is null, return null from RegionManagement Singleton");

            var ipAddress = CommonHelper.GetIpAddress(httpContextAccessor.HttpContext);
       
            Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, $"ipAddress:{ipAddress}", null);

            var countryCode = geoIpService.GetCountryCode(ipAddress);
        
            Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, $"countryCode:{countryCode}", null);

            if (list == null) throw new NullReferenceException("list is null, return null from MemoryCache");

            var data = list.Where(ip => ip.Key.Equals(countryCode, StringComparison.InvariantCultureIgnoreCase)).ToList();
            var allowance = new RegionManagementAllowanceResponse();
            if (data.Count > 0)
            {
                allowance.IsAllowedToAccess = data[0].Value.IsAllowedToAccess;
                allowance.IsAllowedToRegister = data[0].Value.IsAllowedToRegister;
                regionAllowance.Add(data[0].Key, allowance);
            }
            else
            {
                allowance.IsAllowedToAccess = true;
                allowance.IsAllowedToRegister = true;
                regionAllowance.Add("Default", allowance);             
                Log<InternalPartnerService>(LogLevel.Information, LogSourcePoint.Service, $"regionAllowance : Default", null);
            }

            return regionAllowance;
        }
    }
}
