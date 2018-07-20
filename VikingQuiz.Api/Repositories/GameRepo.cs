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

        public void Create(Game g)
        {
            ctx.Add(g);
            ctx.SaveChanges();
        }

        public void Update(Game g)
        {
            Game gg = ctx.Game.Find(g.Id);
            if (gg != null)
            {
                gg.QuizId = g.QuizId;
                gg.GameDate = g.GameDate;
                ctx.SaveChanges();
            }
            else
                throw new Exception("Game not found!");
        }

        public void Delete(int id)
        {
            Game g = ctx.Game.Find(id);
            if (g != null)
            {
                ctx.Game.Remove(g);
                ctx.SaveChanges();
            }
            else
                throw new Exception("Game not found!");
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
