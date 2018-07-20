using System;
using System.Collections.Generic;

namespace VikingQuiz.Api.Models
{
    public partial class User
    {
        public User()
        {
            Quiz = new HashSet<Quiz>();
            Sesion = new HashSet<Sesion>();
        }

        public int? Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Pass { get; set; }
        public string PictureUrl { get; set; }
        public string Token { get; set; }
        public bool? IsConfirmed { get; set; }

        public ICollection<Quiz> Quiz { get; set; }
        public ICollection<Sesion> Sesion { get; set; }



        public string GenerateToken()
        {
            return Id + "token";
        }
    }
}
