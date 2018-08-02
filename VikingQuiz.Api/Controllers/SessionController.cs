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
        private readonly AuthenticationService authenticationService;

        public SessionController(UserRepo userRepo, AuthenticationService authenticationService)
        {
            this.userRepo = userRepo;
            this.authenticationService = authenticationService;
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult CreateToken([FromBody]LoginViewModel login)
        {
            User user = authenticationService.Authenticate(login.Email, login.Password.SHA256Encrypt());
            if (user != null)
            {
                string authenticationToken = authenticationService.Authenticate(user);
                return Ok(new { token = authenticationToken });
            }
            else
                return NotFound("No such user exists");
        }
    }
}
