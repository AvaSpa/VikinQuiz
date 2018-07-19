using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;

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
