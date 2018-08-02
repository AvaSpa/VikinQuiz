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

        public GoogleController(VikinQuizContext ctx, AuthenticationService service, UserRepo userRepo)
        {
            this.authenticationService = service;
            this.repo = userRepo;
        }

        [HttpPost]
        public IActionResult Login([FromBody]GoogleViewModel content)
        {
            string base64Id = content.Id.Base64Encoder();
            User user = new User
            {
                Username = base64Id,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl,
                IsConfirmed = true
            };
            this.repo.CreateUser(user);
            string userToken = this.authenticationService.GenerateTokenForUser(user);
            return Ok(new { token = userToken });
        }
    }
}
