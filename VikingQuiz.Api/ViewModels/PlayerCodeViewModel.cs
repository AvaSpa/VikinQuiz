using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.ViewModels
{
    public class PlayerCodeViewModel
    {
        public int Id { get; set; }

        public string PictureUrl { get; set; }

        public string Name { get; set; }

        public string Code { get; set; }
    }
}