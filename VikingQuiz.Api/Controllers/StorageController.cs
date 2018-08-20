using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Utilities;
using Microsoft.WindowsAzure.Storage;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class StorageController : Controller
    {
        [HttpGet("{containerName}")]
        public IActionResult GetUrlOfContainer(string containerName)
        {
            return Ok( AzureBlobService.GetFullUrlOfContainer(containerName) );
        }


    }
}

