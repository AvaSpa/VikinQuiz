using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;
using Microsoft.AspNetCore.Authorization;
using VikingQuiz.Api.Utilities;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly GameRepository gameRepository;
        private readonly QuizRepository quizRepository;
        private IEntityMapper<Game, GameViewModel> entityToVmMapper;
        private IEntityMapper<GameViewModel, Game> vmToEntityMapper;

        public GameController(GameRepository gameRepository, QuizRepository quizRepository, IEntityMapper<Game, GameViewModel> entityToVmMapper, IEntityMapper<GameViewModel, Game> vmToEntityMapper)
        {
            this.gameRepository = gameRepository;
            this.quizRepository = quizRepository;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetGame()
        {
            var result = gameRepository.GetAll().Select(s => entityToVmMapper.Map(s)).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetGameById(int id)
        {
            Game foundGame = gameRepository.GetGameById(id);
            if (foundGame == null)
            {
                return NotFound("Game doesn't exist");
            }
            GameViewModel gameVm = entityToVmMapper.Map(foundGame);
            return Ok(gameVm);
        }

        [Route("usergames")]
        [HttpGet]
        [Authorize]
        public IActionResult GetGamesByUserId()
        {
            int currentUserId = User.Claims.GetUserId();

            var foundQuizzes = quizRepository.GetQuizByUserId(currentUserId);
            if (foundQuizzes == null)
            {
                return NotFound("No quizzes exist for this user");
            }

            List<int> foundQuizzesId = foundQuizzes.Select(quizId => quizId.Id).ToList();
            var foundGames = gameRepository.GetGamesOrderedByDateBasedOnUserId(foundQuizzesId);
            return Ok(foundGames.Select(gm => this.entityToVmMapper.Map(gm)));
        }

        [HttpPost]
        public IActionResult CreateGame([FromBody]GameViewModel gameViewModel)
        {
            string code = gameRepository.GenerateCode();
            Game game = new Game()
            {
                QuizId = gameViewModel.QuizId,
                GameDate = Convert.ToDateTime(gameViewModel.GameDate),
                Code = gameViewModel.Code
            };

            Game newGame = gameRepository.Create(game);
            if (newGame == null)
            {
                return BadRequest("Game couldn't be created");
            }
            GameViewModel gameVm = entityToVmMapper.Map(game);
            return Ok(gameVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateGame(int id, [FromBody]GameViewModel game)
        {
            Game gm = new Game
            {
                Id = id,
                QuizId = game.QuizId,
                GameDate = Convert.ToDateTime(game.GameDate),
                Code = game.Code
            };

            Game updatedGame = gameRepository.Update(gm);
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
            gameRepository.Delete(id);
            return Ok();
        }

    }
}

