using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class PlayerToViewModelMapper : IEntityMapper<Player, PlayerViewModel>
    {
        public PlayerViewModel Map(Player player)
        {
            var result = new PlayerViewModel
            {
                PictureUrl = player.PictureUrl,
                Name = player.Name
            };
            return result;
        }
    }
}
