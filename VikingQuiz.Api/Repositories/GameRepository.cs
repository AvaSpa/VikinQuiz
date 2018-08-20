using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class GameRepository
    {
        private VikinQuizContext context;
        private Random random = new Random();
        private int codeLength = 6;

        public GameRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Game Create(Game game)
        {
            context.Add(game);
            context.SaveChanges();
            return game;
        }

        public Game Update(Game game)
        {
            Game foundGame = context.Game.Find(game.Id);
            foundGame.QuizId = game.QuizId;
            foundGame.GameDate = game.GameDate;
            foundGame.Code = game.Code;
            context.SaveChanges();
            return game;
        }

        public void Delete(int id)
        {
            Game game = new Game
            {
                Id = id,
            };
            var playerGame = context.PlayerGame.Where(playergame => playergame.GameId == id).ToList();
            context.PlayerGame.RemoveRange(playerGame);
            context.Game.Remove(game);
            context.SaveChanges();
        }

        public List<Game> GetAll()
        {
            return context.Game.ToList();
        }

        public Game GetGameById(int id)
        {
            return context.Game.Find(id);
        }

        public Game GetGameByCode(string code)
        {
            Game foundGame = context.Game.Where(game => game.Code == code)
                .FirstOrDefault();

            return foundGame;
        }

        public string GenerateCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string code = "";
            for(int i = 0; i < codeLength; i++)
            {
                code += chars[random.Next(0, chars.Length)];
            }

            return code;
        }
    }
}

