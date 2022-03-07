using System;

namespace Affiliate.Service.Models.Response.System
{
    public class WhiteLabelUrlDto
    {
        public Guid Id { get; set; }
        public int Platform { get; set; }
        public string GeoLocation { get; set; }
        public string LandingUrl { get; set; }
        public string SiteUrl { get; set; }
    }
}
