using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class PlayerGameRepo
    {
        private VikinQuizContext context;

        public PlayerGameRepo(VikinQuizContext context)
        {
            this.context = context;
        }

        public PlayerGame Create(PlayerGame playergame)
        {
            context.Add(playergame);
            context.SaveChanges();
            return playergame;
        }

        public PlayerGame Update(PlayerGame playergame)
        {
            PlayerGame updatedPlayerGame = context.PlayerGame.Find(playergame.PlayerId, playergame.GameId);
            updatedPlayerGame.PlayerId = playergame.PlayerId;
            updatedPlayerGame.GameId = playergame.GameId;
            updatedPlayerGame.Score = playergame.Score;

            return updatedPlayerGame;
        }

        public void Delete(int pid, int gid)
        {
            PlayerGame pg = new PlayerGame { PlayerId = pid, GameId = gid };
            context.PlayerGame.Remove(pg);
            context.SaveChanges();
        }

        public List<PlayerGame> GetAll()
        {
            return context.PlayerGame.ToList();
        }

        public PlayerGame GetPlayerGameByIds(int pid, int gid)
        {
            return context.PlayerGame.Find(pid, gid);
        }
    }
}
