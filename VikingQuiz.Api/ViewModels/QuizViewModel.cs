using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class QuizViewModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string PictureUrl { get; set; }
        public int? UserId { get; set; }
        public DateTime? LastModified { get; set; }
    }
}
