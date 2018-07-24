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
    public class TokenGenerator
    {
        public static string BuildToken(User user, IConfiguration config)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //new Claim(ClaimTypes.NameIdentifier)
<<<<<<< HEAD
            var claims = new List<Claim> { new Claim("test1", "test2") };
=======
            var claims = new List<Claim> { new Claim("username", user.Username) };
>>>>>>> 4d9d7d69ec42ae7df5248d67d6c7a130ff1e1bc3
            var token = new JwtSecurityToken(config["Jwt:Issuer"], config["Jwt:Issuer"], expires: DateTime.Now.AddHours(2), signingCredentials: creds, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
