using System.Text;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Hosting;
using Affiliate.Token.Interfaces;
using Affiliate.Service.Interfaces;
using Affiliate.Token.Implements.JWT;
using Affiliate.Service.Implements;
using Affiliate.Token.Models.Config;
using Affiliate.General.Models.Config;
using Microsoft.AspNetCore.Http;
using Web.Portal.Routing;
using static Web.Portal.Routing.LanguageNotSupportConstraint;
using Web.Portal.Extensions;
using StackExchange.Redis;
using System.Collections.Generic;

namespace Web.Portal
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;          
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc();
            services.AddControllers();
            services.AddMemoryCache();
            services.AddDistributedMemoryCache();
            services.AddSession();
            services.AddControllersWithViews();

            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
          
            services.AddTransient<ITokenGenerator, TokenGenerator>();
            services.AddTransient<ITokenValidator, TokenValidator>();
            services.AddTransient<IMemberService, MemberService>();
            services.AddTransient<ISystemService, SystemService>();
            services.AddTransient<IInternalPartnerService, InternalPartnerService>();
            services.AddTransient<ISQLiteService, SQLiteService>();
            services.AddTransient<IGeoIpIMDBService, GeoIpIMDBService>();
            services.AddTransient<IGeoIpAllowService, GeoIpAllowService>();
            services.AddTransient<ICommonService, CommonService>();
            services.AddTransient<IRegionService, RegionService>();
            services.AddTransient<IIpCountryRedisCache, IpCountryRedisCache>();    

            services.Configure<EncryptorConfig>(Configuration);
            //services.Configure<AESConfig>(Configuration.GetSection("AESConfig"));
            services.Configure<ConnectionConfig>(Configuration.GetSection("ConnectionStrings"));
            services.Configure<InternalPartnerConfig>(Configuration.GetSection("InternalPartner"));
            services.Configure<GoogleAnalyticsConfig>(Configuration.GetSection("GoogleAnalytics"));          
            
            //services.AddSingletonConfig<ConnectionConfig>(Configuration.GetSection("ConnectionStrings"));
            //services.AddConfig<ConnectionConfig>(Configuration.GetSection("ConnectionStrings"), ServiceLifetime.Singleton);

            services.AddSingleton<IDatabase>(ConnectionMultiplexer.Connect(Configuration.GetValue<string>("ConnectionStrings:Ip2Location")).GetDatabase(0));


            services.AddStackExchangeRedisCache(options =>
            {
                options.InstanceName = "";
                options.Configuration = Configuration.GetValue<string>("ConnectionStrings:Ip2Location");
            });

            services
               .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(options =>
               {
                   options.IncludeErrorDetails = true; 

                   options.TokenValidationParameters = new TokenValidationParameters
                   {
                       NameClaimType = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier",
                       RoleClaimType = "http://schemas.microsoft.com/ws/2008/06/identity/claims/role",
                       ValidateIssuer = true,
                       ValidIssuer = Configuration.GetValue<string>("JWTConfig:Issuer"),
                       ValidateAudience = false,                   
                       ValidateLifetime = true,
                       ValidateIssuerSigningKey = false,
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration.GetValue<string>("JWTConfig:SignKey")))
                   };
               });


             
#if DEBUG
            services.AddRazorPages().AddRazorRuntimeCompilation();
#endif
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            loggerFactory.AddLog4Net("Configuration/log4net.config", true);
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }
            app.UseSession();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();         
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",                  
                    pattern: "{lang}/{*pathInfo}",
                    defaults: new
                    {
                        pathInfo = "pathInfo",
                        controller = "Home",
                        action = "index"
                    },
                    constraints: new
                    {
                        pathInfo = new ClientSideRoutingConstraint(),
                        lang = new LanguageConstraint()
                    }); ;
                    
                ;
            });
        }
    }
}
