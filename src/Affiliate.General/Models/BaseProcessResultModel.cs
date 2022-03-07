using Affiliate.General.Enums;

namespace Affiliate.General.Models
{
    public abstract class BaseProcessResultModel
    {
        /// <summary>
        /// 
        /// </summary>
        public ProcessResultType ResultType { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }
    }
}
