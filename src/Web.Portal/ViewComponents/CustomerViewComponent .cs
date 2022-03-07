using Affiliate.General.Models.Config;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Web.Portal.Constants;

namespace Web.Portal.ViewComponents
{
    [ViewComponent(Name = "GlobalVariables")]
    public class GlobalVariablesViewComponent : ViewComponent
    {
        private readonly IOptions<GoogleAnalyticsConfig> _options;
        public GlobalVariablesViewComponent(IOptions<GoogleAnalyticsConfig> options)
        {
            _options = options;
        }

        public async Task<IViewComponentResult> InvokeAsync()
        {
            ViewBag.Language = "en-gb";
            ViewBag.LanguagesArray = JsonConvert.SerializeObject(AppConfiguration.Languages);
            ViewBag.GoogleTagId = _options.Value.GoogleTagId;        
            ViewBag.CdnUrl = AppConfiguration.SubDomainSettings.FirstOrDefault().url;
            return View("~/Views/Common/_GlobalVariables.cshtml"); 
        }    
    }

    [ViewComponent(Name = "IOvation")]
    public class IOvationComponent : ViewComponent
    {
        public async Task<IViewComponentResult> InvokeAsync()
        {
            return View("~/Views/Common/_iOvationJs.cshtml");
        }
    }
}
