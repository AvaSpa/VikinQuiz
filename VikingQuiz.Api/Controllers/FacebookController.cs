

using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace vikingquiz.api.controllers
{
    [Route("api/[controller]")]
    public class FacebookController : Controller
    {
        private readonly AuthenticationService authService;
        private readonly UserRepo repo;

        public FacebookController(VikinQuizContext ctx, IConfiguration configuration)
        {
            this.authService = new AuthenticationService(configuration);
            this.repo = new UserRepo(ctx);
        }
        [HttpPost]
        public IActionResult Login([FromBody]FacebookViewModel content)
        {
            var plaintextbytes = System.Text.Encoding.UTF8.GetBytes(content.Id);
            var base64id = System.Convert.ToBase64String(plaintextbytes);
            User user = new User
            {
                Username = base64id,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl,
                IsConfirmed = true
            };
            this.repo.CreateUser(user);
            string str = this.authService.Authenticate(user);
            return Ok(new { token = str });
        }
    }
}

