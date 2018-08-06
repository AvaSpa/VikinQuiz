using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class PasswordViewModel
    {
        [Required(ErrorMessage = "Password cannot be empty")]
        [StringLength(24, MinimumLength = 3, ErrorMessage = "Password must contains between 3 and 24 characters")]
        public string Password { get; set; }
    }
}
