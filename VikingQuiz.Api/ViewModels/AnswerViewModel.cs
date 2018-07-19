using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class AnswerViewModel
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? QuestionId { get; set; }
    }
}
