using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using VikingQuiz.Api.Utilities;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        [HttpGet("{containerName}")]
        public IActionResult GetUrlOfContainer(string containerName)
        {
            string containerUrl = new AzureBlobService(containerName).GetFullUrlOfContainer();
            return Ok(containerUrl);
        }


    }
}
