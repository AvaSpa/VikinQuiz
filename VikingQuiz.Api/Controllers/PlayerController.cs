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
        private readonly PlayerRepository playerRepository;
        private readonly IEntityMapper<Player, PlayerViewModel> entityToVmMapper;
        private readonly IEntityMapper<PlayerViewModel, Player> vmToEntityMapper;

        public PlayerController(PlayerRepository playerRepository, IEntityMapper<Player, PlayerViewModel> entityToVmMapper, IEntityMapper<PlayerViewModel, Player> vmToEntityMapper)
        {
            this.playerRepository = playerRepository;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetPlayer()
        {
            var result = playerRepository.GetAll().Select(s => entityToVmMapper.Map(s)).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Player player = playerRepository.GetPlayerById(id);
            if(player == null)
            {
                return NotFound("Player doesn't exist");
            }
            PlayerViewModel playerVm = this.entityToVmMapper.Map(player);
            return Ok(playerVm);
        }

        [HttpPost]
        public IActionResult CreatePlayer([FromBody]PlayerCodeViewModel playercode)
        {
            Player createdPlayer = new Player()
            {
                PictureUrl = playercode.PictureUrl,
                Name = playercode.Name
            };

            if(createdPlayer.PictureUrl == "")
            {
                createdPlayer = playerRepository.AssignRandomPhoto(createdPlayer);
            }

            Player newPlayer = playerRepository.AddPlayer(createdPlayer, playercode.Code);
            if(newPlayer == null)
            {
                return BadRequest("Player couldn't be created");
            }
            PlayerViewModel playerVm = entityToVmMapper.Map(newPlayer);
            return Ok(playerVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlayer(int id, [FromBody]PlayerViewModel player)
        {
            Player p = new Player
            {
                Id = id,
                PictureUrl = player.PictureUrl,
                Name = player.Name
            };

            Player updatedPlayer = playerRepository.UpdatePlayer(p);
            if (updatedPlayer == null)
            {
                return BadRequest("Player couldn't be updated");
            }
            PlayerViewModel playerVm = entityToVmMapper.Map(updatedPlayer);
            return Ok(playerVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlayer(int id)
        {
            playerRepository.DeletePlayer(id);
            return Ok();
        }

    }
}
