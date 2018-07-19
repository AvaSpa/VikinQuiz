using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class UserRepo
    {
        private VikinQuizContext ctx;
        public UserRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public void CreateUser(User user)
        {
            ctx.Add(user);
            ctx.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            User foundUser = ctx.User.Find(user.Id);
            if (foundUser == null)
            {
                throw new Exception("No user with this id");
            }

            foundUser.Email = user.Email;
            foundUser.Pass = user.Pass;
            foundUser.PictureUrl = user.PictureUrl;
            foundUser.Username = user.Username;
            foundUser.Token = user.Token;
            foundUser.IsConfirmed = user.IsConfirmed;

            ctx.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            User foundUser = ctx.User.Find(id);
            if (foundUser == null)
            {
                throw new Exception("No user with this id in the database");
            }

            ctx.User.Remove(foundUser);
            ctx.SaveChanges();
        }

        public User GetUserById(int id)
        {
            User foundUser = ctx.User.Find(id);
            if (foundUser == null)
            {
                throw new Exception("No user with this id in the database");
            }

            return foundUser;
        }

        public List<User> GetAll()
        {
            return ctx.User.ToList();
        }
    }
}
