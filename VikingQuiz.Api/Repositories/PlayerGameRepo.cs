using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class PlayerGameRepository
    {
        private VikinQuizContext context;

        public PlayerGameRepository(VikinQuizContext context)
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

        public void Delete(int playerid, int gameid)
        {
            PlayerGame playerGame = new PlayerGame { PlayerId = playerid, GameId = gameid };
            context.PlayerGame.Remove(playerGame);
            context.SaveChanges();
        }

        public List<PlayerGame> GetAll()
        {
            return context.PlayerGame.ToList();
        }

        public PlayerGame GetPlayerGameByIds(int playerid, int gameid)
        {
            return context.PlayerGame.Find(playerid, gameid);
        }
    }
}
