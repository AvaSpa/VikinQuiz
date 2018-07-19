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

        public void AddPlayer(Player player)
        {
            ctx.Player.Add(player);
            ctx.SaveChanges();
        }

        public void DeletePlayer(int id)
        {
            Player player = ctx.Player.Find(id);
            if (player != null)
            {
                ctx.Player.Remove(player);
                ctx.SaveChanges();
            }
            else
                throw new Exception("Player not found!");
        }

        public void UpdatePlayer(Player player)
        {
            var existingPlayer = ctx.Player.Find(player.Id);
            if (existingPlayer != null)
            {
                existingPlayer.Name = player.Name;
                existingPlayer.PictureUrl = player.PictureUrl;
                ctx.SaveChanges();
            }
            else
                throw new Exception("Player not found!");
        }

        public List<Player> GetAllPlayers()
        {
            return ctx.Player.ToList();
        }
    }
}
