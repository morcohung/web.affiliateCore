using log4net;
using System.Collections.Generic;
using System.IO;
using Web.Portal.Models.Configuration;
using Web.Portal.Utilities;

namespace Web.Portal.Constants
{
    public class AppConfiguration
    {
        private static ILog log = LogManager.GetLogger(typeof(AppConfiguration).Name);

        public static List<SubDomainSetting> SubDomainSettings { get; private set; }
        public static Dictionary<string, string> AssetsManifest { get; private set; }
        public static List<LanguageInfo> Languages { get; private set; }

        public static void Initialize(string folderPath)
        {
            SubDomainSettings = XmlSerializerHelper.ToObj<List<SubDomainSetting>>(GetXml(folderPath, "SubDomainSetting.config"));
            AssetsManifest = JsonSerializerHelpr.ToObj<Dictionary<string, string>>(folderPath, "AssetsManifest.json");
            Languages = XmlSerializerHelper.ToObj<List<LanguageInfo>>(GetXml(folderPath, "Languages.config"));
        }

        private static string GetXml(string folderPath, string fileName)
        {
            return GetXml(string.Concat(folderPath, fileName));
        }

        private static string GetXml(string filePath)
        {
            if (File.Exists(filePath))
            {
                return File.ReadAllText(filePath);
            }
            else
            {
                log.Debug("AppConfigManager meet with the following error:");
                log.Debug("Config File " + filePath + " doesn't existed at all!");
                return null;
            }
        }
    }
}
