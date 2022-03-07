using Affiliate.General.Enums;
using Affiliate.Repositories.Constant;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Utilities;
using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Web.Portal.Models;

namespace Web.Portal.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class WebController : ControllerBase
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(CommonController));

        public IGeoIpIMDBService geoIpService { get; set; }
        public ISystemService systemService { get; set; }       

        public WebController(IGeoIpIMDBService _geoIpService, ISystemService _systemService)
        {
            geoIpService = _geoIpService;
            systemService = _systemService;
        }

        [HttpPost("SetCurrentLang")]
        public void SetCurrentLang(CurrentLangModel model)
        {
            HttpContext.Session.SetString(AipConstant.SessionCultureCode, model.langCode == "en-gb" ? "en" : model.langCode);
        }


    }
}
