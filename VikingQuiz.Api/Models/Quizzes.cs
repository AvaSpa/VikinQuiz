using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Quizzes
    {
        public Quizzes()
        {
            Games = new HashSet<Games>();
            QuizzQuestion = new HashSet<QuizzQuestion>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string PictureUrl { get; set; }
        public int? UserId { get; set; }

        public Users User { get; set; }
        public ICollection<Games> Games { get; set; }
        public ICollection<QuizzQuestion> QuizzQuestion { get; set; }
    }
}
