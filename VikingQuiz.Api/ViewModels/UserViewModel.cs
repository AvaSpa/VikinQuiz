using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using VikingQuiz.Api.Attributes;

namespace VikingQuiz.Api.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Username cannot be empty")] //validare pentru campuri necompletate
        [StringLength(24, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 24 characters")]
        public string Username { get; set; }
        [Required(ErrorMessage = "Password cannot be empty")]
        [StringLength(24, MinimumLength = 3, ErrorMessage = "Password must contains between 3 and 24 characters")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Email cannot be empty")]
        [RegularExpression("^[a-z0-9]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$", ErrorMessage = "Invalid emaild address!")]
        [EmailValidation(ErrorMessage = "Email must contain @ and . !")]
        public string Email { get; set; }
        public string PictureUrl { get; set; }
    }
}
