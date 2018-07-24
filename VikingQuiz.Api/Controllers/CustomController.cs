using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;


namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class CustomController : Controller
    {
        public void AssignPicture(User user)
        {
            Random random = new Random();
            int number = random.Next(1, 6);

            switch (number)
            {
                case 1:
                    {
                        user.PictureUrl = "C:/Users/louisa.vasies/Documents/VikinQuiz/VikingQuiz.Api/UserPictures/1.png";
                        break;
                    }
                case 2:
                    {
                        user.PictureUrl = "C:/Users/louisa.vasies/Documents/VikinQuiz/VikingQuiz.Api/UserPictures/2.png";
                        break;
                    }
                case 3:
                    {
                        user.PictureUrl = "C:/Users/louisa.vasies/Documents/VikinQuiz/VikingQuiz.Api/UserPictures/3.png";
                        break;
                    }
                case 4:
                    {
                        user.PictureUrl = "C:/Users/louisa.vasies/Documents/VikinQuiz/VikingQuiz.Api/UserPictures/4.png";
                        break;
                    }
                case 5:
                    {
                        user.PictureUrl = "C:/Users/louisa.vasies/Documents/VikinQuiz/VikingQuiz.Api/UserPictures/5.png";
                        break;
                    }
            }
        }
    }
}
