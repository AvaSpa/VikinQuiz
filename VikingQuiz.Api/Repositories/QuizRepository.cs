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
            Quiz foundQuiz = context.Quiz.Where(q => q.Id == quiz.Id).FirstOrDefault();
            foundQuiz.Title = quiz.Title;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            context.SaveChanges();
            return quiz;
        }

        public Quiz DeleteQuiz (int id, int userId)
        {
            // check if the player has acces to that quiz in order to delete it
            Quiz quiz = new Quiz
            {
                Id = id
            };

            
            var quizMatchingIdAndPlayerId = ctx.Quiz.Where(x => x.Id== id && x.UserId == userId).ToList();
            if( quizMatchingIdAndPlayerId.Count == 0 )
            {
                return null;
            }

            var games = ctx.Game.Where(x => x.QuizId == id).ToList();
            ctx.Game.RemoveRange(games);
            var quizquestions = ctx.QuizQuestion.Where(x => x.QuizId == id).ToList();
            ctx.QuizQuestion.RemoveRange(quizquestions);
            ctx.Quiz.Remove(quiz);
            ctx.SaveChanges();

            return quizMatchingIdAndPlayerId.FirstOrDefault();
        }

        public Quiz GetQuizById(int id)
        {
            Quiz foundQuiz = context.Quiz.Where(q => q.Id == id)
                .Select(q => new Quiz { Id = q.Id, Title = q.Title, UserId = q.UserId, PictureUrl = q.PictureUrl})
                .FirstOrDefault();

            return foundQuiz;
        }

        public IEnumerable<Quiz> GetAll(int userId)
        {
            var quizzesOfTheUser = ctx.Quiz.Where(x => x.UserId == userId).ToList();
            return quizzesOfTheUser;
        }
    }
}
