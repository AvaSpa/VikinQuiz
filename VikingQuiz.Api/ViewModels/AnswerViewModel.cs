using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class AnswerViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Answers can not be empty")]
        [StringLength(100, ErrorMessage = "Answers should not be longer than 100 characters")]
        public string Text { get; set; }
    }
}
