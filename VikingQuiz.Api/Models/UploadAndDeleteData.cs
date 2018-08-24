using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace VikingQuiz.Api.Models
{

        class UploadAndDeleteData
        {
            public IActionResult HttpResponseResult;
            public string fileName;
        }
    
}
