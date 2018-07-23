using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class FacebookController: Controller
    {
        private UserRepo repo;

        public FacebookController(VikinQuizContext ctx)
        {
            this.repo = new UserRepo(ctx);
        }
        [HttpPost]
        public IActionResult Signup([FromBody]FacebookViewModel content)
        {
            var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(content.Id);
            var base64Id = System.Convert.ToBase64String(plainTextBytes);
            User user = new User
            {
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
        }
    }
}
