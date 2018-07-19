using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class GameToViewMapper : IEntityMapper<Game, GameViewModel>
    {
        public GameViewModel Map(Game game)
        {
            var result = new GameViewModel
            {
                Id = game.Id,
                GameDate = Convert.ToString(game.GameDate),
                QuizId = game.QuizId
            };
            return result;
        }
    }

    public class GameViewModelToPlayerMapper : IEntityMapper<GameViewModel, Game>
    {
        public Game Map(GameViewModel gameViewModel)
        {
            var result = new Game
            {
                Id = gameViewModel.Id,
                GameDate =  Convert.ToDateTime(gameViewModel.GameDate),
                QuizId = gameViewModel.QuizId
            };
            return result;
        }
    }
}
