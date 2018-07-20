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


// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace VikingQuiz.Api.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {
        private readonly QuestionRepo questionRepo;
        private IEntityMapper<Question, QuestionViewModel> mapper;

        public QuestionController(VikinQuizContext context)
        {
            questionRepo = new QuestionRepo(context);
            mapper = new QuestionToViewMapper();
        }

        [HttpPost]
        public QuestionViewModel CreateQuestion([FromBody]QuestionViewModel question)
        {
            Question q = new Question()
            {
                Text = question.Text,
                CorrectAnsId  = question.CorrectAnsId
            };

            questionRepo.AddQuestion(q);
            return mapper.Map(q);
        }

        [HttpPut("{id}")]
        public QuestionViewModel UpdateQuestion(int id, [FromBody]QuestionViewModel question)
        {
            Question q = new Question()
            {
                Id = id,
                Text = question.Text,
                CorrectAnsId = question.CorrectAnsId
            };

            questionRepo.UpdateQuestion(q);
            return mapper.Map(q);
        }

        [HttpDelete("{id}")]
        public void DeleteQuestion(int id)
        {
            questionRepo.DeleteQuestion(id);
        }
    }
}
