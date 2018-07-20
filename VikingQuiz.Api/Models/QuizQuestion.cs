using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class QuizQuestion
    {
        public int QuizId { get; set; }
        public int QuestionId { get; set; }

        public Question Question { get; set; }
        public Quiz Quiz { get; set; }
    }
}
