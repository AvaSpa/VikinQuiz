using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class GameToViewModelMapper : IEntityMapper<Game, GameViewModel>
    {
        public GameViewModel Map(Game game)
        {
            var result = new GameViewModel
            {
                Id = game.Id,
                GameDate = Convert.ToString(game.GameDate),
                QuizId = game.QuizId,
                Code = game.Code
            };
            return result;
        }
    }
}
