using System.Collections.Generic;

namespace Affiliate.Service.Models.Response.Common
{
    public class CurrencyResponse
    {
        public IEnumerable<string> Currencies { get; set; }
        public string Default { get; set; }
    }
}
