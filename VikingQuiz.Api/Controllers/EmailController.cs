using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Net;
using System.Net.Mail;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class EmailController : Controller
    {
        private readonly string fromAddress = "noreply.vikings@gmail.com";
        private readonly string password = "1234Vikings";
        private readonly UserRepository userRepository;
        private readonly AuthenticationService authenticationService;

        public EmailController(UserRepository userRepository, AuthenticationService authenticationService)
        {
            this.userRepository = userRepository;
            this.authenticationService = authenticationService;
        }

        private void SendEmail(string receiverAddress, string subject, string body)
        {
            SmtpClient client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress, password)
            };

            using (MailMessage message = new MailMessage(this.fromAddress, receiverAddress) { Subject = subject, Body = body })
            {
                client.Send(message);
            }
        }

        [Route("email")]
        [HttpGet("{id:int}")]
        [AllowAnonymous]
        public IActionResult SendEmail(int id)
        {
            User user = userRepository.GetUserById(id);

            if (user == null)
            {
                return NotFound();
            }

            // we want the 'confirm email' token to be valid for 168 / 24 = 7 days
            // this token should only be usable to reset password.
            string token = authenticationService.GenerateTokenForUser(user, 168, "email");
            string Subject = "Register your account";
            string Body = "Click the following link to register your account\n\nhttp://localhost:3000/confirm/" + token;
            this.SendEmail(user.Email, Subject, Body);
            return Ok();
        }

        [Route("token")]
        [Authorize(Roles = "email")]
        public string ActivateAccount()
        {
            int userId = User.Claims.GetUserId();
            userRepository.Activate(userId);
            return "validation worked";
        }

        [HttpPost]
        [AllowAnonymous]
        public IActionResult SendPasswordResetEmail([FromBody] EmailViewModel email)
        {
            User user = userRepository.GetUserByEmail(email.Email);

            if (user == null)
            {
                return NotFound();
            }

            // we want the 'reset password' token to only last 5 hours
            string token = authenticationService.GenerateTokenForUser(user, 5, "ResetPassword");
            string Subject = "Reset your password";
            string Body = "Click the following link to reset your password\n\nhttp://localhost:3000/forgot/" + token +
                "\n\nIf you didn't request this password reset, ignore this message";

            this.SendEmail(user.Email, Subject, Body);
            return Ok();
        }

        [HttpPut]
        [Authorize(Roles = "ResetPassword")]
        public IActionResult ResetPassword([FromBody] PasswordViewModel password)
        {
            string newPassword = password.Password.SHA256Encrypt();

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrors().First());
            }

            int userId = User.Claims.GetUserId();
            User user = userRepository.GetUserById(userId);

            if (user == null)
            {
                return NotFound();
            }

            if (user.Pass == newPassword)
            {
                return BadRequest("your new password cannot be the same as the old one");
            }

            user.Pass = newPassword;
            userRepository.UpdateUser(user);
            return Ok();
        }
    }
}
