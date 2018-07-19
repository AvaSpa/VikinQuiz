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

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class GameController : Controller
    {
        private readonly GameRepo gameRepo;
        private IEntityMapper<Game, GameViewModel> mapper;

        public GameController(VikinQuizContext context)
        {
            gameRepo = new GameRepo(context);
            mapper = new GameToViewMapper();
        }

        [HttpGet]
        public List<GameViewModel> GetGame()
        {
            return gameRepo.GetAll().Select(s => mapper.Map(s)).ToList();
        }

        [HttpGet("{id}")]
        public GameViewModel GetAnswerById(int id)
        {
            return mapper.Map(gameRepo.GetGameById(id));
        }

        [HttpPost]
        public GameViewModel CreateGame([FromBody]GameViewModel game)
        {
            Game g = new Game()
            {
                QuizId = game.QuizId,
                GameDate = Convert.ToDateTime(game.GameDate)
            };
            gameRepo.Create(g);
            return mapper.Map(g);
        }

        [HttpPut("{id}")]
        public GameViewModel UpdateGame(int id, [FromBody]GameViewModel game)
        {
            Game g = new Game()
            {
                Id = id,
                QuizId = game.QuizId,
                GameDate = Convert.ToDateTime(game.GameDate)
            };
            gameRepo.Update(g);
            return mapper.Map(g);
        }

        [HttpDelete("{id}")]
        public void DeleteGame(int id)
        {
            gameRepo.Delete(id);
        }

    }
}
