using System;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

namespace dotnet
{
    public class ClaimsTransformer : IClaimsTransformation
    {
        public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
        {
            var wi = (WindowsIdentity)principal.Identity;  
            Console.WriteLine("HI");
            Console.WriteLine(wi.Name.ToString());
            // Console.WriteLine(wi.User.ToString());
            Console.WriteLine(WindowsIdentity.GetCurrent().Name.ToString());
        if (wi.Groups != null)  
        {  
            foreach (var group in wi.Groups) //-- Getting all the AD groups that user belongs to---  
            {  
                // Console.WriteLine(group.ToString());
                try  
                {  
                    var claim = new Claim(wi.RoleClaimType, group.Value);
                    // Console.WriteLine(claim.Value.ToString());
                    wi.AddClaim(claim);                          
                }  
                catch (Exception ex)  
                {  
                    throw ex;  
                }  
            }  
        }              
        return Task.FromResult(principal);  

        // var ci = (ClaimsIdentity)principal.Identity;
        // var c = new Claim(ci.RoleClaimType, "Admin");
        // ci.AddClaim(c);

        // return  Task.FromResult(principal);
        }
    }
}