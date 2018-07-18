using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Games
    {
        public Games()
        {
            PlayerGame = new HashSet<PlayerGame>();
        }

        public int Id { get; set; }
        public int? QuizId { get; set; }
        public DateTime GameDate { get; set; }

        public Quizzes Quiz { get; set; }
        public ICollection<PlayerGame> PlayerGame { get; set; }
    }
}
