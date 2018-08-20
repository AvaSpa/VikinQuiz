using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class QuestionViewModelToEntityMapper : IEntityMapper<QuestionViewModel, Question>
    {
        public Question Map(QuestionViewModel questionViewModel)
        {
            var result = new Question
            {
                Id = questionViewModel.Id,
                Text = questionViewModel.Text,
                CorrectAnsId = questionViewModel.CorrectAnswerId
            };
            return result;
        }
    }
}
