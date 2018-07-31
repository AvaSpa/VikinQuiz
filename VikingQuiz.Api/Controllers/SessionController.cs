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
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class SessionController : Controller
    {
        private readonly UserRepo userRepo;
        private readonly AuthenticationService authService;
        private readonly PasswordEncryptor encryptor;

        public SessionController(UserRepo userRepo, AuthenticationService authenticationService, PasswordEncryptor encryptor)
        {
            this.userRepo = userRepo;
            this.authService = authenticationService;
            this.encryptor = encryptor;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginViewModel login)
        {
            User user = userRepo.Authenticate(login.Email, encryptor.Encrypt(login.Password));
            if (user != null)
            {
                string str = authService.Authenticate(user);
                return Ok(new { token = str });
            }
            else
                return NotFound("No such user exists");
        }
    }
}
