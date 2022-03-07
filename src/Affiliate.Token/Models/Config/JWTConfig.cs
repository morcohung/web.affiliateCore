namespace Affiliate.Token.Models.Config
{
    public class JWTConfig
    {
        /// <summary>
        /// Token Issuer
        /// </summary>
        public string Issuer { get; set; }
        /// <summary>
        /// Token Audience
        /// </summary>
        //public string Audience { get; set; }
        /// <summary>
        /// Signing Key
        /// </summary>
        public string SignKey { get; set; }
        /// <summary>
        /// Expired time
        /// </summary>
        public int AccessTokenExpiresMinutes { get; set; }
    }
}
