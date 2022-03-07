using Affiliate.Service.Enums;
using System;

namespace Affiliate.Service.Models.Response.Member
{
    public class MemberInfoDto
    {
        public Guid Id { get; set; }

		public string Name { get; set; }

		public MemberStatus MemberStatus { get; set; }

		public string Currency { get; set; }

		public string Language { get; set; }

		public Guid CommissionModeId { get; set; }

		public string LastName { get; set; }

		public string FirstName { get; set; }		

		public string Country { get; set; }

		public string City { get; set; }

		public string Address { get; set; }

		public string ZipCode { get; set; }

		public string ContactNumber { get; set; }

		public string Code { get; set; }

		public string ChatTool { get; set; }

		public string ChatAddress { get; set; }

		public string SecurityQuestion { get; set; }

		public string SecurityAnswer { get; set; }

		public SettlementCycleType SettlementCycle { get; set; }

		public DateTime CreatedTime { get; set; }

		public LockedStatus LockStatus { get; set; }
	}
}
