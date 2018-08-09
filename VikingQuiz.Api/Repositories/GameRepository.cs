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

        public GameRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Game Create(Game g)
        {
            context.Add(g);
            context.SaveChanges();
            return g;
        }

        public Game Update(Game g)
        {
            Game gg = context.Game.Find(g.Id);
            gg.QuizId = g.QuizId;
            gg.GameDate = g.GameDate;
            context.SaveChanges();
            return g;
        }

        public void Delete(int id)
        {
            Game gm = new Game
            {
                Id = id,
            };
            var playerGame = context.PlayerGame.Where(x => x.Gid == id).ToList();
            context.PlayerGame.RemoveRange(playerGame);
            context.Game.Remove(gm);
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
            Game foundGame = ctx.Game.Where(x => x.Code == code)
                .Select(x => new Game { Id = x.Id, QuizId = x.QuizId, GameDate = x.GameDate, Code = x.Code })
                .FirstOrDefault();

            return foundGame;
        }

        public string GenerateCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            string code = "";
            for(int i = 0; i < 6; i++)
            {
                code += chars[random.Next(0, 35)];
            }

            return code;
        }
    }
}

