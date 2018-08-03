using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Game
    {
        public Game()
        {
            PlayerGame = new HashSet<PlayerGame>();
        }

        public int Id { get; set; }
        public int? QuizId { get; set; }
        public DateTime GameDate { get; set; }
        public string Code { get; set; }

        public Quiz Quiz { get; set; }
        public ICollection<PlayerGame> PlayerGame { get; set; }
    }
}
