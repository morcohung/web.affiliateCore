using System.Collections.Generic;

namespace Affiliate.Service.Models.Response.IMDB
{
    public class IpLineIMDBResponse
    {
        public long StartIp { get; set; }
        public long EndIp { get; set; }
        public string CountryCode { get; set; }
        public string CountryName { get; set; }
    }

    public class IpConfigIMDBResponse
    {
        public IList<IpLineIMDBResponse> IpIMDBList { get; set; }

        public IpConfigIMDBResponse()
        {
            IpIMDBList = new List<IpLineIMDBResponse>();
        }
    }
}
