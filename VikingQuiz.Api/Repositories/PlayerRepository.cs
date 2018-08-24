using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class PlayerRepository
    {
        private VikinQuizContext context = new VikinQuizContext();

        public PlayerRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Player AddPlayer(Player player, int gameId)
        {
            context.Player.Add(player);
            context.SaveChanges();
            PlayerGame newPlayerGame = new PlayerGame
            {
                GameId = gameId,
                PlayerId = player.Id,
                Score = 0
            };
            context.PlayerGame.Add(newPlayerGame);
            return player;
        }

        public void DeletePlayer(int id)
        {
            Player player = context.Player.Find(id);
            context.Player.Remove(player);
            context.SaveChanges();
        }

        public Player UpdatePlayer(Player player)
        {
            var existingPlayer = context.Player.Find(player.Id);
            existingPlayer.PictureUrl = player.PictureUrl;
            existingPlayer.Name = player.Name;
            context.SaveChanges();
            return player;
        }

        public List<Player> GetAll()
        {
            return context.Player.ToList();
        }

        public Player GetPlayerById(int id)
        {
            Player foundPlayer = context.Player.Where(x => x.Id == id)
                .Select(x => new Player { Id = x.Id, PictureUrl = x.PictureUrl, Name = x.Name })
                .FirstOrDefault();

            return foundPlayer;
        }

        public PlayerGame CreatePlayerGame(Player player, Game game)
        {
            PlayerGame playergame = new PlayerGame
            {
                GameId = game.Id,
                Score = 0
            };
            return playergame;
        }

        public Game FindGameByCode(string code)
        {
            Game foundGame = context.Game.Where(x => x.Code == code).FirstOrDefault();

            return foundGame;
        }

        public Player AssignRandomPhoto(Player player)
        {
            Random random = new Random();
            int number = random.Next(1, 6);
            Player foundPlayer = context.Player.FirstOrDefault(p => p.Id == player.Id);
            foundPlayer.PictureUrl = number + ".png";
            context.SaveChanges();
            return player;
        }
    }
}
