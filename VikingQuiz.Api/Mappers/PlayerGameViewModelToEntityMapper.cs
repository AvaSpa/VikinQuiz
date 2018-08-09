using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class PlayerGameViewModelToEntityMapper : IEntityMapper<PlayerGameViewModel, PlayerGame>
    {
        public PlayerGame Map(PlayerGameViewModel playergameViewModel)
        {
            var result = new PlayerGame
            {
                Pid = playergameViewModel.Pid,
                Gid = playergameViewModel.Gid,
                Score = playergameViewModel.Score
            };
            return result;
        }
    }
}
