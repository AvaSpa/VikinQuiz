using System;
using System.Collections.Generic;

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
        public string Text { get; set; }
        public int CorrectAnsId { get; set; }
        public DateTime? LastModified { get; set; }

        public ICollection<Answer> Answer { get; set; }
        public ICollection<QuizQuestion> QuizQuestion { get; set; }
    }
}
