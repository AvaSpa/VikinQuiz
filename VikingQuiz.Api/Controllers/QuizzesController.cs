using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuizzesController: Controller
    {
        private readonly QuizRepo quizRepo;
        private readonly IEntityMapper<QuizViewModel, Quiz> vmToEntityMapper;
        private readonly IEntityMapper<Quiz, QuizViewModel> entityToVmMapper;

        public QuizzesController(QuizRepo quizRepo, IEntityMapper<QuizViewModel, Quiz> vmToEntityMapper, IEntityMapper<Quiz, QuizViewModel> entityToVmMapper)
        {
            this.quizRepo = quizRepo;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var quizzes = quizRepo.GetAll();
            return Ok(quizzes.Select(quiz => this.entityToVmMapper.Map(quiz)));
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Quiz quiz = quizRepo.GetQuizById(id);
            if(quiz == null)
            {
                return NotFound("Quiz doesn't exist");
            }
            QuizViewModel quizVm = this.entityToVmMapper.Map(quiz);
            return Ok(quizVm);
        }

        [HttpPost]
        public IActionResult Add([FromBody]QuizViewModel quiz)
        {
            Quiz qiz = quizRepo.CreateQuiz(new Quiz {
                Title = quiz.Title,
                PictureUrl = quiz.PictureUrl,
                UserId = quiz.UserId
            });
            if (qiz == null)
            {
                return BadRequest("Quiz couldn't be created");
            }
            QuizViewModel quizVm = entityToVmMapper.Map(qiz);
            return Created($"/{quizVm.Id}", quizVm);
        }

        [HttpPut]
        public IActionResult Update([FromBody]QuizViewModel quiz)
        {
            Quiz qiz = quizRepo.UpdateQuiz(vmToEntityMapper.Map(quiz));
            if (qiz == null)
            {
                return NotFound("Quiz doesn't exist");
            }
            QuizViewModel quizVm = entityToVmMapper.Map(qiz);
            return Accepted($"/{quizVm.Id}", quizVm);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            quizRepo.DeleteQuiz(id);
            return Ok();
        }
    }
}
