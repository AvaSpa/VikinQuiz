using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Sesion
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Token { get; set; }
        public int? ExpTime { get; set; }

        public User User { get; set; }
    }
}
