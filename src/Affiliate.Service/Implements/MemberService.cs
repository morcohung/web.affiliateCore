using Affiliate.General.Models.Config;
using Affiliate.Repositories.Constant;
using Affiliate.Repositories.Enums;
using Affiliate.Repositories.Utilities;
using Affiliate.Service.Interfaces;
using Affiliate.Service.Models.Response.Member;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using Affiliate.Repositories.DAL;
using Affiliate.General.EventHandlers;
using Microsoft.Extensions.Logging;
using Affiliate.General.Enums;

namespace Affiliate.Service.Implements
{
    public class MemberService : BaseLog, IMemberService
    {
        private readonly IOptions<ConnectionConfig> _options;
        public MemberService(IOptions<ConnectionConfig> options)
        {
            _options = options;
        }

        public MemberInfoDto GetMemberInfo(string affiliateCode)
        {
            Log<MemberService>(LogLevel.Information, LogSourcePoint.Service, "GetMemberInfo Start", null);
            
            var parameters = DbParameterBuilder.Create()
                         .AddAdditionalParameter("affiliate_code", () => affiliateCode)
                         .Build();   
            MemberInfoDto entities;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _options.Value.AIP2Connection))
            {
                entities = agent.ExecuteObjects<MemberInfoDto>(StoreProcedures.SP_MemberGetMemberInfo, parameters).ToList().FirstOrDefault();
            }

            Log<MemberService>(LogLevel.Information, LogSourcePoint.Service, "GetMemberInfo End", null);
            return entities;
        }      

        public bool Login(Guid account_id, string password, string ip)
        {
            Log<MemberService>(LogLevel.Information, LogSourcePoint.Service, "Login Start", null);

            var parameters = DbParameterBuilder.Create()
                         .AddAdditionalParameter("account_id", () => account_id)
                         .AddAdditionalParameter("password", () => password)
                         .AddAdditionalParameter("ip", () => ip)
                         .Build();
            bool isLogin = false;
            using (
                var agent = new DapperDbAgent(DataProvider.SqlServer,
                    _options.Value.AIP2Connection))
            {
                isLogin = agent.ExecuteObjects<bool>(StoreProcedures.SP_AuthMemberLogin, parameters).ToList().FirstOrDefault();
            }

            Log<MemberService>(LogLevel.Information, LogSourcePoint.Service, "Login End", null);
            return isLogin;

        }
    }
}
