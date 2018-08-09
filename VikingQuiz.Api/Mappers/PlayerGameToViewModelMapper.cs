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
                Pid = playergame.Pid,
                Gid = playergame.Gid,
                Score = playergame.Score
            };
            return result;
        }
    }
}
