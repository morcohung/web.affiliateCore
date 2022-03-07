using Affiliate.Token.Interfaces;
using Affiliate.Token.Models.Config;
using Affiliate.Token.Models.JWT;
using Affiliate.Token.Utilities;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Affiliate.Token.Implements.JWT
{
    public class TokenGenerator : ITokenGenerator
    {
        private readonly IOptions<EncryptorConfig> _options;
        public TokenGenerator(IOptions<EncryptorConfig> options)
        {
            _options = options;
        }

        public TnToken CreateToken<T>(T user) where T : class
        {
            List<Claim> claims = new List<Claim>();

            foreach (var item in user.GetType().GetProperties())
            {
                object obj = item.GetValue(user);
                string value = "";
                if (obj != null)
                    value = obj.ToString();

                claims.Add(new Claim(item.Name, value));
            }

            return CreateToken(claims);
        }

        public TnToken CreateToken(Dictionary<string, string> keyValuePairs)
        {
            List<Claim> claims = new List<Claim>();

            foreach (var item in keyValuePairs)
            {
                claims.Add(new Claim(item.Key, TokenCrypto.EncryptAES(item.Value, _options.Value.AESConfig.Key, _options.Value.AESConfig.IV)));
            }
            Dictionary<string, string> expireTime = new Dictionary<string, string>
            {
                { "ExpireTime",DateTime.Now.AddMinutes(_options.Value.JWTConfig.AccessTokenExpiresMinutes).ToString() }
            };
            foreach (var item in expireTime)
            {
                claims.Add(new Claim(item.Key, item.Value));
            }
            return CreateTokenString(claims);
        }

        private TnToken CreateTokenString(List<Claim> claims)
        {
            var now = DateTime.Now;
            var expires = now.Add(TimeSpan.FromMinutes(_options.Value.JWTConfig.AccessTokenExpiresMinutes));
            var token = new JwtSecurityToken(
                issuer: _options.Value.JWTConfig.Issuer,
                //audience: _options.Value.Audience,
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.Value.JWTConfig.SignKey)), SecurityAlgorithms.HmacSha256));
            return new TnToken { Token = new JwtSecurityTokenHandler().WriteToken(token), Expires = expires };
        }

        public TnToken RefreshToken(string token)
        {
            var jwtArr = token.Split('.');
            var payLoad = JsonConvert.DeserializeObject<Dictionary<string, string>>(Base64UrlEncoder.Decode(jwtArr[1]));

            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>
            {
                { "Id", TokenCrypto.DecryptAES(payLoad["Id"].ToString(), _options.Value.AESConfig.Key, _options.Value.AESConfig.IV) },
                { "Name", TokenCrypto.DecryptAES(payLoad["Name"].ToString(), _options.Value.AESConfig.Key, _options.Value.AESConfig.IV) },
                { "Language", TokenCrypto.DecryptAES(payLoad["Language"].ToString(), _options.Value.AESConfig.Key, _options.Value.AESConfig.IV)  },
            };
            return CreateToken(keyValuePairs);
        }
    }
}
