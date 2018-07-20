using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly SessionRepo sessionRepo;
        private readonly UserRepo userRepo;
        private readonly IConfiguration _config;

        public SessionController(
            SessionRepo sessionRepo,
            UserRepo userRepo,
            IConfiguration configuration)
        {
            this.sessionRepo = sessionRepo;
            this._config = configuration;
            this.userRepo = userRepo;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginViewModel login)
        {

            var user = userRepo.Authenticate(login);
            if (user != null)
            {
                string str = BuildToken(user);
                return Ok(new { token = str });
            }
            else
                return Unauthorized();
        }

        private string BuildToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            //new Claim(ClaimTypes.NameIdentifier)
            var claims = new List<Claim> { new Claim("test1", "test2") };
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Issuer"], expires: DateTime.Now.AddHours(2), signingCredentials: creds, claims: claims);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
