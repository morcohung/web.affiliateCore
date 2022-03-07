#pragma checksum "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_GlobalVariables.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "3f120811e394158fe1e870f56089e7c321fe5362"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Common__GlobalVariables), @"mvc.1.0.view", @"/Views/Common/_GlobalVariables.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "D:\188\web.affiliateCore\src\Web.Portal\Views\_ViewImports.cshtml"
using Web.Portal;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\188\web.affiliateCore\src\Web.Portal\Views\_ViewImports.cshtml"
using Web.Portal.Models;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"3f120811e394158fe1e870f56089e7c321fe5362", @"/Views/Common/_GlobalVariables.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"73b6f7687347886b1ac18756a49c69f69711389d", @"/Views/_ViewImports.cshtml")]
    public class Views_Common__GlobalVariables : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<script language=\"javascript\" type=\"text/javascript\">\r\n    var gv = {\r\n        lan: \'");
#nullable restore
#line 3 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_GlobalVariables.cshtml"
         Write(ViewBag.Language);

#line default
#line hidden
#nullable disable
            WriteLiteral("\',\r\n        lans: JSON && JSON.parse(\'");
#nullable restore
#line 4 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_GlobalVariables.cshtml"
                             Write(Html.Raw(ViewBag.LanguagesArray));

#line default
#line hidden
#nullable disable
            WriteLiteral("\'),\r\n        googletagid: \'");
#nullable restore
#line 5 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_GlobalVariables.cshtml"
                 Write(ViewBag.GoogleTagId);

#line default
#line hidden
#nullable disable
            WriteLiteral("\',\r\n        cdnurl:\'");
#nullable restore
#line 6 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_GlobalVariables.cshtml"
           Write(ViewBag.CdnUrl);

#line default
#line hidden
#nullable disable
            WriteLiteral(@"'
    };

    function setCurrentlan() {
        var language = location.pathname.split(""/"")[1];
        var matchlan = gv.lans.filter(function (lan) { return lan.value === language; });
        var deflan = matchlan.length > 0 ? matchlan[0] : getbrowserlan();
        gv.language = deflan;
        gv.lan = deflan.value;
    }

    function getbrowserlan() {
        var browserlan = navigator.language;
        var deflan = gv.lans.filter(function (lan) {
            browserlan = browserlan.substr(0, 2).toLowerCase();
            return lan.value.indexOf(browserlan) != -1;
        });
        return deflan.length != 0 ? deflan[0] : gv.lans[0];
    }

    setCurrentlan();
</script>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591