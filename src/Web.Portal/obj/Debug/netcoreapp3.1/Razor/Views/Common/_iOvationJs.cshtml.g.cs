#pragma checksum "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_iOvationJs.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "36008617bc3736891ecba2e8e0f4219a83260e8b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Common__iOvationJs), @"mvc.1.0.view", @"/Views/Common/_iOvationJs.cshtml")]
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
#nullable restore
#line 1 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_iOvationJs.cshtml"
using Affiliate.General.Models.Config;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_iOvationJs.cshtml"
using Microsoft.Extensions.Options;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"36008617bc3736891ecba2e8e0f4219a83260e8b", @"/Views/Common/_iOvationJs.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"73b6f7687347886b1ac18756a49c69f69711389d", @"/Views/_ViewImports.cshtml")]
    public class Views_Common__iOvationJs : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<script type=""text/javascript"">
    // basic configuration
    var io_bbout_element_id = 'io188AffBlackBox'; // populate ioBlackBox in form
    var io_install_stm = false; // do not install Active X
    var io_exclude_stm = 12; // do not run Active X
    var io_install_flash = false; // do not install Flash
    var io_enable_rip = true; // enable detection of Real IP
    function GetIovationBlackBox(passTime) {
        var bb_data = ioGetBlackbox();
        if (bb_data.finished || passTime > 10) {
            return bb_data.blackbox;
        }
        setTimeout(GetBlackBox(passTime + 1), 100);
    }
</script>
<script");
            BeginWriteAttribute("src", " src=\"", 777, "\"", 823, 1);
#nullable restore
#line 19 "D:\188\web.affiliateCore\src\Web.Portal\Views\Common\_iOvationJs.cshtml"
WriteAttributeValue("", 783, settings.Value.IOvationJavascriptSource, 783, 40, false);

#line default
#line hidden
#nullable disable
            EndWriteAttribute();
            WriteLiteral(" type=\"text/javascript\" async></script>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public IOptionsSnapshot<InternalPartnerConfig> settings { get; private set; }
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
