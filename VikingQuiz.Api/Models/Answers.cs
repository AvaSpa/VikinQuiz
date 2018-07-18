using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Answers
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public int? QuestionId { get; set; }

        public Questions Question { get; set; }
    }
}
