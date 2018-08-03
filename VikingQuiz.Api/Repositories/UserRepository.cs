using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Repositories
{
    public class UserRepository
    {
        private VikinQuizContext context;
        public UserRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public User CreateUser(User user)
        {
            User foundUser = context.User.Where(usr => usr.Email == user.Email).FirstOrDefault();
            if (foundUser != null)
            {
                return null;
            }
            context.Add(user);
            context.SaveChanges();
            return user;
        }

        public User UpdateUser(User user)
        {
            User foundUser = context.User.FirstOrDefault(x => x.Id == user.Id);
            foundUser.Email = user.Email;
            foundUser.Pass = user.Pass;
            foundUser.PictureUrl = user.PictureUrl;
            foundUser.Username = user.Username;
            context.SaveChanges();
            return user;
        }

        public void DeleteUser(int id)
        {
            var quizes = context.Quiz.Where(x => x.UserId == id).ToList();
            context.Quiz.RemoveRange(quizes);
            context.User.Remove(new User { Id = id });
            context.SaveChanges();
        }

        public User GetUserById(int id)
        {
            return context.User.FirstOrDefault(x => x.Id == id);
        }

        public bool CheckIfUserExists(int userId)
        {
            return context.User.Any(x => x.Id == userId);
        }

        public List<User> GetAll()
        {
            return context.User.ToList();
        }

        public void Activate(string token)
        {
            User user = context.User.FirstOrDefault(u => u.Token == token);
            user.IsConfirmed = true;
            context.SaveChanges();
        }

        public User AssignToken(int id)
        {
            User user = context.User.FirstOrDefault(u => u.Id == id);
            user.IsConfirmed = false;
            user.Token = user.GenerateToken();
            context.SaveChanges();
            return user;
        }

        public User AssignRandomPhoto(User user)
        {
            Random random = new Random();
            int number = random.Next(1, 6);
            User foundUser = context.User.FirstOrDefault(x => x.Id == user.Id);
            foundUser.PictureUrl = number + ".png";
            context.SaveChanges();
            return user;
        }
    }
}
