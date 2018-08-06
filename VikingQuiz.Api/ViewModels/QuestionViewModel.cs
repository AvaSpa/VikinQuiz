using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class QuestionViewModel
    {

        public int Id { get; set; }
        [Required(ErrorMessage = "Question's text can not be empty")]
        [StringLength(256, ErrorMessage = "Question's text should not be longer than 256 characters")]
        public string Text { get; set; }
        [Required(ErrorMessage = "Questions should have a correct answer")]
        public int CorrectAnswerId { get; set; }
        public List<AnswerViewModel> Answers { get; set; }
    }
}