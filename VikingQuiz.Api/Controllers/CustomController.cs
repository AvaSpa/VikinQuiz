using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;


namespace VikingQuiz.Api.Controllers
{

    [Route("api/[controller]")]

    public class CustomController : Controller
    {
        public void AssignPicture(User user)
        {
            Random random = new Random();
            int number = random.Next(1, 6);
            user.PictureUrl = "./VikinQuiz/VikingQuiz.Api/UserPictures/"+ number +".png";
        }
       
    }

}
