using Affiliate.Service.Models.Response.Common;
using System.Collections.Generic;

namespace Affiliate.Service.Interfaces
{
    public interface ICommonService
    {
        IList<LanguageResponse> GetLanguage();

        //Dictionary<string, Dictionary<string, string>> GetFrontLocalizationList();

        List<LocalizationCountryModel> GetLocalizationCountryList(string langCode);

        List<ChatToolResponse> GetChatToolList(string langCode);
    }
}
