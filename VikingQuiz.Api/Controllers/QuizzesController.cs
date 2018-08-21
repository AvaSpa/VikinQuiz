﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.Utilities;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuizzesController : Controller
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

        // Get all the quizzes which belong to an user
        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll()
        {
            int currentUserId = User.Claims.GetUserId();

            AzureBlobService blobService = new AzureBlobService(azureContainerName);

            var quizzes = quizRepository.GetQuizByUserId(currentUserId);
            foreach (var quiz in quizzes)
            {

                quiz.PictureUrl = blobService.GetFullUrlOfFileName(quiz.PictureUrl);
            }

            return Ok(quizzes.Select(quiz => this.entityToVmMapper.Map(quiz)));
        }


        // Get a specific quiz id only if it belongs to that user
        [HttpGet("{id}")]
        [Authorize]
        public async Task<IActionResult> GetQuiz(int id)
        {
            int currentUserId = User.Claims.GetUserId();

            Quiz quiz = quizRepository.GetQuizById(id);
            if (quiz == null || quiz.UserId != currentUserId)
            {
                return NotFound("Quiz doesn't exist");
            }

            quiz.PictureUrl = new AzureBlobService(azureContainerName).GetFullUrlOfFileName(quiz.PictureUrl);
            QuizViewModel quizVm = this.entityToVmMapper.Map(quiz);
            return Ok(quizVm);
        }

        // Add a new empty quiz to the DB
        [HttpPost]
        [RequestSizeLimit(5_000_000)]
        [Authorize]
        public async Task<IActionResult> AddQuiz(NewQuizViewModel quizBodyData)
        {
            int currentUserId = User.Claims.GetUserId();
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if (IActionResult.Equals(imageHttpResponse, Ok()))
            {
                return imageHttpResponse;
            }

            string fileUrl;
            AzureBlobService blobService;
            try
            {
                blobService = new AzureBlobService(azureContainerName);
                fileUrl = await blobService.UploadPhotoAsync(quizBodyData.Files[0]);
            }
            catch (Exception)
            {
                return BadRequest("Image could not be uploaded.");
            }


            Quiz createdQuiz = quizRepository.CreateQuiz(new Quiz
            {
                Title = quizBodyData.Title,
                PictureUrl = fileUrl,
                UserId = currentUserId
            });
            if (createdQuiz == null)
            {
                return BadRequest("Quiz couldn't be created");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(createdQuiz);
            quizVm.PictureUrl = new AzureBlobService(azureContainerName).GetFullUrlOfFileName(quizVm.PictureUrl);

            return Ok(new { quizVm.Id, quizVm.Title, quizVm.PictureUrl });
        }


        // update a specific quiz id
        [HttpPost("{id}")]
        [RequestSizeLimit(5_000_000)]
        [Authorize]
        public async Task<IActionResult> Put(NewQuizViewModel quizBodyData, int id)
        {
            int currentUserId = User.Claims.GetUserId();
            IActionResult imageHttpResponse = FileValidityChecker(quizBodyData);
            if (IActionResult.Equals(imageHttpResponse, Ok()))
            {
                return imageHttpResponse;
            }

            string fileUrl;
            AzureBlobService blobService;
            try
            {
                blobService = new AzureBlobService(azureContainerName);
                var previousQuizState = quizRepository.GetQuizById(id);

                blobService.DeletePhotoAsync(previousQuizState.PictureUrl);
                fileUrl = await blobService.UploadPhotoAsync(quizBodyData.Files[0]);
            }
            catch (Exception)
            {
                return BadRequest("Image could not be uploaded.");
            }

            Quiz updatedQuiz = quizRepository.UpdateQuiz(new Quiz
            {
                Title = quizBodyData.Title,
                PictureUrl = fileUrl,
                UserId = currentUserId,
                Id = id
            });

            if (updatedQuiz == null)
            {
                return BadRequest("Quiz does not exist.");
            }

            QuizViewModel quizVm = entityToVmMapper.Map(updatedQuiz);
            quizVm.PictureUrl = new AzureBlobService(azureContainerName).GetFullUrlOfFileName(quizVm.PictureUrl);


            return Ok(new { quizVm.Id, quizVm.Title, quizVm.PictureUrl });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            int currentUserId = User.Claims.GetUserId();
            var deletedQuiz = quizRepository.DeleteQuiz(id, currentUserId);

            if (deletedQuiz != null)
            {
                AzureBlobService blobService = new AzureBlobService(azureContainerName);
                blobService.DeletePhotoAsync(deletedQuiz.PictureUrl);
                return Ok();
            }
            else
            {
                return BadRequest("Deletion Impossible. Quiz does not exist.");
            }
        }

        private string azureContainerName = "users";

        private IActionResult FileValidityChecker(NewQuizViewModel quizBodyData)
        {
            IActionResult statusCodeResult = Ok();

            if (quizBodyData.Files.Count == 0)
            {
                statusCodeResult = BadRequest("An image file need to be provided.");
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
                statusCodeResult = BadRequest("Only images of the following formats are allowed: .png, .jpeg or .gif");
            }

            return statusCodeResult;
        }
    }
}

