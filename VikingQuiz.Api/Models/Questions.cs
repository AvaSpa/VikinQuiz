using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Questions
    {
        public Questions()
        {
            Answers = new HashSet<Answers>();
            QuizzQuestion = new HashSet<QuizzQuestion>();
        }

        public int Id { get; set; }
        public string Text { get; set; }
        public int CorrectAnsId { get; set; }

        public ICollection<Answers> Answers { get; set; }
        public ICollection<QuizzQuestion> QuizzQuestion { get; set; }
    }
}
