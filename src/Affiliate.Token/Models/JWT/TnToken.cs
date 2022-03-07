using System;

namespace Affiliate.Token.Models.JWT
{
    public class TnToken
    {
        public string Token { get; set; }

        public DateTime Expires { get; set; }
    }
}
