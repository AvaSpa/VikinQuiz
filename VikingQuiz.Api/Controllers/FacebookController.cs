using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class FacebookController: Controller
    {
        [HttpPost]
        public IActionResult GetData([FromBody]FacebookViewModel content)
        {
            Console.WriteLine(content);
            return Ok(content);
        }
    }
}
