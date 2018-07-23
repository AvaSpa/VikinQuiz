using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserRepo userRepo;
        private readonly IEntityMapper<UserViewModel, User> vmToEntityMapper;
        private readonly IEntityMapper<User, UserViewModel> entityToVmMapper;

        public UsersController(UserRepo userRepo, IEntityMapper<UserViewModel, User> vmToEntityMapper, IEntityMapper<User, UserViewModel> entityToVmMapper)
        {
            this.userRepo = userRepo;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var users = userRepo.GetAll();
            return Ok(users.Select(user => this.entityToVmMapper.Map(user)));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            User user = userRepo.GetUserById(id);
            if(user == null)
            {
                return NotFound("User doesn't exist");
            }
            UserViewModel userVm = this.entityToVmMapper.Map(user);
            return Ok(userVm);
        }

        [HttpPost]
        public IActionResult Add([FromBody]UserViewModel user)
        {
            user.Id = null;
            User usr = userRepo.CreateUser(vmToEntityMapper.Map(user));
            if(usr == null)
            {
                return BadRequest("User couldn't be created");
            }
            UserViewModel userVm = entityToVmMapper.Map(usr);
            return Created($"/{userVm.Id}", userVm);
        }

        [HttpPut]
        public IActionResult Update([FromBody]UserViewModel user)
        {
            User usr = userRepo.UpdateUser(vmToEntityMapper.Map(user));
            if (usr == null)
            {
                return NotFound("User doesn't exist");
            }
            UserViewModel userVm = entityToVmMapper.Map(usr);
            return Accepted($"/{userVm.Id}", userVm);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            userRepo.DeleteUser(id);
            return Ok();
        }
    }
}
