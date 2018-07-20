using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api")]
    public class EmailController : Controller
    {
        private readonly string fromAddress = "noreply.vikings@gmail.com";
        private readonly string password = "1234Vikings";
        private readonly UserRepo userRepo;

        public EmailController(UserRepo userRepo)
        {
            this.userRepo = userRepo;
        }

        [HttpGet]
        public string something()
        {
            return "hello";
        }

        [Route("email")]
        [HttpGet("{id:int}")]
        public void SendEmail(int id)
        {
            User user = userRepo.AssignToken(id);

            MailMessage mail = new MailMessage("andiabrudan@yahoo.com", user.Email);

            SmtpClient client = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress, password)
            };

            using (MailMessage message = new MailMessage(fromAddress, user.Email)
            {
                Subject = "Register your account",
                Body = "Click the following link to register your account\n\nhttp://localhost:60151/api/token?t=" + user.Token
            })
            {
                client.Send(message);
            }
        }

        [Route("token")]
        [HttpGet("{t}")]
        public string ValidateAddress(string t)
        {
            userRepo.Activate(t);
            return "validation worked";
        }

        //[Route("resend")]
        //[HttpGet("{}")]
        //public void ResetPassword() { }
    }
}
