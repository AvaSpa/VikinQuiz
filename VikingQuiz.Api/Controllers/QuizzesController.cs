using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
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

        [HttpGet]
        public IActionResult GetAll()
        {
            var quizzes = quizRepository.GetAll();
            return Ok(quizzes.Select(quiz => this.entityToVmMapper.Map(quiz)));
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

          [HttpGet("{id}")]
          public IActionResult GetQuizByUserId(int id)
          {
              var newQuiz = quizRepository.GetQuizByUserId(id);
              if (newQuiz == null)
              {
                  return NotFound("Quiz doesn't exist");
              }
              return Ok(newQuiz.Select(quiz => this.entityToVmMapper.Map(quiz)));
          } 
       

        [HttpPost]
        public IActionResult Add([FromBody]QuizViewModel quiz)
        {
            Quiz newQuiz = quizRepository.CreateQuiz(new Quiz {
                Title = quiz.Title,
                PictureUrl = quiz.PictureUrl,
                UserId = quiz.UserId,
                LastModified = DateTime.Now
            });
            if (newQuiz == null)
            {
                return BadRequest("Quiz couldn't be created");
            }
            QuizViewModel quizVm = entityToVmMapper.Map(newQuiz);
            return Created($"/{quizVm.Id}", quizVm);
        }

        [HttpPut]
        public IActionResult UpdateQuiz([FromBody]QuizViewModel quiz)
        {
            Quiz updatedQuiz = quizRepository.UpdateQuiz(vmToEntityMapper.Map(quiz));
            if (updatedQuiz == null)
            {
                return NotFound("Quiz doesn't exist");
            }
            QuizViewModel quizVm = entityToVmMapper.Map(updatedQuiz);
            return Accepted($"/{quizVm.Id}", quizVm);
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
