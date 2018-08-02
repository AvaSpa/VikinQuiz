using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Repositories;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=
namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class ValuesController : Controller
    {

        // GET: api/<controller>
        [HttpGet]
        public string Get()
        {
               
            return "ok";
        }


        // GET: api/<controller>
        [HttpPost]
        public string Post()
        {
            return "ok";
        }




        // GET api/<controller>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
