using System;
using Affiliate.General.Enums;
using Affiliate.Repositories.Constant;
using Affiliate.Service.Interfaces;
using log4net;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Web.Portal.Models;

namespace Web.Portal.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AnnouncementController : ControllerBase
    {
        private static readonly ILog Log = LogManager.GetLogger(typeof(AnnouncementController));

        public ISystemService systemService { get; set; }

        public AnnouncementController(ISystemService _systemService)
        {
            systemService = _systemService;         
        }
       
        [HttpGet("AnnouncementList")]
        public AnnouncementListModel AnnouncementList()
        {
            var model = new AnnouncementListModel();

            try
            {
                var CultureCode  = HttpContext.Session.GetString(AipConstant.SessionCultureCode);

                var dto = systemService.GetAnnouncement(CultureCode);

                foreach (var item in dto)
                {
                    model.AnnouncementList.Add(new AnnouncementModel()
                    {
                        Id = item.Id,
                        Ord = item.Ord,
                        Text = item.Text,
                        EffectiveDate = item.EffectiveDate.ToString(AipConstant.DateFormatDdMmmYyyy),
                        Language = item.LangDescr,
                        Type = LocalizeAnnouncementType((AnnouncementType)item.Type)
                    });
                }
            }        
            catch (Exception ex)
            {
                Log.Error(ex.Message, ex);
                model.Status = 1;
                model.Message = "error.retrieve.announcement.list";
            }

            return model;
        }

        private static string LocalizeAnnouncementType(AnnouncementType type)
        {
            var descr = "-";

            switch (type)
            {
                case AnnouncementType.Dashboard:
                    descr = "dashboard";
                    break;
                case AnnouncementType.MarqueeBeforeLogin:
                    descr = "marquee.before.login";
                    break;
                case AnnouncementType.MarqueeAfterLogin:
                    descr = "marquee.after.login";
                    break;
                default:
                    break;
            }
            return descr;
        }
    }
}
