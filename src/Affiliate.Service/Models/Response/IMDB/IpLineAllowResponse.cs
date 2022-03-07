using System.Collections.Generic;

namespace Affiliate.Service.Models.Response.IMDB
{
    public class IpLineAllowResponse
    {
        public long StartIp { get; set; }
        public long EndIp { get; set; }
        public string Description { get; set; }
    }

    public class IpConfigAllowResponse
    {
        public IList<IpLineAllowResponse> IpAllowList { get; set; }

        public IpConfigAllowResponse()
        {
            IpAllowList = new List<IpLineAllowResponse>();
        }
    }
}
