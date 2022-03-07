using Affiliate.Token.Enum;
using System;
using System.Collections.Generic;

namespace Affiliate.Token.Interfaces
{
    public interface ITokenValidator
    {
        bool ValiToken(string encodeJwt, Func<Dictionary<string, string>, bool> validatePayLoad = null);

        TokenType ValiTokenState(string encodeJwt, Func<Dictionary<string, string>, bool> validatePayLoad, Action<Dictionary<string, string>> action);
    }
}
