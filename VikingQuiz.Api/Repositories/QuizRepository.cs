using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class QuizRepository
    {
        private VikinQuizContext context;
        public QuizRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Quiz CreateQuiz(Quiz quiz)
        {
            context.Add(quiz);
            context.SaveChanges();
            return quiz;
        }

        public Quiz UpdateQuiz(Quiz quiz)
        {
            Quiz foundQuiz = context.Quiz.Where(x => x.Id == quiz.Id).FirstOrDefault();
            if (foundQuiz == null)
            {
                return null;
            }

            foundQuiz.Title = quiz.Title;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            context.SaveChanges();
            return quiz;
        }

        public void DeleteQuiz(int id)
        {
            Quiz quiz = new Quiz
            {
                Id = id
            };
            var games = context.Game.Where(x => x.QuizId == id).ToList();
            context.Game.RemoveRange(games);
            var quizquestions = context.QuizQuestion.Where(x => x.QuizId == id).ToList();
            context.QuizQuestion.RemoveRange(quizquestions);
            context.Quiz.Remove(quiz);
            context.SaveChanges();
        }

        public Quiz GetQuizById(int id)
        {
            Quiz foundQuiz = context.Quiz.Where(x => x.Id == id)
                .Select(x => new Quiz { Id = x.Id, Title = x.Title, UserId = x.UserId, PictureUrl = x.PictureUrl})
                .FirstOrDefault();

            return foundQuiz;
        }

        public IEnumerable<Quiz> GetAll()
        {
            return context.Quiz.ToList();
        }
    }
}
