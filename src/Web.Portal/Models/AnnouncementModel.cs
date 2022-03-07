using Affiliate.General.Enums;
using System;
using System.Collections.Generic;
using Web.Portal.Models.Shared;

namespace Web.Portal.Models
{
    public class AnnouncementAccessModel
    {
        public AccessLevel AnnouncementAccess { get; set; }
    }

    public class AnnouncementListModel : ResponseModel
    {
        public IList<AnnouncementModel> AnnouncementList { get; set; }
        public PaginationModel Page { get; set; }

        public AnnouncementListModel()
        {
            AnnouncementList = new List<AnnouncementModel>();
        }
    }


    public class AnnouncementModel
    {
        public Guid Id { get; set; }
        public int? Ord { get; set; }
        public string Text { get; set; }
        public string EffectiveDate { get; set; }
        public string Language { get; set; }
        public string Type { get; set; }
    }

    public class AnnouncementTypeModel
    {
        public int Type { get; set; }
        public string Descr { get; set; }
    }
}
