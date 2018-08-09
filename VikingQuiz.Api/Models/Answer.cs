using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace VikingQuiz.Api.Models
{
    public partial class Answer
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Answers can not be empty")]
        [StringLength(100, MinimumLength = 1, ErrorMessage = "Answers should not be longer than 100 characters")]
        public string Text { get; set; }
        public int? QuestionId { get; set; }
        public DateTime? LastModified { get; set; }

        public Question Question { get; set; }
    }
}
