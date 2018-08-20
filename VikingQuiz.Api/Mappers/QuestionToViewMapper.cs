using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class QuestionToViewMapper : IEntityMapper<Question, QuestionViewModel>
    {
        public QuestionViewModel Map(Question question)
        {
            var result = new QuestionViewModel
            {
                Id = question.Id,
                Text = question.Text,
                CorrectAnswerId = question.CorrectAnsId,
                Answers = new List<AnswerViewModel>()
            };
            return result;
        }
    }
}
