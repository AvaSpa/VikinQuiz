using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class QuizQuestion
    {
        public int QuizzId { get; set; }
        public int QuestionId { get; set; }

        public Question Question { get; set; }
        public Quiz Quizz { get; set; }
    }
}
