﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly GameRepo gameRepo;
        private IEntityMapper<Game, GameViewModel> entityToVmMapper;
        private IEntityMapper<GameViewModel, Game> vmToEntityMapper;

        public GameController(GameRepo gameRepo, IEntityMapper<Game, GameViewModel> entityToVmMapper, IEntityMapper<GameViewModel, Game> vmToEntityMapper)
        {
            this.gameRepo = gameRepo;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetGame()
        {
            var result = gameRepo.GetAll().Select(s => entityToVmMapper.Map(s)).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnswerById(int id)
        {
            Game foundGame = gameRepo.GetGameById(id);
            if (foundGame == null)
            {
                return NotFound("Game doesn't exist");
            }
            GameViewModel gameVm = entityToVmMapper.Map(foundGame);
            return Ok(gameVm);
        }

        [HttpPost]
        public IActionResult CreateGame([FromBody]GameViewModel game)
        {
            Game g = new Game()
            {
                QuizId = game.QuizId,
                GameDate = Convert.ToDateTime(game.GameDate)
            };

            Game newGame = gameRepo.Create(g);
            if (newGame == null)
            {
                return BadRequest("Game couldn't be created");
            }
            GameViewModel gameVm = entityToVmMapper.Map(g);
            return Ok(gameVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGame(int id, [FromBody]GameViewModel game)
        {
            Game gm = new Game()
            {
                Id = id,
                QuizId = game.QuizId,
                GameDate = Convert.ToDateTime(game.GameDate)
            };

            Game updatedGame = gameRepo.Update(gm);
            if (updatedGame == null)
            {
                return BadRequest("Game couldn't be updated");
            }
            GameViewModel gameVm = entityToVmMapper.Map(gm);
            return Ok(gameVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteGame(int id)
        {
            gameRepo.Delete(id);
            return Ok();
        }

    }
}

