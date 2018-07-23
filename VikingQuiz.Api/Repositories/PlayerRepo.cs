using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class PlayerRepo
    {
        private VikinQuizContext ctx = new VikinQuizContext();

        public PlayerRepo(VikinQuizContext context)
        {
            this.ctx = context;
        }

        public Player AddPlayer(Player player)
        {
            ctx.Player.Add(player);
            ctx.SaveChanges();
            return player;
        }

        public void DeletePlayer(int id)
        {
            Player player = ctx.Player.Find(id);
            ctx.Player.Remove(player);
            ctx.SaveChanges();
        }

        public Player UpdatePlayer(Player player)
        {
            var existingPlayer = ctx.Player.Find(player.Id);
            existingPlayer.PictureUrl = player.PictureUrl;
            existingPlayer.Name = player.Name;
            ctx.SaveChanges();
            return player;
        }

        public List<Player> GetAllPlayers()
        {
            return ctx.Player.ToList();
        }
    }
}
