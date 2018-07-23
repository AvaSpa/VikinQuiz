﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly QuestionRepo questionRepo;
        private IEntityMapper<Question, QuestionViewModel> entityToVmMapper;
        private IEntityMapper<QuestionViewModel, Question> vmToEntityMapper;

        public QuestionController(QuestionRepo questionRepo, IEntityMapper<Question, QuestionViewModel> entityToVmMapper, IEntityMapper<QuestionViewModel, Question> vmToEntityMapper)
        {
            this.questionRepo = questionRepo;
            this.vmToEntityMapper = vmToEntityMapper;
            this.entityToVmMapper = entityToVmMapper;
        }

        [HttpPost]
        public IActionResult CreateQuestion([FromBody]QuestionViewModel question)
        {
            Question q = new Question
            {
                Text = question.Text,
                CorrectAnsId = question.CorrectAnsId
            };

            Question newQuestion = questionRepo.AddQuestion(q);
            if (newQuestion == null)
            {
                return BadRequest("Question couldn't be created");
            }
            QuestionViewModel questionVm = entityToVmMapper.Map(q);
            return Ok(questionVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateQuestion(int id, [FromBody]QuestionViewModel question)
        {
            Question q = new Question()
            {
                Id = id,
                Text = question.Text,
                CorrectAnsId = question.CorrectAnsId
            };

            Question updatedQuestion = questionRepo.UpdateQuestion(q);
            if (updatedQuestion == null)
            {
                return BadRequest("Question couldn't be updated");
            }
            QuestionViewModel questionVm = entityToVmMapper.Map(updatedQuestion);
            return Ok(updatedQuestion);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuestion(int id)
        {
            questionRepo.DeleteQuestion(id);
            return Ok();
        }

        [HttpGet("{id}")]
        public IActionResult GetQuestionById(int id)
        {
            Question q = questionRepo.getQuestionById(id);
            if (q == null)
            {
                return NotFound("Question doesn't exist");
            }

            QuestionViewModel questionVm = this.entityToVmMapper.Map(q);
            return Ok(questionVm);
        }

        [HttpGet("{text}")]
        public IActionResult GetQuestionByText(string text)
        {
            Question q = questionRepo.getQuestionByText(text);
            if (q == null)
            {
                return NotFound("Question doesn't exist");
            }

            QuestionViewModel questionVm = this.entityToVmMapper.Map(q);
            return Ok(questionVm);
        }
    }
}
