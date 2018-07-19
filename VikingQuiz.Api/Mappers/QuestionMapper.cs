using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class QuestionToViewMapper : IEntityMapper<Question, QuestionViewModel>
    {
        publicQuestionViewModel Map(Question question)
        {
            var result = new QuestionViewModel
            {
                Text = question.Text,
                CorrectAnsId = question.CorrectAnsId
            };
            return result;
        }
    }

    public class QuestionViewModelToQuestionMapper : IEntityMapper<QuestionViewModel, Question>
    {
        public Question Map(QuestionViewModel questionViewModel)
        {
            var result = new Question
            {
                Text = questionViewModel.Text,
                CorrectAnsId = questionViewModel.CorrectAnsId
            };
            return result;
        }
    }
}