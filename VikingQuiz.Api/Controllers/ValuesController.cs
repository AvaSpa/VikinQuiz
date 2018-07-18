using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VikingQuiz.Api.Models;


namespace VikingQuiz.Api.Controllers
// hello world
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {
        private readonly VikinQuizContext _context;

        public ValuesController(VikinQuizContext context)
        {
            _context = context;
        }
        // comentariu
        // GET api/values
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value3" };
        //}

        [HttpGet]
        public User GetUser()
        {
            var user = _context.User.FirstOrDefault(u => u.Username == "andi");
            return user;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }


        //Test Louisa
    }
}
