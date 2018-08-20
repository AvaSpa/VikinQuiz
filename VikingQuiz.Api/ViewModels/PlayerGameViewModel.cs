using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class PlayerGameViewModel
    {
        public int PlayerId { get; set; }
        public int GameId { get; set; }
        public int Score { get; set; }
        public int AverageTime { get; set; }
    }
}
