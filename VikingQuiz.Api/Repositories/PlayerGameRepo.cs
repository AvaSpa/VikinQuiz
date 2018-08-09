using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class PlayerGameRepo
    {
        private VikinQuizContext ctx;

        public PlayerGameRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public PlayerGame Create(PlayerGame playergame)
        {
            ctx.Add(playergame);
            ctx.SaveChanges();
            return playergame;
        }

        public PlayerGame Update(PlayerGame playergame)
        {
            PlayerGame updatedPlayerGame = ctx.PlayerGame.Find(playergame.Pid, playergame.Gid);
            updatedPlayerGame.Pid = playergame.Pid;
            updatedPlayerGame.Gid = playergame.Gid;
            updatedPlayerGame.Score = playergame.Score;

            return updatedPlayerGame;
        }

        public void Delete(int pid, int gid)
        {
            PlayerGame pg = new PlayerGame { Pid = pid, Gid = gid };
            ctx.PlayerGame.Remove(pg);
            ctx.SaveChanges();
        }

        public List<PlayerGame> GetAll()
        {
            return ctx.PlayerGame.ToList();
        }

        public PlayerGame GetPlayerGameByIds(int pid, int gid)
        {
            return ctx.PlayerGame.Find(pid, gid);
        }
    }
}
