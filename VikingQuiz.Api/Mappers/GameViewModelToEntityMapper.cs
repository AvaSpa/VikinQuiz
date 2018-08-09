using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class GameViewModelToEntityMapper : IEntityMapper<GameViewModel, Game>
    {
        public Game Map(GameViewModel gameViewModel)
        {
            var result = new Game
            {
                Id = gameViewModel.Id,
                GameDate = Convert.ToDateTime(gameViewModel.GameDate),
                QuizId = gameViewModel.QuizId,
                Code = gameViewModel.Code
            };
            return result;
        }
    }

}
