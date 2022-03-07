using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using System.Collections.Generic;
using System.Linq;

namespace Web.Portal.Routing
{
    public class ClientSideRoutingConstraint : IRouteConstraint
    {
        public bool Match(HttpContext httpContext, IRouter route, string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
        {
            if (values.ContainsKey(routeKey))
            {             
                var pathInfo = values["pathInfo"] as string;
                var byPassPage = new Dictionary<string, string>()
                {
                    { "postlogin", "postlogin" }
                };
                var result = byPassPage.Any(x => pathInfo.Contains(x.Value));
                if (result)
                {
                    return false;
                }            
            }
            return true;
        }
    }
}
