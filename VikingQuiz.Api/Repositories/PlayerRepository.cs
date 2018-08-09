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

        public Player AddPlayer(Player player, string code)
        {
            if (FindGameByCode(code) == null)
                return null;
            Game foundGame = FindGameByCode(code);
            PlayerGame newPlayerGame = CreatePlayerGame(player, foundGame);
            ctx.Player.Add(player);
            ctx.PlayerGame.Add(newPlayerGame);
            ctx.SaveChanges();
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

        public Player getPlayerById(int id)
        {
            Player foundPlayer = ctx.Player.Where(x => x.Id == id)
                .Select(x => new Player { Id = x.Id, PictureUrl = x.PictureUrl, Name = x.Name })
                .FirstOrDefault();

            return foundPlayer;
        }


        public Game FindGameByCode(string code)
        {
            Game foundGame = ctx.Game.Where(x => x.Code == code)
                .Select(x => new Game { Id = x.Id, QuizId = x.QuizId, GameDate = x.GameDate, Code = x.Code })
                .FirstOrDefault();

            return foundGame;
        }

        public PlayerGame CreatePlayerGame(Player player, Game game)
        {
            PlayerGame playergame = new PlayerGame
            {
                Pid = player.Id,
                Gid = game.Id,
                Score = 0
            };
            return playergame;
        }


    }
}
