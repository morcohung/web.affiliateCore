using Affiliate.General.Enums;
using Microsoft.Extensions.Logging;
using System;

namespace Affiliate.General.Models
{
    public class GeneralLogModel
    {
        /// <summary>
        /// 
        /// </summary>
        public LogLevel Level { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public LogSourcePoint Point { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Type Type { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Message { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Exception Ex { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CallerMemberName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string CallerMemberFile { get; set; }
    }
}
