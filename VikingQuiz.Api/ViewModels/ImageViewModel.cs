using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class ImageViewModel
    {
        public List<IFormFile> Files { get; set; }
    }
}
