using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class SesionViewModel
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Token { get; set; }
    }
}
