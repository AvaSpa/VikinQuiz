using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class QuizViewModelToEntityMapper : IEntityMapper<QuizViewModel, Quiz>
    {
        public Quiz Map(QuizViewModel quizViewModel)
        {
            var result = new Quiz
            {
                Title = quizViewModel.Title,
                Id = quizViewModel.Id,
                PictureUrl = quizViewModel.PictureUrl,
                UserId = quizViewModel.UserId
            };
            return result;
        }
    }
}
