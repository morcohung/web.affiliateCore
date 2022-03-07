using Affiliate.Service.Models.Response.System;
using System.Collections.Generic;

namespace Affiliate.Service.Interfaces
{
    public interface ISystemService
    {
        List<AnnouncementDto> GetAnnouncement(string localeCode);

        WhiteLabelUrlDto GetWhiteLabelUrl(string geolocation, int platform);
    }
}
