namespace Affiliate.General.Models.Config
{
    public class InternalPartnerConfig
    {
        public bool IOvationEnabled { get; set; }

        public string IOvationSuffix { get; set; }

        public string IOvationUrlHost { get; set; }

        public string IOvationUrlService { get; set; }

        public int IOvationBusinessUnitId { get; set; }

        public string IOvationJavascriptSource { get; set; }

        public string cdnContentAddress { get; set; }

        public string cdnFolderPathForWatcher { get; set; }

        public string regionManagementSPIURL { get; set; }
    }
}
