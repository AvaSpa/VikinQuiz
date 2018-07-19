using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserRepo userRepo;

        public UsersController(VikinQuizContext context)
        {
            userRepo = new UserRepo(context);
        }

        [HttpGet]
        public List<User> GetUsers()
        {
            var users = userRepo.GetAll();
            return users;
        }

        [HttpGet("{id}")]
        public User GetUser(int id)
        {
            return userRepo.GetUserById(id);
        }

        [HttpPost]
        public void AddUser([FromBody]User user)
        {
            userRepo.CreateUser(user);
        }
    }
}
