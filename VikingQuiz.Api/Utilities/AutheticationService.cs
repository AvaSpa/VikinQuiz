using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Utilities
{
    public class AuthenticationService
    {
        private readonly IConfiguration _config;

        public AuthenticationService(IConfiguration config)
        {
            this._config = config;
        }
        public string Authenticate(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, user.Username), new Claim(ClaimTypes.Email, user.Email), new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()) };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"], expires: DateTime.Now.AddHours(2), signingCredentials: creds, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
