using Affiliate.General.Enums;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Request;
using Affiliate.Service.Models.Response.Common;
using Affiliate.Service.Utilities;
using log4net;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Web.Portal.Models;

namespace Web.Portal.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(CommonController));
        public ICommonService commonService { get; set; }
        public IGeoIpIMDBService geoIpService { get; set; }
        public IGeoIpAllowService geoIpAllowService { get; set; }
        public IInternalPartnerService internalPartnerService { get; set; }
        public ISystemService systemService { get; set; }

        public CommonController(ICommonService _commonService, IGeoIpIMDBService _geoIpService, IGeoIpAllowService _geoIpAllowService, IInternalPartnerService _internalPartnerService, ISystemService _systemService)
        {
            commonService = _commonService;
            geoIpService = _geoIpService;
            geoIpAllowService = _geoIpAllowService;
            internalPartnerService = _internalPartnerService;
            systemService = _systemService;
        }

        [HttpGet("Language")]
        public List<LanguageResponse> Language()
        {
            var list = new List<LanguageResponse>();

            var dto = commonService.GetLanguage();

            foreach (var item in dto)
            {
                list.Add(new LanguageResponse() { Id = item.Id, Code = item.Code, Descr = item.Descr });
            }

            return list;
        }

        [HttpGet("GetLocalizationCountryList")]
        public List<LocalizationCountryModel> GetLocalizationCountryList(string langCode)
        {
            var list = new List<LocalizationCountryModel>();

            try
            {
                var dto = commonService.GetLocalizationCountryList(langCode);

                var allowance = internalPartnerService.GetBlockedRegionToRegisterList();

                var ip = CommonHelper.GetIpAddress(HttpContext);
                bool isIpAllowed = geoIpAllowService.IsIpAllowed(ip);

                if (isIpAllowed)
                {
                    var countryCode = geoIpService.GetCountryCode(ip);
                    allowance.Remove(countryCode);
                }

                foreach (var b in dto.Where(b => allowance.All(b2 => b2.Key != b.LangCode)))
                {
                    list.Add(new LocalizationCountryModel() { Code = b.Code, LangCode = b.LangCode, LangValue = b.LangValue });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }

            return list;
        }

        [HttpGet("RedirectTo188MemberSite")]
        public ResponseModel RedirectTo188MemberSite(bool isMobileBrowser)
        {
            var response = new ResponseModel();
            try
            {
                var ipAddress = CommonHelper.GetIpAddress(HttpContext);
                var geolocation = geoIpService.GetCountryCode(ipAddress);
                var platform = isMobileBrowser ? (int)PlatformType.Mobile : (int)PlatformType.Desktop;
                var whitelabel = systemService.GetWhiteLabelUrl(geolocation == "TW" ? "SG" : geolocation, platform);
                var redirect = CommonHelper.FormatLandingUrl(whitelabel.LandingUrl);

                response.Message = redirect;
                response.Status = 0;
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
            return response;
        }

        [HttpGet("ChatTools")]        
        public List<ChatToolResponse> ChatTools(string langCode)
        {
            var list = new List<ChatToolResponse>();

            try
            {
                list = commonService.GetChatToolList(langCode);
                var response = new List<ChatToolResponse>();
                var culture = new CultureInfo(langCode);
                foreach (var item in list)
                {
                    response.Add(new ChatToolResponse() { Code = item.Code, Descr = item.Descr });
                }
            }
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
            }
            return list;
        }

//        [HttpGet("DialCode")]
//        public List<DialCodeRespnose> DialCode()
//        {
//            var list = new List<DialCodeRespnose>();

//            list = commonService.GetDialCodeList("");        

//            list.Sort(new DialCodeModelComparer());

//            return list;
//        }

//        [HttpGet]       
//        public CurrencyResponse Currency(CurrencyRequest model)
//        {
//            string ipAddress = string.Empty;
//#if DEBUG
//            ipAddress = "106.14.249.30";
//#else
//ipAddress =  CommonHelper.GetIpAddress(HttpContext);
//#endif

//            var _countryCode = geoIpService.GetCountryCode(ipAddress);        

//            if (string.IsNullOrWhiteSpace(model.CountryCode) == false)
//                _countryCode = model.CountryCode;

//            //var _settings = ConfigurationDAO.CountrySetting.GetSettingValue(_countryCode);

//            //return new CurrencyResponse()
//            //{
//            //    Currencies = _settings.Currencies,
//            //    Default = _settings.Default
//            //};
//        }
    }
}
