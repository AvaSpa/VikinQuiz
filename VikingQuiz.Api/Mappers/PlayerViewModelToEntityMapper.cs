using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class PlayerViewModelToEntityMapper :IEntityMapper<PlayerViewModel, Player>
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
