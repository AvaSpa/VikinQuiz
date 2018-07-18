using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class PlayerGame
    {
        public int Pid { get; set; }
        public int Gid { get; set; }
        public int? Score { get; set; }

        public Game G { get; set; }
        public Player P { get; set; }
    }
}
