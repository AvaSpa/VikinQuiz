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

        private readonly AnswerRepo answerRepo;
        private IEntityMapper<Answer, AnswerViewModel> entityToVmMapper;
        private IEntityMapper<AnswerViewModel, Answer> vmToEntityMapper;

        public AnswerController(AnswerRepo answerRepo, IEntityMapper<Answer, AnswerViewModel> entityToVmMapper, IEntityMapper<AnswerViewModel, Answer> vmToEntityMapper)
        {
            this.answerRepo = answerRepo;
            this.entityToVmMapper = entityToVmMapper;
            this.vmToEntityMapper = vmToEntityMapper;
        }

        [HttpGet]
        public IActionResult GetAnswer()
        {
            var result = answerRepo.GetAllAnswers().Select(s => entityToVmMapper.Map(s)).ToList();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public IActionResult GetAnswerById(int id)
        {
            Answer ans = answerRepo.GetAnswerById(id);
            if (ans == null)
            {
                return NotFound("Answer doesn't exist");
            }
            AnswerViewModel ansVm = this.entityToVmMapper.Map(ans);
            return Ok(ansVm);
        }
        
        [HttpPost]
        public IActionResult CreateAnswer([FromBody]AnswerViewModel answer)
        {
            Answer ans = new Answer
            {
                Text = answer.Text,
                QuestionId = answer.QuestionId
            };

            Answer newAnswer = answerRepo.AddAnswer(ans);
            if (newAnswer == null)
            {
                return BadRequest("Answer couldn't be created");
            }
            AnswerViewModel answerVm = entityToVmMapper.Map(ans);
            return Ok(answerVm);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateAnswer(int id, [FromBody]AnswerViewModel answer)
        {
            Answer ans = new Answer()
            {
                Id = id,
                Text = answer.Text,
                QuestionId = answer.QuestionId
            };

            Answer updatedAnswer = answerRepo.UpdateAnswer(ans);
            if (updatedAnswer == null)
            {
                return BadRequest("Answer couldn't be updated");
            }
            AnswerViewModel answerVm = entityToVmMapper.Map(updatedAnswer);
            return Ok(answerVm);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAnswer(int id)
        {
            answerRepo.DeleteAnswer(id);
            return Ok();
        }
    }
}
