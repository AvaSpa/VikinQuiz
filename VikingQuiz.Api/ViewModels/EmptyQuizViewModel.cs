using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class NewQuizViewModel
    {
        public string Title { get; set; }
        public List<IFormFile> Files { get; set; }
        public int? UserId { get; set; }
        public int? QuizId { get; set; }
    }
}