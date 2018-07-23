using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class QuizToViewModelMapper : IEntityMapper<Quiz, QuizViewModel>
    {
        public QuizViewModel Map(Quiz quiz)
        {
            var result = new QuizViewModel
            {
                Title = quiz.Title,
                Id = quiz.Id,
                PictureUrl = quiz.PictureUrl,
                UserId = quiz.UserId
            };
            return result;
        }
    }
}
