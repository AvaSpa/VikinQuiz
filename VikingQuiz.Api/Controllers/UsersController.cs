using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Utilities;
using Microsoft.AspNetCore.Authorization;


namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class UsersController : Controller
    {
        private readonly string azureContainerName = "users-pictures";
        private readonly UserRepository userRepository;
        private readonly IEntityMapper<User, UserViewModel> entityToVmMapper;

        public UsersController(UserRepository userRepository, IEntityMapper<User, UserViewModel> entityToVmMapper)
        {
            this.userRepository = userRepository;
            this.entityToVmMapper = entityToVmMapper;
        }

        [Route("current")]
        [HttpGet]
        [Authorize]
        public IActionResult Get()
        {
            int userId = User.Claims.GetUserId();
            User user = userRepository.GetUserById(userId);
            if (user == null)
            {
                return NotFound("User doesn't exist");
            }
            if (user.Pass != null)
            {
                user.PictureUrl = AzureBlobService.GetFullUrlOfContainer(azureContainerName, user.PictureUrl);
            }
            UserViewModel userVm = this.entityToVmMapper.Map(user);
            return Ok(userVm);
        }

        [HttpGet]
        //[Authorize]
        public IActionResult GetAll()
        {
            var users = userRepository.GetAll();
            var result = users.Select(user => this.entityToVmMapper.Map(user)).ToList();
            return Ok(result);
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

            User newUser = userRepository.CreateUser(userToSave);

            if(newUser == null)
            {
                return BadRequest("User couldn't be created");
            }
            userRepository.AssignRandomPhoto(newUser);
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

            if(!userRepository.CheckIfUserExists(user.Id))
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

            User updatedUser = userRepository.UpdateUser(userToUpdate);
            UserViewModel userVm = entityToVmMapper.Map(updatedUser);
            return Accepted($"/{userVm.Id}", userVm);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            userRepository.DeleteUser(id);
            return Ok();
        }
    }
}
