namespace Affiliate.Token.Models.JWT
{
    public class ReturnModel
    {
        public int Code { get; set; }

        public string Msg { get; set; }

        public object Data { get; set; }

        public TnToken TnToken { get; set; }
    }
}
