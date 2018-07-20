using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.ViewModels;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class PlayerController : Controller
    {
        private readonly PlayerRepo playerRepo;
        private IEntityMapper<Player, PlayerViewModel> mapper;

        public PlayerController(VikinQuizContext context)
        {
            playerRepo = new PlayerRepo(context);
            mapper = new PlayerToViewMapper();
        }

        [HttpGet]
        public List<PlayerViewModel> GetPlayer()
        {
            return playerRepo.GetAllPlayers().Select(p => mapper.Map(p)).ToList();
        }

        [HttpPost]
        public PlayerViewModel CreatePlayer([FromBody]PlayerViewModel player)
        {
            Player p = new Player()
            {
                PictureUrl = player.PictureUrl,
                Name = player.Name
            };

           playerRepo.AddPlayer(p);
            return mapper.Map(p);
        }

        [HttpPut("{id}")]
        public PlayerViewModel UpdatePlayer(int id, [FromBody]PlayerViewModel player)
        {
            Player p = new Player()
            {
                Id = id,
                PictureUrl = player.PictureUrl,
                Name = player.Name
            };

            playerRepo.UpdatePlayer(p);
            return mapper.Map(p);
        }

        [HttpDelete("{id}")]
        public void DeletePlayer(int id)
        {
            playerRepo.DeletePlayer(id);
        }

    }
}
