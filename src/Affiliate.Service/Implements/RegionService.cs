using Affiliate.General.Enums;
using Affiliate.General.EventHandlers;
using Affiliate.General.Models.Config;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.InternalPartner;
using log4net;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;

namespace Affiliate.Service.Implements
{
    public class RegionService : BaseLog, IRegionService
    {   
        private readonly IOptions<InternalPartnerConfig> _options;
        public RegionService(IOptions<InternalPartnerConfig> options)
        {
            _options = options;
        }

        public List<RegionManagementResultResponse> GetAllCountryAccessibilities()
        {
            HttpClient client = new HttpClient();

            List<RegionManagementResultResponse> deserialized = new List<RegionManagementResultResponse>();

            var callSPI = client.GetAsync(_options.Value.regionManagementSPIURL);
            HttpResponseMessage resp = callSPI.Result;

            if (resp.IsSuccessStatusCode)
            {
                string result = resp.Content.ReadAsStringAsync().Result;
                deserialized = JsonConvert.DeserializeObject<List<RegionManagementResultResponse>>(result);
            }

            return deserialized;
        }

        public bool IsRegionManagementServerSPIURLAvailable()
        {
            bool isSPIAvailable = false;

            string SPIURL = _options.Value.regionManagementSPIURL;

            try
            {

                HttpClient client = new HttpClient();

                var callSPI = client.GetAsync(_options.Value.regionManagementSPIURL);
                HttpResponseMessage response = callSPI.Result;

                if (response != null && response.StatusCode == HttpStatusCode.OK)
                {
                    isSPIAvailable = true;
                    Log<RegionService>(LogLevel.Debug, LogSourcePoint.Service, $"Region Management SPIURL Available{SPIURL}", null);
                }
                else
                {
                    Log<RegionService>(LogLevel.Debug, LogSourcePoint.Service, $"Region Management SPIURL not Available : {SPIURL} - Description: {response.ReasonPhrase} - Status code: {response.StatusCode}", null);
                }
            }
            catch (Exception ex)
            {
                Log<RegionService>(LogLevel.Error, LogSourcePoint.Service, $"Region Management SPIURL not Available : {SPIURL}", null);
                Log<RegionService>(LogLevel.Error, LogSourcePoint.Service, $"{ex.Message} {ex}", null);                
            }

            return isSPIAvailable;
        }
    }
}
