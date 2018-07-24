using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Validators
{
  
    public class UserValidation
    {

        [Required(ErrorMessage = "Username cannot be empty")] //validare pentru campuri necompletate
        [StringLength(24, MinimumLength = 3, ErrorMessage = "Username must be between 3 and 24 characters")] //validare lungime username
        public string Username { get; set; }

        [Required(ErrorMessage = "Email cannot be empty")]
        [RegularExpression("^[a-z0-9]+(\\.[a-z0-9_\\+-]+)*@[a-z0-9-]+(\\.[a-z0-9]+)*\\.([a-z]{2,4})$", ErrorMessage = "Invalid emaild address!")]
        [ValidEmail(ErrorMessage = "Email must contain @ and . !")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password cannot be empty")]
        [StringLength(24, MinimumLength = 3, ErrorMessage = "Password must contains between 3 and 24 characters")]
        public string Pass { get; set; }

        public int? Id { get; set; }

        public string PictureUrl { get; set; }

        public string Token { get; set; }

        public bool? IsConfirmed { get; set; }


    }

    public sealed class ValidEmail : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value.ToString().Contains("@") && value.ToString().Contains("."))
                return true;
            else
                return false;
        }
    }
}


    
