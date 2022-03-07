using Affiliate.Service.Models.Response.Member;
using System;

namespace Affiliate.Service.Interfaces
{
    public interface IMemberService
    {
        MemberInfoDto GetMemberInfo(string affiliateCode);

        bool Login(Guid account_id, string password, string ip);
    }
}
