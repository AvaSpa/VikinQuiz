using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class GameRepo
    {
        private VikinQuizContext ctx;

        public GameRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public Game Create(Game g)
        {
            ctx.Add(g);
            ctx.SaveChanges();
            return g;
        }

        public Game Update(Game g)
        {
            Game gg = ctx.Game.Find(g.Id);
            gg.QuizId = g.QuizId;
            gg.GameDate = g.GameDate;
            ctx.SaveChanges();
            return g;
        }

        public void Delete(int id)
        {
            Game gm = new Game
            {
                Id = id,
            };
            var playerGame = ctx.PlayerGame.Where(x => x.Gid == id).ToList();
            ctx.PlayerGame.RemoveRange(playerGame);
            ctx.Game.Remove(gm);
            ctx.SaveChanges();
        }

        public List<Game> GetAll()
        {
            return ctx.Game.ToList();
        }

        public Game GetGameById(int id)
        {
            return ctx.Game.Find(id);
        }
    }
}

