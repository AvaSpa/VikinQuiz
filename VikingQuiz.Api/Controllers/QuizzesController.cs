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
    
        public IActionResult FileValidityChecker(NewQuizViewModel quizBodyData)
        {
            IActionResult statusCodeResult = Ok();
            statusCodeResult = Ok();
            if (quizBodyData.Files.Count == 0)
            {
                statusCodeResult =  BadRequest("An image file needs to be provided");
            }
            else if (quizBodyData.Files.Count > 1)
            {
                statusCodeResult = BadRequest("Only one file can be uploaded.");
            }

            long size = quizBodyData.Files.Sum(f => f.Length);
            if (size <= 0)
            {
                statusCodeResult = BadRequest("File must not be empty.");
            }

            var contentType = quizBodyData.Files[0].ContentType;
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
        //[Authorize] add authorize when avaiable on the front-end
        public async Task<IActionResult> Post(NewQuizViewModel quizBodyData)
        {
            // User.Claims.GetUserId(); -- user ID based on the token, add after it is available on the front-end
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if (imageHttpResponse != Ok()) {
                return imageHttpResponse;
            }

            string fileUrl;
            try {
                var blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                fileUrl = await blobService.UploadPhoto(quizBodyData.Files[0]);
                fileUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileUrl;
            } catch (Exception) {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz createdQuiz = quizRepo.CreateQuiz(new Quiz
            {
                Title = quizBodyData.Title,
                PictureUrl = fileUrl,
                UserId = 3
            });
            if (createdQuiz == null) {
                return BadRequest("Quiz couldn't be created");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(createdQuiz);
            quizVm.PictureUrl = fileUrl;

            return Ok(new {quizVm.Id, quizVm.Title, quizVm.PictureUrl});
        }


        [HttpPost("updateQuiz")] // temp route for testing - PATCH Verb later
        [RequestSizeLimit(5_000_000)]
        //[Authorize] add authorize when avaiable on the front-end
        public async Task<IActionResult> Put(NewQuizViewModel quizBodyData)
        {
            // User.Claims.GetUserId(); -- user ID based on the token, add after it is available on the front-end
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if (imageHttpResponse != Ok())
            {
                return imageHttpResponse;
            }

            string fileUrl;
            try
            {
                AzureBlobService blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                fileUrl = await blobService.UploadPhoto(quizBodyData.Files[0]);
                fileUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileUrl;
            }
            catch (Exception)
            {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz updatedQuiz = quizRepo.UpdateQuiz(new Quiz
            {
                Title = quizBodyData.Title,
                PictureUrl = fileUrl,
                UserId = 3,
                Id = (int)quizBodyData.QuizId
            });

            if (updatedQuiz == null)
            {
                return BadRequest("Quiz does not exist.");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(updatedQuiz);
            quizVm.PictureUrl = fileUrl;

            return Ok(new { quizVm.Id, quizVm.Title, quizVm.PictureUrl });
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
