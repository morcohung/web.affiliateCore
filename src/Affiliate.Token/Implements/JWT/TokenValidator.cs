using Affiliate.Token.Enum;
using Affiliate.Token.Interfaces;
using Affiliate.Token.Models.Config;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Affiliate.Token.Implements.JWT
{
    public class TokenValidator: ITokenValidator
    {
        private readonly IOptions<JWTConfig> _options;
        public TokenValidator(IOptions<JWTConfig> options)
        {
            _options = options;
        }

        public bool ValiToken(string encodeJwt, Func<Dictionary<string, string>, bool> validatePayLoad = null)
        {
            var success = true;
            var jwtArr = encodeJwt.Split('.');
            if (jwtArr.Length < 3)
            {
                return false;
            }
            var header = JsonConvert.DeserializeObject<Dictionary<string, string>>(Base64UrlEncoder.Decode(jwtArr[0]));
            var payLoad = JsonConvert.DeserializeObject<Dictionary<string, string>>(Base64UrlEncoder.Decode(jwtArr[1]));
            //配置檔案中取出來的簽名祕鑰
            var hs256 = new HMACSHA256(Encoding.ASCII.GetBytes(_options.Value.SignKey));
            //驗證簽名是否正確（把使用者傳遞的簽名部分取出來和伺服器生成的簽名匹配即可）
            success = success && string.Equals(jwtArr[2], Base64UrlEncoder.Encode(hs256.ComputeHash(Encoding.UTF8.GetBytes(string.Concat(jwtArr[0], ".", jwtArr[1])))));
            if (!success)
            {
                return success;//簽名不正確直接返回
            }

            var now = ToUnixEpochDate(DateTime.UtcNow);
            success = success && (now >= long.Parse(payLoad["nbf"].ToString()) && now < long.Parse(payLoad["exp"].ToString()));

            //不需要自定義驗證不傳或者傳遞null即可
            if (validatePayLoad == null)
                return true;

            //再其次 進行自定義的驗證
            success = success && validatePayLoad(payLoad);

            return success;
        }
        /// <summary>
        /// 時間轉換
        /// </summary>
        /// <param name="date"></param>
        /// <returns></returns>
        private long ToUnixEpochDate(DateTime date)
        {
            return (long)Math.Round((date.ToUniversalTime() - new DateTimeOffset(1970, 1, 1, 0, 0, 0, TimeSpan.Zero)).TotalSeconds);
        }

        public TokenType ValiTokenState(string encodeJwt, Func<Dictionary<string, string>, bool> validatePayLoad, Action<Dictionary<string, string>> action)
        {
            var jwtArr = encodeJwt.Split('.');
            if (jwtArr.Length < 3)//資料格式都不對直接pass
            {
                return TokenType.Fail;
            }
            var header = JsonConvert.DeserializeObject<Dictionary<string, string>>(Base64UrlEncoder.Decode(jwtArr[0]));
            var payLoad = JsonConvert.DeserializeObject<Dictionary<string, string>>(Base64UrlEncoder.Decode(jwtArr[1]));
            var hs256 = new HMACSHA256(Encoding.ASCII.GetBytes(_options.Value.SignKey));
            //驗證簽名是否正確（把使用者傳遞的簽名部分取出來和伺服器生成的簽名匹配即可）
            if (!string.Equals(jwtArr[2], Base64UrlEncoder.Encode(hs256.ComputeHash(Encoding.UTF8.GetBytes(string.Concat(jwtArr[0], ".", jwtArr[1]))))))
            {
                return TokenType.Fail;
            }
            //其次驗證是否在有效期內（必須驗證）
            var now = ToUnixEpochDate(DateTime.UtcNow);
            if (!(now >= long.Parse(payLoad["nbf"].ToString()) && now < long.Parse(payLoad["exp"].ToString())))
            {
                return TokenType.Expired;
            }

            //不需要自定義驗證不傳或者傳遞null即可
            if (validatePayLoad == null)
            {
                action(payLoad);
                return TokenType.Ok;
            }
            //再其次 進行自定義的驗證
            if (!validatePayLoad(payLoad))
            {
                return TokenType.Fail;
            }
            //可能需要獲取jwt摘要裡邊的資料，封裝一下方便使用
            action(payLoad);
            return TokenType.Ok;
        }
    }
}
