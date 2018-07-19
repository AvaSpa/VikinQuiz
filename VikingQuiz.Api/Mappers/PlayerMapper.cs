using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Mappers
{
    public class PlayerToViewMapper : IEntityMapper<Player, PlayerViewModel>
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

    public class PlayerViewModelToPlayerMapper : IEntityMapper<PlayerViewModel, Player>
    {
        public Player Map(PlayerViewModel playerViewModel)
        {
            var result = new Player
            {
                PictureUrl = playerViewModel.PictureUrl,
                Name = playerViewModel.Name
            };
            return result;
        }
    }
}