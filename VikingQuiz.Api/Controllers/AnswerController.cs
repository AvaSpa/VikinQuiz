using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;
using VikingQuiz.Api.Mappers;

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class AnswerController : Controller
    {

        private readonly AnswerRepository answerRepository;
        private readonly IEntityMapper<Answer, AnswerViewModel> entityToVmMapper;
        private readonly IEntityMapper<AnswerViewModel, Answer> vmToEntityMapper;

        public AnswerController(AnswerRepository answerRepository, IEntityMapper<Answer, AnswerViewModel> entityToVmMapper, IEntityMapper<AnswerViewModel, Answer> vmToEntityMapper)
        {
            this.answerRepository = answerRepository;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet("{id}")]
        public IActionResult GetAnswerById(int id)
        {
            Answer answer = answerRepository.GetAnswerById(id);
            if (answer == null)
            {
                return NotFound("Answer doesn't exist");
            }
            AnswerViewModel ansVm = this.entityToVmMapper.Map(answer);
            return Ok(ansVm);
        }

        [HttpPost]
        public IActionResult CreateAnswer([FromBody]AnswerViewModel answerVm)
        {
            Answer answer = new Answer
            {
                Text = answerVm.Text
            };

            Answer newAnswer = answerRepository.AddAnswer(answer);
            if (newAnswer == null)
            {
                return BadRequest("Answer couldn't be created");
            }
            AnswerViewModel newAnswerVm = entityToVmMapper.Map(answer);
            return Ok(newAnswerVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAnswer(int id, [FromBody]AnswerViewModel answerVm)
        {
            Answer answer = new Answer
            {
                Id = id,
                Text = answerVm.Text
            };

            Answer updatedAnswer = answerRepository.UpdateAnswer(answer, 3);
            if (updatedAnswer == null)
            {
                return BadRequest("Answer couldn't be updated");
            }
            AnswerViewModel newAnswerVm = entityToVmMapper.Map(updatedAnswer);
            return Ok(newAnswerVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnswer(int id)
        {
            answerRepository.DeleteAnswer(id);
            return Ok();
        }
    }
}

