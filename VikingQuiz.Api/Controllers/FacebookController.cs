/* using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
<<<<<<< HEAD
=======
using VikingQuiz.Api.Utilities;
>>>>>>> 4d9d7d69ec42ae7df5248d67d6c7a130ff1e1bc3
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
<<<<<<< HEAD
                Id = null,
                Username = base64Id,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl
            };
            User foundUser = this.repo.CreateUser(user);
            if (foundUser == null)
            {
                return BadRequest("The user is already registered");
            }
            return Ok(content);
=======
                Username = base64Id,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl,
                IsConfirmed = true
            };
            this.repo.CreateUser(user);
            string str = TokenGenerator.BuildToken(user, _config);
            return Ok(new { token = str });
>>>>>>> 4d9d7d69ec42ae7df5248d67d6c7a130ff1e1bc3
        }
    }
}

*/