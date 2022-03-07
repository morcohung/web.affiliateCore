using System.IO;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Web.Portal.Constants;

namespace Web.Portal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            BuildWebHost(args).Run();
        }

        public static IWebHost BuildWebHost(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                   .ConfigureAppConfiguration((hostContext, config) =>
                   {
                       var env = hostContext.HostingEnvironment;
                       AppConfiguration.Initialize(Path.Combine(env.ContentRootPath, "Configuration\\"));
                       config.SetBasePath(Path.Combine(env.ContentRootPath, "Configuration"))
                          .AddJsonFile(path: "settings.json", optional: false, reloadOnChange: true);
                       //config.SetBasePath(Path.Combine(env.ContentRootPath, "Configuration"))
                       //   .AddJsonFile(path: "dialcode.json", optional: false, reloadOnChange: true);
                   })
                .UseStartup<Startup>()
                .Build();
        }
    }
}
