using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Quiz
    {
        public Quiz()
        {
            Game = new HashSet<Game>();
            QuizQuestion = new HashSet<QuizQuestion>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string PictureUrl { get; set; }
        public int? UserId { get; set; }

        public User User { get; set; }
        public ICollection<Game> Game { get; set; }
        public ICollection<QuizQuestion> QuizQuestion { get; set; }
    }
}
