using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Blob;
using Microsoft.WindowsAzure.Storage.Shared.Protocol;
using VikingQuiz.Api.Utilities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

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




        [HttpPost]
        [RequestSizeLimit(5_000_000)]
        public async Task<IActionResult> Post(List<IFormFile> files)
        {
            if (files.Count == 0)
            {
                return BadRequest("An image file needs to be provided");
            }
            else if (files.Count > 1)
            {
                return BadRequest("Only one file can be uploaded.");
            }

            long size = files.Sum(f => f.Length);
            if (size <= 0)
            {
                return BadRequest("File must not be empty.");
            }

            var blobService = new AzureBlobService();
            await blobService.InitializeBlob();

            var contentType = files[0].ContentType;

            if ( !(contentType == "image/gif" || contentType == "image/png" || contentType == "image/jpeg") )
            {
                return BadRequest("Only images of the following formats are allowed: .png, .jpeg or .gif");
            }



            // full path to file in temp location

                var filePath = Path.GetTempFileName();


            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await files[0].CopyToAsync(stream);
            }
            

            // process uploaded files
            // Don't rely on or trust the FileName property without validation.
            await blobService.UploadPhoto(filePath, contentType);
            return Ok(new { count = files.Count, size, filePath });
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
