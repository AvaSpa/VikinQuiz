using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class GoogleController : Controller
    {

        private UserRepo repo;

        public GoogleController(VikinQuizContext ctx)
        {
            this.repo = new UserRepo(ctx);
        }
        [HttpPost]
        public IActionResult Signup([FromBody]GoogleViewModel content)
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
            if(foundUser == null)
            {
                return BadRequest("The user is already registered");
            }
            return Ok(content);
        }
    }
}
