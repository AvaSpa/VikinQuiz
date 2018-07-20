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
    public class QuizzesController
    {
        private readonly QuizRepo quizRepo;
        private readonly QuizViewModelToEntityMapper vmToEntityMapper;
        private readonly QuizToViewModelMapper entityToVmMapper;

        public QuizzesController(VikinQuizContext context)
        {
            quizRepo = new QuizRepo(context);
            vmToEntityMapper = new QuizViewModelToEntityMapper();
            entityToVmMapper = new QuizToViewModelMapper();
        }

        [HttpGet]
        public IEnumerable<QuizViewModel> GetAll()
        {
            var quizzes = quizRepo.GetAll();
            return quizzes.Select(user => this.entityToVmMapper.Map(user));
        }

        [HttpGet("{id}")]
        public QuizViewModel Get(int id)
        {
            try
            {
                return this.entityToVmMapper.Map(quizRepo.GetQuizById(id));
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        [HttpPost]
        public /*ActionResult*/ void Add([FromBody]QuizViewModel quiz)
        {
            try
            {
                quizRepo.CreateQuiz(vmToEntityMapper.Map(quiz));
            }
            catch (Exception ex)
            {
                //return new HttpStatusCodeResult(200);
            }
        }
    }
}
