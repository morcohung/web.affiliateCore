using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Distributed;
using System;
using System.Text;
using System.Threading.Tasks;

namespace Web.Portal.Controllers
{
    public class ReportController : ControllerBase
    {
        private readonly IDistributedCache _rediscache;

        public ReportController(IDistributedCache rediscache)
        {
            _rediscache = rediscache;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            var key = "key";
            var valueByte = await _rediscache.GetAsync(key);
            if (valueByte == null)
            {
                await _rediscache.SetAsync(key, Encoding.UTF8.GetBytes("value"), new DistributedCacheEntryOptions().SetSlidingExpiration(TimeSpan.FromSeconds(3000)));
                valueByte = await _rediscache.GetAsync(key);
            }
            var valueString = Encoding.UTF8.GetString(valueByte);
            return valueString;
        }
    }
}
