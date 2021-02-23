using System.Collections.Generic;

namespace dotnet.AuthorizationPolicies.MyFeature
{
    public class Requirement : ADGroupsRequirement
    {
        public Requirement(IEnumerable<string> groups) : base(groups)
        {
        }
    }
}