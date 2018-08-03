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

        public Player AddPlayer(Player player)
        {
            context.Player.Add(player);
            context.SaveChanges();
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

        public List<Player> GetAllPlayers()
        {
            return context.Player.ToList();
        }
    }
}
