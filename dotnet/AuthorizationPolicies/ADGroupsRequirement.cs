using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace dotnet.AuthorizationPolicies
{
    public class ADGroupsRequirement : IAuthorizationRequirement
    {
        public IEnumerable<string>  Groups { get; set; }

        public ADGroupsRequirement(IEnumerable<string> groups)
        {
            this.Groups = groups;            
        }
    }
}