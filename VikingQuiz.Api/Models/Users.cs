using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class Users
    {
        public Users()
        {
            Quizzes = new HashSet<Quizzes>();
            Sesions = new HashSet<Sesions>();
        }

        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public string PictureUrl { get; set; }

        public ICollection<Quizzes> Quizzes { get; set; }
        public ICollection<Sesions> Sesions { get; set; }
    }
}
