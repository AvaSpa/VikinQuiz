using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class GoogleController : Controller
    {
        private readonly AuthenticationService authenticationService;
        private readonly UserRepo repo;

        public GoogleController(VikinQuizContext ctx, IConfiguration configuration, UserRepo userRepo)
        {
            this.authenticationService = new AuthenticationService(configuration, ctx);
            this.repo = userRepo;
        }

        [HttpPost]
        public IActionResult Login([FromBody]GoogleViewModel content)
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
            string str = this.authenticationService.Authenticate(user);
            return Ok(new { token = str });
        }
    }
}
