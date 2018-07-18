using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class QuizzQuestion
    {
        public int QuizzId { get; set; }
        public int QuestionId { get; set; }

        public Questions Question { get; set; }
        public Quizzes Quizz { get; set; }
    }
}
