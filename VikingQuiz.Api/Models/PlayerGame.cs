using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class PlayerGame
    {
        public int PlayerId { get; set; }
        public int GameId { get; set; }
        public int? Score { get; set; }
        public int? AverageTime { get; set; }

        public Game Game { get; set; }
        public Player Player { get; set; }
    }
}
