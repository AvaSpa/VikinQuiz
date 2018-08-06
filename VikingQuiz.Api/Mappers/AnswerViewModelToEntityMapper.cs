using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class AnswerViewModelToEntityMapper : IEntityMapper<AnswerViewModel, Answer>
    {
        public Answer Map(AnswerViewModel entity)
        {
            var result = new Answer
            {
                Id = entity.Id,
                Text = entity.Text
            };

            return result;
        }
    }
}
