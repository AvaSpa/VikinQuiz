using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
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
        private readonly UserRepo userRepo;

        public EmailController(VikinQuizContext context)
        {
            userRepo = new UserRepo(context);
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
            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.UseDefaultCredentials = false;
            client.Credentials = new System.Net.NetworkCredential("andiabrudan@yahoo.com", "bvobrjpgrzkymetf");
            client.Host = "smtp.mail.yahoo.com";
            client.EnableSsl = true;
            mail.Subject = "Register your account";
            mail.Body = "Click the following link to register your account\n\n";
            mail.Body += "http://localhost:60151/api/token?t=" + user.Token;

            client.Send(mail);
        }

        [Route("token")]
        [HttpGet("{t}")]
        public string ValidateAddress(string t)
        {
            userRepo.Activate(t);
            return "validation worked";
        }
    }
}
