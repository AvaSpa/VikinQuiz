

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
        private readonly AuthenticationService authenticationService;
        private readonly UserRepository userRepository;

        public FacebookController(AuthenticationService service, UserRepository userRepo)
        {
            this.authenticationService = service;
            this.userRepository = userRepo;
        }
        [HttpPost]
        public IActionResult Login([FromBody]FacebookViewModel content)
        {
            User user = new User
            {
                Username = content.Name,
                Email = content.Email,
                Pass = null,
                PictureUrl = content.PictureUrl,
                IsConfirmed = true
            };
            if (this.userRepository.CreateUser(user) == null) {
                user = this.userRepository.UserGetUserByEmail(user.Email);
            }
            string userToken = this.authenticationService.GenerateTokenForUser(user);
            return Ok(new { token = userToken });
        }
    }
}

