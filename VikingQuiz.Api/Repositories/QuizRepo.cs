using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class QuizRepo
    {
        private VikinQuizContext ctx;
        public QuizRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public Quiz CreateQuiz(Quiz quiz)
        {
            ctx.Add(quiz);
            ctx.SaveChanges();
            return quiz;
        }

        public Quiz UpdateQuiz(Quiz quiz)
        {
            Quiz foundQuiz = ctx.Quiz.Where(x => x.Id == quiz.Id).FirstOrDefault();
            if (foundQuiz == null)
            {
                return null;
            }

            foundQuiz.Title = quiz.Title;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            ctx.SaveChanges();
            return quiz;
        }

        public void DeleteQuiz(int id)
        {
            Quiz quiz = new Quiz
            {
                Id = id
            };
            var games = ctx.Game.Where(x => x.QuizId == id).ToList();
            ctx.Game.RemoveRange(games);
            var quizquestions = ctx.QuizQuestion.Where(x => x.QuizId == id).ToList();
            ctx.QuizQuestion.RemoveRange(quizquestions);
            ctx.Quiz.Remove(quiz);
            ctx.SaveChanges();
        }

        public Quiz GetQuizById(int id)
        {
            Quiz foundQuiz = ctx.Quiz.Where(x => x.Id == id)
                .Select(x => new Quiz { Id = x.Id, Title = x.Title, UserId = x.UserId, PictureUrl = x.PictureUrl})
                .FirstOrDefault();

            return foundQuiz;
        }

        public IEnumerable<Quiz> GetAll()
        {
            return ctx.Quiz.ToList();
        }
    }
}
