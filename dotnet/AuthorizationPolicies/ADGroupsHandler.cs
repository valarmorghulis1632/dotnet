using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Logging.Abstractions;

namespace dotnet.AuthorizationPolicies
{
    public class ADGroupsHandler<T> : AuthorizationHandler<T> where T : ADGroupsRequirement
    {
        public ILogger<T> Logger { get; set; }

        public ADGroupsHandler()
        {
            this.Logger = NullLogger<T>.Instance;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, T requirement)
        {
            foreach(var grp in requirement.Groups){
                try
                {
                    //OR CASE

                    if(context.User.IsInRole(grp))
                    {
                        context.Succeed(requirement);
                        break;
                    }

                    //AND CASE

                    // if(!context.User.IsInRole(grp)){
                    //     context.Fail();
                    //     throw new Exception();
                    // }
                    // else{
                    //     context.Succeed(requirement);
                    //     break;
                    // }
                }
                catch (Exception e)
                {
                    Logger.LogError(e, "Error in IsInRole Validation");
                }
            }

            return Task.CompletedTask;
        }
    }
}