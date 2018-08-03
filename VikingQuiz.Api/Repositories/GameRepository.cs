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
    }
}

