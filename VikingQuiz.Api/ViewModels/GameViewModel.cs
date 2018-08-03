using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class GameViewModel
    {
        public int Id { get; set; }
        public string GameDate { get; set; }
        public int? QuizId { get; set; }
        public string Code { get; set; }
    }
}
