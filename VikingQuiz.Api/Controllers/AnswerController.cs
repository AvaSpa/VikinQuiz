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
        private IEntityMapper<Answer, AnswerViewModel> mapper;

        public AnswerController(AnswerRepo answerRepo, IEntityMapper<Answer, AnswerViewModel> mapper)
        {
            this.answerRepo = answerRepo;
            this.mapper = mapper;
        }
        [HttpGet]
        public List<AnswerViewModel> GetAnswer()
        {
            return answerRepo.GetAllAnswers().Select(s => mapper.Map(s)).ToList();
        }

        [HttpGet("{id}")]
        public AnswerViewModel GetAnswerById(int id)
        {
            return mapper.Map(answerRepo.GetAnswerById(id));
        }
        
        [HttpPost]
        public AnswerViewModel CreateAnswer([FromBody]AnswerViewModel answer)
        {
            Answer ans = new Answer
            {
                Text = answer.Text,
                QuestionId = answer.QuestionId
            };
        
            answerRepo.AddAnswer(ans);
            return mapper.Map(ans);

        }

        [HttpPut("{id}")]
        public AnswerViewModel UpdateAnswer(int id, [FromBody]AnswerViewModel answer)
        {
            Answer ans = new Answer()
            {
                Id = id,
                Text = answer.Text,
                QuestionId = answer.QuestionId
            };

            answerRepo.UpdateAnswer(ans);
            return mapper.Map(ans);

        }

        [HttpDelete("{id}")]
        public void DeleteAnswer(int id)
        {
            answerRepo.DeleteAnswer(id);
        }
    }
}
