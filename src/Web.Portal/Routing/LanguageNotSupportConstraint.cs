using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Linq;
using Web.Portal.Constants;

namespace Web.Portal.Routing
{
    public class LanguageNotSupportConstraint
    {
        public class LanguageConstraint : IRouteConstraint
        {
            public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
            {
                if (!values.ContainsKey(routeKey)) return false;

                var lang = values[routeKey].ToString();

                return AppConfiguration.Languages.Any(language => language.Value == lang);
            }
        }
    }
}
