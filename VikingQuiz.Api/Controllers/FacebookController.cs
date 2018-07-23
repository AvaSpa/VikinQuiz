using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class FacebookController: Controller
    {
        private readonly IConfiguration _config;
        private readonly UserRepo repo;

        public FacebookController(VikinQuizContext ctx, IConfiguration configuration)
        {
            this._config = configuration;
            this.repo = new UserRepo(ctx);
        }
        [HttpPost]
        public IActionResult Login([FromBody]FacebookViewModel content)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(content.Id);
            var base64Id = System.Convert.ToBase64String(plainTextBytes);
            User user = new User
            {
                Username = base64Id,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl,
                IsConfirmed = true
            };
            this.repo.CreateUser(user);
            string str = TokenGenerator.BuildToken(user, _config);
            return Ok(new { token = str });
        }
    }
}
