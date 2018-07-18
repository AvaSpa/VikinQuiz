using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Players
    {
        public Players()
        {
            PlayerGame = new HashSet<PlayerGame>();
        }

        public int Id { get; set; }
        public string PictureUrl { get; set; }
        public string Name { get; set; }

        public ICollection<PlayerGame> PlayerGame { get; set; }
    }
}
