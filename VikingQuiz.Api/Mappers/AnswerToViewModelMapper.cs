using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class AnswerToViewModelMapper : IEntityMapper<Answer, AnswerViewModel>
    {
        public AnswerViewModel Map(Answer entity)
        {
            var result = new AnswerViewModel
            {
                Id = entity.Id,
                Text = entity.Text
            };

            return result;
        }
    }
}
