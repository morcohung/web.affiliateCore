namespace Affiliate.Service.Models.Response.InternalPartner
{
    public class RegionManagementResultResponse
    {
        public bool CanAccessMemberSite { get; set; }
        public string Code { get; set; }
        public int CountryId { get; set; }
        public bool IsDefaultCounty { get; set; }
        public string Name { get; set; }
        public string Region { get; set; }
        public bool CanMemberRegister { get; set; }
    }
}
