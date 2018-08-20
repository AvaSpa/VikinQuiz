using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class PlayerGameController : Controller
    {
        private readonly PlayerGameRepository playergameRepository;
        private IEntityMapper<PlayerGame, PlayerGameViewModel> entityToVmMapper;
        private IEntityMapper<PlayerGameViewModel, PlayerGame> vmToEntityMapper;

        public PlayerGameController(PlayerGameRepository playergameRepository, IEntityMapper<PlayerGame, PlayerGameViewModel> entityToVmMapper, IEntityMapper<PlayerGameViewModel, PlayerGame> vmToEntityMapper)
        {
            this.playergameRepository = playergameRepository;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetPlayerGame()
        {
            var result = playergameRepository.GetAll().Select(player => entityToVmMapper.Map(player)).ToList();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreatePlayerGame([FromBody]PlayerGameViewModel playerGameViewModel)
        {
            PlayerGame playerGame = new PlayerGame()
            {
                PlayerId = playerGameViewModel.PlayerId, 
                GameId = playerGameViewModel.GameId, 
                Score = Convert.ToInt32(playerGameViewModel.Score),
                AverageTime = Convert.ToInt32(playerGameViewModel.AverageTime)
            };

            PlayerGame newPlayerGame = playergameRepository.Create(playerGame);
            if (newPlayerGame == null)
            {
                return BadRequest("PlayerGame couldn't be created");
            }
            PlayerGameViewModel playergameVm = entityToVmMapper.Map(playerGame);
            return Ok(playergameVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlayerGame(int playerId, int gameId, [FromBody]PlayerGameViewModel playerGame)
        {
            PlayerGame newPlayerGame = new PlayerGame()
            {
                PlayerId = playerId, 
                GameId = gameId,
                Score = playerGame.Score,
                AverageTime = playerGame.AverageTime
            };

            PlayerGame updatedPlayerGame = playergameRepository.Update(newPlayerGame);
            if (updatedPlayerGame == null)
            {
                return BadRequest("PlayerGame couldn't be updated");
            }
            PlayerGameViewModel playergameVm = entityToVmMapper.Map(newPlayerGame);
            return Ok(playergameVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlayerGame(int playerId, int gameId)
        {
            playergameRepository.Delete(playerId, gameId);
            return Ok();
        }

        [HttpGet("{gameId}")]
        public IActionResult ShowRankings(int gameId)
        {
            var result = playergameRepository.GetRankingByGameId(gameId);
            return Ok(result);
        }
    }
}
