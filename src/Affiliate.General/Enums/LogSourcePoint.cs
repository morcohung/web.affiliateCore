using System;

namespace Affiliate.General.Enums
{
    [Flags]
    public enum LogSourcePoint
    {
        /// <summary>
        /// 
        /// </summary>
        None = 0,
        /// <summary>
        /// 
        /// </summary>
        Repository = 1,
        /// <summary>
        /// 
        /// </summary>
        Service = 2,
        /// <summary>
        /// The job
        /// </summary>
        Job = 4,
        /// <summary>
        /// 
        /// </summary>
        General = int.MaxValue,
        // next 4
    }
}
