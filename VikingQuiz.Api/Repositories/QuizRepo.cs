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

        public void createQuiz(Quiz quiz)
        {
            ctx.Add(quiz);
            ctx.SaveChanges();
        }

        public void updateQuiz(Quiz quiz)
        {
            Quiz foundQuiz = ctx.Quiz.Find(quiz.Id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id");
            }

            foundQuiz.Title = quiz.Title ;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            ctx.SaveChanges();
        }

        public void deleteQuiz(int id)
        {
            Quiz foundQuiz = ctx.Quiz.Find(id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id in the database");
            }

            ctx.Quiz.Remove(foundQuiz);
            ctx.SaveChanges();
        }

        public Quiz getQuizById(int id)
        {
            Quiz foundQuiz = ctx.Quiz.Find(id);
            if (foundQuiz == null)
            {
                throw new Exception("No quiz with this id in the database");
            }

            return foundQuiz;
        }

        public IEnumerable<Quiz> getAll()
        {
            return ctx.Quiz.ToList();
        }
    }
}
