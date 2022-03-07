using System.Collections.Generic;

namespace Affiliate.Service.Models.Response.Common
{
    public class DialCodeRespnose
    {
        public int Code { get; set; }
        public string Descr { get; set; }
        public string CountryCode { get; set; }

        public override bool Equals(object obj)
        {
            var other = (DialCodeRespnose)obj;
            return Code.Equals(other.Code);
        }

        public override int GetHashCode()
        {
            return base.GetHashCode();
        }
    }

    public class DialCodeModelComparer : IComparer<DialCodeRespnose>
    {
        public int Compare(DialCodeRespnose x, DialCodeRespnose y)
        {
            if (x.Code > y.Code)
                return 1;
            if (x.Code < y.Code)
                return -1;

            return 0;
        }
    }
}
