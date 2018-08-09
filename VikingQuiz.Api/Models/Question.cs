using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VikingQuiz.Api.Models
{
    public partial class Question
    {
        public Question()
        {
            Answer = new HashSet<Answer>();
            QuizQuestion = new HashSet<QuizQuestion>();
        }

        public int Id { get; set; }
        [Required(ErrorMessage = "Question's text can not be empty")]
        [StringLength(256, MinimumLength = 1, ErrorMessage = "Question's text should not be longer than 256 characters")]
        public string Text { get; set; }
        [Required(ErrorMessage = "Questions should have a correct answer")]
        public int CorrectAnsId { get; set; }
        public DateTime? LastModified { get; set; }

        public ICollection<Answer> Answer { get; set; }
        public ICollection<QuizQuestion> QuizQuestion { get; set; }
    }
}
