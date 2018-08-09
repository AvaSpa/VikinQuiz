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
        private readonly PlayerGameRepo playergameRepo;
        private IEntityMapper<PlayerGame, PlayerGameViewModel> entityToVmMapper;
        private IEntityMapper<PlayerGameViewModel, PlayerGame> vmToEntityMapper;

        public PlayerGameController(PlayerGameRepo playergameRepo, IEntityMapper<PlayerGame, PlayerGameViewModel> entityToVmMapper, IEntityMapper<PlayerGameViewModel, PlayerGame> vmToEntityMapper)
        {
            this.playergameRepo = playergameRepo;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetPlayerGame()
        {
            var result = playergameRepo.GetAll().Select(s => entityToVmMapper.Map(s)).ToList();
            return Ok(result);
        }

        [HttpPost]
        public IActionResult CreatePlayerGame([FromBody]PlayerGameViewModel playergameViewModel)
        {
            PlayerGame playergame = new PlayerGame()
            {
                Pid = playergameViewModel.Pid, 
                Gid = playergameViewModel.Gid, 
                Score = playergameViewModel.Score
            };

            PlayerGame newPlayerGame = playergameRepo.Create(playergame);
            if (newPlayerGame == null)
            {
                return BadRequest("PlayerGame couldn't be created");
            }
            PlayerGameViewModel playergameVm = entityToVmMapper.Map(playergame);
            return Ok(playergameVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlayerGame(int pid, int gid, [FromBody]PlayerGameViewModel playergame)
        {
            PlayerGame pg = new PlayerGame()
            {
                Pid = pid, 
                Gid = gid,
                Score = playergame.Score
            };

            PlayerGame updatedPlayerGame = playergameRepo.Update(pg);
            if (updatedPlayerGame == null)
            {
                return BadRequest("PlayerGame couldn't be updated");
            }
            PlayerGameViewModel playergameVm = entityToVmMapper.Map(pg);
            return Ok(playergameVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlayerGame(int pid, int gid)
        {
            playergameRepo.Delete(pid, gid);
            return Ok();
        }
    }
}
