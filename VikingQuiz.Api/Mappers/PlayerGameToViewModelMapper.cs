using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class PlayerGameToViewModelMapper : IEntityMapper<PlayerGame, PlayerGameViewModel>
    {
        public PlayerGameViewModel Map(PlayerGame playergame)
        {
            var result = new PlayerGameViewModel
            {
                PlayerId = playergame.PlayerId,
                GameId = playergame.GameId,
                Score = playergame.Score
            };
            return result;
        }
    }
}
