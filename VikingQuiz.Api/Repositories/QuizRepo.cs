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

        public void CreateQuiz(Quiz quiz)
        {
            ctx.Add(quiz);
            ctx.SaveChanges();
        }

        public void UpdateQuiz(Quiz quiz)
        {
            Quiz foundQuiz = ctx.Quiz.Find(quiz.Id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id");
            }

            foundQuiz.Title = quiz.Title;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            ctx.SaveChanges();
        }

        public void DeleteQuiz(int id)
        {
            Quiz foundQuiz = ctx.Quiz.Find(id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id in the database");
            }

            ctx.Quiz.Remove(foundQuiz);
            ctx.SaveChanges();
        }

        public Quiz GetQuizById(int id)
        {
            Quiz foundQuiz = ctx.Quiz.Find(id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id in the database");
            }

            return foundQuiz;
        }

        public IEnumerable<Quiz> GetAll()
        {
            return ctx.Quiz.ToList();
        }
    }
}
