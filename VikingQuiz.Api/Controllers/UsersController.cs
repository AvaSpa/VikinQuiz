using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using System.Security.Claims;
using VikingQuiz.Api.Utilities;
using Microsoft.AspNetCore.Authorization;


namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly UserRepo userRepo;
        private readonly IEntityMapper<UserViewModel, User> vmToEntityMapper;
        private readonly IEntityMapper<User, UserViewModel> entityToVmMapper;
        private readonly IConfiguration _config;

        public UsersController(UserRepo userRepo, IEntityMapper<UserViewModel, User> vmToEntityMapper, IEntityMapper<User, UserViewModel> entityToVmMapper, IConfiguration configuration)
        {
            this._config = configuration;
            this.userRepo = userRepo;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
        }

        [HttpGet]
        //[Authorize]
        public IActionResult GetAll()
        {
            var users = userRepo.GetAll();
            var result = users.Select(user => this.entityToVmMapper.Map(user)).ToList();
            return Ok(result);
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

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors })
    .ToArray());
            }

            User usr = new User {
                Username = user.Username,
                Pass = user.Password,
                Email = user.Email,
                PictureUrl = user.PictureUrl
            };

            User newusr = userRepo.CreateUser(usr);

            if(newusr == null)
            {
                return BadRequest("User couldn't be created");
            }

            userRepo.AssignRandomPhoto(newusr);
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
