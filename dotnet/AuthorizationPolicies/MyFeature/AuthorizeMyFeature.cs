using Microsoft.AspNetCore.Authorization;

namespace dotnet.AuthorizationPolicies.MyFeature
{
    public class AuthorizeMyFeature : AuthorizeAttribute
    {
        public AuthorizeMyFeature() : base(AuthorizationPolicyNames.MyFeature)
        {
            
        }
    }
}