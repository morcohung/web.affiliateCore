using System;

namespace Affiliate.Service.Models.Request.InternalPartner
{
    public class AgileCheckRequest
    {
        public int BuId { get; set; }
        public string UserCode { get; set; }
        public string DeviceId { get; set; }
        public string BlackBox { get; set; }
        public string Address { get; set; }
        public DateTime RegisterDate { get; set; }
        public Enums.AgileCheckEnum.RuleSet RuleSet { get; set; }
    }
}
