using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;
using System.Security.Claims;
using VikingQuiz.Api.Utilities;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuizzesController: Controller
    {
        private readonly QuizRepository quizRepository;
        private readonly IEntityMapper<QuizViewModel, Quiz> vmToEntityMapper;
        private readonly IEntityMapper<Quiz, QuizViewModel> entityToVmMapper;

        public QuizzesController(QuizRepository quizRepository, IEntityMapper<QuizViewModel, Quiz> vmToEntityMapper, IEntityMapper<Quiz, QuizViewModel> entityToVmMapper)
        {
            this.quizRepository = quizRepository;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
        }
    
        public IActionResult ImageUploadChecker(NewQuizViewModel quiz)
        {
            IActionResult statusCodeResult = Ok();
            statusCodeResult = Ok();
            if (quiz.Files.Count == 0)
            {
                statusCodeResult =  BadRequest("An image file needs to be provided");
            }
            else if (quiz.Files.Count > 1)
            {
                statusCodeResult = BadRequest("Only one file can be uploaded.");
            }

            long size = quiz.Files.Sum(f => f.Length);
            if (size <= 0)
            {
                statusCodeResult = BadRequest("File must not be empty.");
            }

            var contentType = quiz.Files[0].ContentType;
            if (!(contentType == "image/gif" || contentType == "image/png" || contentType == "image/jpeg"))
            {
                statusCodeResult =  BadRequest("Only images of the following formats are allowed: .png, .jpeg or .gif");
            }

            return statusCodeResult;
        }



        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Quiz quiz = quizRepository.GetQuizById(id);
            if(quiz == null)
            {
                return NotFound("Quiz doesn't exist");
            }
            QuizViewModel quizVm = this.entityToVmMapper.Map(quiz);
            return Ok(quizVm);
        }

        [HttpGet]
        [Authorize]
        public IActionResult GetQuizzesByUserId()
          {
              int userId = User.Claims.GetUserId();
              var newQuiz = quizRepository.GetQuizByUserId(userId);
              if (newQuiz == null)
              {
                  return NotFound("Quiz doesn't exist");
              }
              return Ok(newQuiz.Select(quiz => this.entityToVmMapper.Map(quiz)));
          } 
       


        {

        [HttpPost("newQuiz")] // temp route for testing - simple POST later
        [RequestSizeLimit(5_000_000)]
        //[Authorize] add authorize when needed
        public async Task<IActionResult> Post(NewQuizViewModel quiz)
        {
            // User.Claims.GetUserId(); -- user ID based on the token
            IActionResult httpStatusResponse = ImageUploadChecker(quiz);
            if (httpStatusResponse != Ok()) {
                return httpStatusResponse;
            }

            string fileName;
            try {
                var blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                fileName = await blobService.UploadPhoto(quiz.Files[0]);
                fileName = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileName;
            } catch (Exception) {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz createdQuiz = quizRepo.CreateQuiz(new Quiz
            {
                Title = quiz.Title,
                PictureUrl = fileName,
                UserId = 3
            });
            if (createdQuiz == null) {
                return BadRequest("Quiz couldn't be created");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(createdQuiz);
            quizVm.PictureUrl = fileName;

            return Ok(new {quizVm.Id, quizVm.Title, quizVm.PictureUrl});
        }


        //[HttpPut]
        //public IActionResult Update([FromBody]QuizViewModel quiz)
        //{
        //    Quiz qiz = quizRepo.UpdateQuiz(vmToEntityMapper.Map(quiz));
        //    if (qiz == null)
        //    {
        //        return NotFound("Quiz doesn't exist");
        //    }
        //    QuizViewModel quizVm = entityToVmMapper.Map(qiz);
        //    return Accepted($"/{quizVm.Id}", quizVm);
        //}

        [HttpPost("updateQuiz")] // temp route for testing - PATCH later
        [RequestSizeLimit(5_000_000)]
        //[Authorize] add authorize when needed
        public async Task<IActionResult> Put(NewQuizViewModel quiz)
        {
            // User.Claims.GetUserId(); -- user ID based on the token
            IActionResult httpStatusResponse = ImageUploadChecker(quiz);
            if (httpStatusResponse != Ok()) {
                return httpStatusResponse;
            }

            var filePath = Path.GetTempFileName();
            using (var stream = new FileStream(filePath, FileMode.Create)) {
                await quiz.Files[0].CopyToAsync(stream);
            }

            string fileName;
            var blobService = new AzureBlobService();
            try {
                await blobService.InitializeBlob();
                fileName = await blobService.UploadPhoto(quiz.Files[0]);
            } catch (Exception) {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz updatedQuiz = quizRepo.UpdateQuiz(new Quiz
            {
                Title = quiz.Title,
                PictureUrl = fileName,
                UserId = 3,
                Id = (int)quiz.QuizId
            });

            if (updatedQuiz == null) {
                return BadRequest("Quiz does not exist.");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(updatedQuiz);
            quizVm.PictureUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileName;

            return Ok(new { quizVm.Id, quizVm.Title, quizVm.PictureUrl });
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var existingQuiz = quizRepository.GetQuizById(id);
            if(existingQuiz == null)
            {
                return NotFound("Quiz doesn't exist");
            }
            quizRepository.DeleteQuiz(id);
            return Ok();
        }
    }
}
