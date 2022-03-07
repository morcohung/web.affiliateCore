using Affiliate.General.Enums;
using Affiliate.General.EventHandlers;
using Affiliate.General.Models.Config;
using Affiliate.Repositories.Constant;
using Affiliate.Repositories.DAL;
using Affiliate.Repositories.Enums;
using Affiliate.Repositories.Utilities;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.Member;
using Affiliate.Service.Models.Response.System;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Linq;

namespace Affiliate.Service.Implements
{
    public class SystemService : BaseLog, ISystemService
    {
        private readonly IOptions<ConnectionConfig> _options;
        public SystemService(IOptions<ConnectionConfig> options)
        {
            _options = options;
        }

        public List<AnnouncementDto> GetAnnouncement(string localeCode)
        {
            Log<SystemService>(LogLevel.Information, LogSourcePoint.Service, "GetAnnouncement Start", null);

            var parameters = DbParameterBuilder.Create()
                         .AddAdditionalParameter("localeCode", () => localeCode)
                         .Build();
            List<AnnouncementDto> entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _options.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<AnnouncementDto>(StoreProcedures.SP_SystemGetAnnouncement, parameters).ToList();
            }

            Log<SystemService>(LogLevel.Information, LogSourcePoint.Service, "GetAnnouncement End", null);
            return entities;
        }

        public WhiteLabelUrlDto GetWhiteLabelUrl(string geolocation, int platform)
        {
            Log<SystemService>(LogLevel.Information, LogSourcePoint.Service, "GetWhiteLabelUrl Start", null);

            var parameters = DbParameterBuilder.Create()
                         .AddAdditionalParameter("geolocation", () => geolocation)
                         .AddAdditionalParameter("platform", () => platform)
                         .Build();
            WhiteLabelUrlDto entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _options.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<WhiteLabelUrlDto>(StoreProcedures.SP_SystemGetWhitelabelUrl, parameters).ToList().FirstOrDefault();
            }

            Log<SystemService>(LogLevel.Information, LogSourcePoint.Service, "GetWhiteLabelUrl End", null);
            return entities;
        }
    }
}
