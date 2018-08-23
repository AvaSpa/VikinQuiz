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

        [HttpGet("playersnumber/{id}")]
        public IActionResult GetGameTotalNumberOfPlayersByGameId(int id)
        {
            var playerGame = playergameRepository.GetPlayerGameByGameId(id);
            if(playerGame == null)
            {
                int noRecordsFound = 0;
                return Ok(noRecordsFound);
            }

            var playersNumberForAGame = playerGame.Count();
            return Ok(playersNumberForAGame);
        }

        [HttpPost]
        public IActionResult CreatePlayerGame([FromBody]PlayerGameViewModel playergameViewModel)
        {
            PlayerGame playergame = new PlayerGame()
            {
                PlayerId = playergameViewModel.PlayerId, 
                GameId = playergameViewModel.GameId, 
                Score = playergameViewModel.Score
            };

            PlayerGame newPlayerGame = playergameRepository.Create(playergame);
            if (newPlayerGame == null)
            {
                return BadRequest("PlayerGame couldn't be created");
            }
            PlayerGameViewModel playergameVm = entityToVmMapper.Map(playergame);
            return Ok(playergameVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlayerGame(int playerid, int gameid, [FromBody]PlayerGameViewModel playergame)
        {
            PlayerGame newPlayerGame = new PlayerGame()
            {
                PlayerId = playerid, 
                GameId = gameid,
                Score = playergame.Score
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
        public IActionResult DeletePlayerGame(int playerid, int gameid)
        {
            playergameRepository.Delete(playerid, gameid);
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
