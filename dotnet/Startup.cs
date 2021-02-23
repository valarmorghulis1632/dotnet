using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Commander.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Serialization;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Authentication.Negotiate;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.AspNetCore.Authentication;
using dotnet;
using dotnet.AuthorizationPolicies;
using dotnet.AuthorizationPolicies.MyFeature;
using Microsoft.AspNetCore.Authorization;

namespace Commander
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
            services.AddDbContext<CommanderContext>(opt => opt.UseSqlServer
                (Configuration.GetConnectionString("CommanderConnection")));

            services.AddControllers().AddNewtonsoftJson(s => {
                s.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
           

            services.AddCors(options => options.AddDefaultPolicy(
                builder => builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost").AllowAnyHeader().AllowAnyMethod().AllowCredentials()
            ));    //right
            
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ICommanderRepo, SqlCommanderRepo>();

            // services.AddSwaggerGen(c=> {
            //     c.SwaggerDoc("v1", new OpenApiInfo { Title = "Commander API", Version = "v1" });
            // });

            services.AddAuthentication(NegotiateDefaults.AuthenticationScheme).AddNegotiate();

            // services.AddAuthentication(IISDefaults.AuthenticationScheme); 

            // services.AddAuthorization();  //right

            // services.AddSingleton<IClaimsTransformation, ClaimsTransformer>();  // right with ClaimsTransformer.cs 

            //Get Configuration
            var adGroupsConfig = new ADGroupsConfiguration();
            Configuration.GetSection("ADGroupsConfiguration").Bind(adGroupsConfig);

            //MyFeature
            IEnumerable<string> myFeatureRoles = adGroupsConfig.MyFeature;
            services.AddAuthorization(options => {
                options.AddPolicy(AuthorizationPolicyNames.MyFeature, policy => {
                    policy.Requirements.Add(new Requirement(myFeatureRoles));
                });
            });

            services.AddSingleton<IAuthorizationHandler, Handler>();

            // services.AddAuthorization(options => {
            //     options.AddPolicy("PolicyName", policy => {
            //         policy.RequireClaim("LOCAL");
            //     });
            // });

        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            // app.UseSwagger();

            // app.UseSwaggerUI( c=> {
            //     c.SwaggerEndpoint("/swagger/v1/swagger.json", "Commander API V1");
            // });

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
