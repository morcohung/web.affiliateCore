using System;

namespace Affiliate.Service.Models.Response.System
{
    public class AnnouncementDto
    {
        public Guid Id { get; set; }
        public string LangDescr { get; set; }
        public string WhitelabelCode { get; set; }
        public int? Ord { get; set; }
        public string Text { get; set; }
        public DateTime EffectiveDate { get; set; }
        public int Type { get; set; }
    } 
}
