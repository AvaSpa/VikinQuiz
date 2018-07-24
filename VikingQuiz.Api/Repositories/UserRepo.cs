﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Repositories
{
    public class UserRepo
    {
        private VikinQuizContext ctx;
        public UserRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public User Authenticate(LoginViewModel login)
        {
            return ctx.User.FirstOrDefault(u => (u.Username == login.username || u.Email == login.username) && u.Pass == login.password);
        }

        public User CreateUser(User user)
        {
            User foundUser = ctx.User.Where(usr => usr.Username == user.Username || usr.Email == usr.Email).FirstOrDefault();
            if(foundUser == null)
            {
                return null;
            }
            ctx.Add(user);
            ctx.SaveChanges();
            return user;
        }

        public User UpdateUser(User user)
        {
            User foundUser = ctx.User.FirstOrDefault(x => x.Id == user.Id);
            foundUser.Email = user.Email;
            foundUser.Pass = user.Pass;
            foundUser.PictureUrl = user.PictureUrl;
            foundUser.Username = user.Username;
            ctx.SaveChanges();
            return user;
        }

        public void DeleteUser(int id)
        {
            var quizes = ctx.Quiz.Where(x => x.UserId == id).ToList();
            ctx.Quiz.RemoveRange(quizes);
            ctx.User.Remove(new User { Id = id });
            ctx.SaveChanges();
        }

        public User GetUserById(int id)
        {
            return ctx.User.FirstOrDefault(x => x.Id == id);
        }

        public List<User> GetAll()
        {
            return ctx.User.ToList();
        }

        public void Activate(string token)
        {
            User user = ctx.User.FirstOrDefault(u => u.Token == token);
            user.IsConfirmed = true;
            ctx.SaveChanges();
        }

        public User AssignToken(int id)
        {
            User user = ctx.User.FirstOrDefault(u => u.Id == id);
            user.IsConfirmed = false;
            user.Token = user.GenerateToken();
            ctx.SaveChanges();
            return user;
        }
    }
}
