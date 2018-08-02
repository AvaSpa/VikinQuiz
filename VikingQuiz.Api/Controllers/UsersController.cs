﻿using Microsoft.AspNetCore.Mvc;
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
        private readonly IEntityMapper<User, UserViewModel> entityToVmMapper;

        public UsersController(UserRepo userRepo, IEntityMapper<User, UserViewModel> entityToVmMapper)
        {
            this.userRepo = userRepo;
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
                var errors = ModelState.GetErrors();
                return BadRequest(errors);
            }

            User userToSave = new User
            {
                Username = user.Username,
                Pass = user.Password.SHA256Encrypt(),
                Email = user.Email,
                PictureUrl = user.PictureUrl
            };

            User newUser = userRepo.CreateUser(userToSave);

            if(newUser == null)
            {
                return BadRequest("User couldn't be created");
            }
            userRepo.AssignRandomPhoto(newUser);
            UserViewModel userVm = entityToVmMapper.Map(newUser);
            return Created($"/{userVm.Id}", userVm);
        }

        [HttpPut]
        public IActionResult Update([FromBody]UserViewModel user)
        {
            if (!ModelState.IsValid)
            {
                var errors = ModelState.GetErrors();
                return BadRequest(errors);
            }

            if(!userRepo.CheckIfUserExists(user.Id))
            {
                return NotFound("User doesn't exist");
            }

            User userToUpdate = new User
            {
                Id = user.Id,
                Username = user.Username,
                Pass = user.Password.SHA256Encrypt(),
                Email = user.Email,
                PictureUrl = user.PictureUrl
            };

            User updatedUser = userRepo.UpdateUser(userToUpdate);
            UserViewModel userVm = entityToVmMapper.Map(updatedUser);
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
