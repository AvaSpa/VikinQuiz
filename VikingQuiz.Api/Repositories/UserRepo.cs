﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
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

        public User CreateUser(User user)
        {
            ctx.Add(user);
            ctx.SaveChanges();
            return user;
        }

        public User UpdateUser(User user)
        {
            User foundUser = ctx.User.Where(x => x.Id == user.Id)
                .FirstOrDefault();
            if (foundUser == null)
            {
                return null;
            }

            foundUser.Email = user.Email;
            foundUser.Pass = user.Pass;
            foundUser.PictureUrl = user.PictureUrl;
            foundUser.Username = user.Username;

            ctx.SaveChanges();
            return user;
        }

        public void DeleteUser(int id)
        {
            User user = new User
            {
                Id = id
            };
            //ctx.Attach(user);
            var quizes = ctx.Quiz.Where(x => x.UserId == id).ToList();
            ctx.Quiz.RemoveRange(quizes);
            var sessions = ctx.Sesion.Where(x => x.UserId == id).ToList();
            ctx.Sesion.RemoveRange(sessions);
            ctx.User.Remove(user);
            ctx.SaveChanges();
        }

        public User GetUserById(int id)
        {
            User foundUser = ctx.User.Where(x => x.Id == id)
                .Select(x => new User { Id = x.Id, Username = x.Username, Email = x.Email, PictureUrl = x.PictureUrl, Pass = x.Pass })
                .FirstOrDefault();

            return foundUser;
        }

        public List<User> GetAll()
        {
            return ctx.User.ToList();
        }
    }
}
