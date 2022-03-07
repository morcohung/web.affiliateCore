using Affiliate.General.Enums;
using Affiliate.General.Models;
using Microsoft.Extensions.Logging;
using System;

namespace Affiliate.General.EventHandlers
{
    public class BaseLog
    {
        /// <summary>
        /// log event
        /// </summary>
        public event LogHandler OnLog;

        /// <summary>
        /// raise log event
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="level"></param>
        /// <param name="point"></param>
        /// <param name="message"></param>
        /// <param name="ex"></param>
        /// <param name="callerMemberClass"></param>
        /// <param name="callerMemberName"></param>
        protected void Log<T>(LogLevel level, LogSourcePoint point, string message, Exception ex, [System.Runtime.CompilerServices.CallerFilePath] string callerMemberClass = "", [System.Runtime.CompilerServices.CallerMemberName] string callerMemberName = "")
        {
            OnLog?.Invoke(new GeneralLogModel()
            {
                CallerMemberFile = $"{callerMemberClass}",
                CallerMemberName = $"{callerMemberName}",
                Type = typeof(T),
                Ex = ex,
                Level = level,
                Message = message,
                Point = point
            });
        }

        /// <summary>
        /// raise log event
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="level"></param>
        /// <param name="point"></param>
        /// <param name="message"></param>
        /// <param name="ex"></param>
        /// <param name="callerMemberClass"></param>
        /// <param name="callerMemberName"></param>
        protected void Log(GeneralLogModel model)
        {
            OnLog?.Invoke(model);
        }
    }
}
