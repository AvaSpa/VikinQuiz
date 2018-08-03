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
    
        private IActionResult FileValidityChecker(NewQuizViewModel quizBodyData)
        {
            IActionResult statusCodeResult = Ok();
            statusCodeResult = Ok();
            if (quizBodyData.Files.Count == 0) {
                statusCodeResult =  BadRequest("An image file need to be provided."); }
            else if (quizBodyData.Files.Count > 1) {
                statusCodeResult = BadRequest("Only one file can be uploaded.");
            }

            long size = quizBodyData.Files.Sum(f => f.Length);
            if (size <= 0) {
                statusCodeResult = BadRequest("File must not be empty.");
            }

            var contentType = quizBodyData.Files[0].ContentType;
            if (!(contentType == "image/gif" || contentType == "image/png" || contentType == "image/jpeg")) {
                statusCodeResult =  BadRequest("Only images of the following formats are allowed: .png, .jpeg or .gif");
            }

            return statusCodeResult;
        }


        // Get all the quizzes which belong to an user
        [HttpGet]
        //[Authorize] -- add authorize when it is available on the front end
        public async Task<IActionResult> GetAll()
        {
            // User.Claims.GetUserId(); -- use this to get the ID of the user based on the token recieved

            AzureBlobService blobService = new AzureBlobService();
            await blobService.InitializeBlob();

            var quizzes = quizRepo.GetAll(3); // pass that user ID in
            foreach(var quiz in quizzes) {
                quiz.PictureUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + quiz.PictureUrl;
            }

            return Ok( quizzes.Select( quiz => this.entityToVmMapper.Map(quiz) ) );
        }


        // Get a specific quiz id only if it belongs to that user
        [HttpGet("{id}")]
        //[Authorize] -- add authorize when it is available on the front end
        public async Task<IActionResult> Get(int id)
        {
            // User.Claims.GetUserId(); -- use this to get the ID of the user based on the token recieved

            AzureBlobService blobService = new AzureBlobService();
            await blobService.InitializeBlob();

            Quiz quiz = quizRepo.GetQuizById(id);
            if(quiz == null || quiz.UserId != 3) { // use the user ID instead of the hardcoded user in here
                return NotFound("Quiz doesn't exist");
            }

            quiz.PictureUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + quiz.PictureUrl;
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
       

        // Add a new empty quiz to the DB
        [HttpPost]
        [RequestSizeLimit(5_000_000)]
        //[Authorize] add authorize when avaiable on the front-end
        public async Task<IActionResult> Post(NewQuizViewModel quizBodyData)
        {
            // User.Claims.GetUserId(); -- user ID based on the token, add after it is available on the front-end
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if ( IActionResult.Equals(imageHttpResponse, Ok()) ) {
                return imageHttpResponse;
            }

            string fileUrl;
            AzureBlobService blobService;
            try {
                blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                fileUrl = await blobService.UploadPhoto(quizBodyData.Files[0]);
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
            quizVm.PictureUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileUrl;

            return Ok(new {quizVm.Id, quizVm.Title, quizVm.PictureUrl});
        }


        // update a specific quiz id
        [HttpPost("{id}")]
        [RequestSizeLimit(5_000_000)]
        //[Authorize] add authorize when avaiable on the front-end
        public async Task<IActionResult> Put(NewQuizViewModel quizBodyData, int id)
        {
            // User.Claims.GetUserId(); -- user ID based on the token, add after it is available on the front-end
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if ( IActionResult.Equals( imageHttpResponse, Ok() ) ) {
                return imageHttpResponse;
            }

            string fileUrl;
            AzureBlobService blobService;
            try {
                blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                var previousQuizState = quizRepo.GetQuizById(id);

                blobService.DeletePhoto(previousQuizState.PictureUrl); // deletes the old photo from the storage
                fileUrl = await blobService.UploadPhoto(quizBodyData.Files[0]);
            } catch (Exception) {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz updatedQuiz = quizRepo.UpdateQuiz(new Quiz
            {
                Title = quizBodyData.Title,
                PictureUrl = fileUrl,
                UserId = 3,
                Id = id
            });

            if (updatedQuiz == null) {
                return BadRequest("Quiz does not exist.");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(updatedQuiz);
            quizVm.PictureUrl = blobService.urlPath.AbsoluteUri.ToString() + "users/" + fileUrl;

            return Ok(new { quizVm.Id, quizVm.Title, quizVm.PictureUrl });
        }

        [HttpDelete("{id}")]
        // [Authorize] add it when available on the front end
        public async Task<IActionResult> Delete(int id)
        {
            // User.Claims.GetUserId(); -- user ID based on the token, add after it is available on the front-end

            var deletedQuiz = quizRepo.DeleteQuiz(id, 3); // you get the user ID based on the authorization token, right now it's hard coded for testing

            if(deletedQuiz != null) {
                AzureBlobService blobService = new AzureBlobService();
                await blobService.InitializeBlob();
                blobService.DeletePhoto(deletedQuiz.PictureUrl);
                return Ok();
            } else {
                return BadRequest("Deletion Impossible. Quiz does not exist.");
            }
        }
    }
}