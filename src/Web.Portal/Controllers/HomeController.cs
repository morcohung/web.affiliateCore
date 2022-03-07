using Affiliate.Repositories.Constant;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Web.Portal.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        private readonly IHttpContextAccessor _httpContextAccessor;      

        public HomeController(IHttpContextAccessor httpContextAccessor, ILogger<HomeController> logger)
        {
            _httpContextAccessor = httpContextAccessor;
            _logger = logger;
        }

        public IActionResult Index()
        {
            _httpContextAccessor.HttpContext.Session.SetString(AipConstant.SessionCultureCode,"en");
            return View();
        }
    }
}
