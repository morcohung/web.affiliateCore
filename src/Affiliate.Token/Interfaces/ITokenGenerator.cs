using Affiliate.Token.Models.JWT;
using System.Collections.Generic;

namespace Affiliate.Token.Interfaces
{
    public interface ITokenGenerator
    {    
        TnToken CreateToken<T>(T user) where T : class;
     
        TnToken CreateToken(Dictionary<string, string> keyValuePairs);

        TnToken RefreshToken(string token);
    }
}
