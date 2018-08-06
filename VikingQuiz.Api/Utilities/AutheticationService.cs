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
        private readonly VikinQuizContext context;
        private readonly IConfiguration _config;

        public AuthenticationService(IConfiguration config, VikinQuizContext context)
        {
            this._config = config;
            this.context = context;
        }

        /// <param name="role">Possible values: Player / Email / ResetPassword / Admin </param>
        public string GenerateTokenForUser(User user, int hoursToExpiry = 2, string role = "player")
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim> {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Role, role)
            };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"], expires: DateTime.Now.AddHours(hoursToExpiry), signingCredentials: creds, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        internal User GetUserByCredentials(string email, string password)
        {
            return context.User.FirstOrDefault(u => (u.Email == email && u.Pass == password));
        }
    }
}
