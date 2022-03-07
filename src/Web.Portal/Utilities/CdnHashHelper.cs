using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc.Razor.TagHelpers;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.AspNetCore.Razor.TagHelpers;
using Microsoft.Extensions.Caching.Memory;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.Encodings.Web;
using Web.Portal.Constants;

namespace Web.Portal.Utilities
{
    [HtmlTargetElement("script", Attributes = "[src^='~/'],cdn-hash")]
    [HtmlTargetElement("link", Attributes = "[href^='~/'],cdn-hash")]
    public sealed class CdnHashHelper : UrlResolutionTagHelper
    {
        public IMemoryCache Cache { get; }

        private static readonly Dictionary<string, string[]> ElementAttributeLookups =
           new Dictionary<string, string[]>(StringComparer.OrdinalIgnoreCase)
           {
                { "link", new[] { "href" } },
                { "script", new[] { "src" } },
           };

        public CdnHashHelper(
            IUrlHelperFactory urlHelperFactory,
            HtmlEncoder htmlEncoder
            ) : base(urlHelperFactory, htmlEncoder)
        {
            // todo: implement cache.
        }

        public override void Process(TagHelperContext context, TagHelperOutput output)
        {
            base.Process(context, output);
            if (output.TagName == null)
            {
                return;
            }

            string[] attributeNames;
            if (ElementAttributeLookups.TryGetValue(output.TagName, out attributeNames))
            {
                for (var i = 0; i < attributeNames.Length; i++)
                {
                    ProcessAttribute(output, attributeNames[i]);
                }
            }
        }

        private void ProcessAttribute(TagHelperOutput output, string attributeName)
        {
            var index = output
                .Attributes
                .ToList()
                .FindIndex(x =>
                    x.Name.Equals(attributeName, StringComparison.OrdinalIgnoreCase)
                    );
            var attribute = output.Attributes[index];
            var uriBuilder = new UriBuilder(GetCdnDomain());
            uriBuilder.Path = GetAssetPath(attribute);
            var resolvedUrl = uriBuilder.ToString();
            output.Attributes[index] = new TagHelperAttribute(
                attribute.Name,
                resolvedUrl,
                attribute.ValueStyle
                );
        }

        private string GetAssetPath(TagHelperAttribute attribute)
        {
            var assetPath = ParseHtmlString(attribute);
#if DEBUG
            return assetPath;
#endif
#if !DEBUG
            var assertName = assetPath.Split('/').Last();
            var inManifest = AppConfiguration.AssetsManifest.ContainsKey(assertName);
            if (inManifest)
            {
                assetPath = AppConfiguration.AssetsManifest[assertName];
            }
            return assetPath;
#endif
        }

        private string GetCdnDomain()
        {
            var cdnDomain = AppConfiguration
                .SubDomainSettings
                .FirstOrDefault(x =>
                    x.name.Equals("cdn", StringComparison.OrdinalIgnoreCase))
                .url;
            return cdnDomain;
        }

        private string ParseHtmlString(TagHelperAttribute attribute)
        {
            var htmlSTring = attribute.Value as string;
            if (htmlSTring == null)
            {
                var htmlContent = attribute.Value as IHtmlContent;
                if (htmlContent != null)
                {
                    var htmlString = htmlContent as HtmlString;
                    if (htmlString != null)
                    {
                        htmlSTring = htmlString.ToString();
                    }
                    else
                    {
                        using (var writer = new StringWriter())
                        {
                            htmlContent.WriteTo(writer, HtmlEncoder);
                            htmlSTring = writer.ToString();
                        };
                    }
                }
            }
            return htmlSTring;
        }
    }
}
