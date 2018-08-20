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

        public PlayerGame Create(PlayerGame playerGame)
        {
            context.Add(playerGame);
            context.SaveChanges();
            return playerGame;
        }

        public PlayerGame Update(PlayerGame playerGame)
        {
            PlayerGame updatedPlayerGame = context.PlayerGame.Find(playerGame.PlayerId, playerGame.GameId);
            updatedPlayerGame.PlayerId = playerGame.PlayerId;
            updatedPlayerGame.GameId = playerGame.GameId;
            updatedPlayerGame.Score = Convert.ToInt32(playerGame.Score);
            updatedPlayerGame.AverageTime = Convert.ToInt32(playerGame.AverageTime);

            return updatedPlayerGame;
        }

        public void Delete(int playerId, int gameId)
        {
            PlayerGame playerGame = new PlayerGame { PlayerId = playerId, GameId = gameId };
            context.PlayerGame.Remove(playerGame);
            context.SaveChanges();
        }

        public List<PlayerGame> GetAll()
        {
            return context.PlayerGame.ToList();
        }

        public PlayerGame GetPlayerGameByIds(int playerId, int gameId)
        {
            return context.PlayerGame.Find(playerId, gameId);
        }

        public List<PlayerGame> GetPlayerGameByGameId(int gameId)
        {
            var playersOfGame = context.PlayerGame.Where(playergame => playergame.GameId == gameId).ToList();
            return playersOfGame;
        }

        public List<PlayerGame> GetRankingByGameId(int gameId)
        {
            List<PlayerGame> playersInGame = this.GetPlayerGameByGameId(gameId);

            return playersInGame.OrderByDescending(player => player.Score).ThenBy(player => player.AverageTime).ToList();
        }
    }
}
