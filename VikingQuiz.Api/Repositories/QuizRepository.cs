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
            Quiz foundQuiz = context.Quiz.Where(x => x.Id == quiz.Id && x.UserId == quiz.UserId).FirstOrDefault();
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

        public Quiz DeleteQuiz (int id, int userId)
        {
            // check if the player has acces to that quiz in order to delete it
            Quiz quiz = new Quiz
            {
                Id = id
            };

            
            var quizMatchingIdAndPlayerId = context.Quiz.Where(x => x.Id== id && x.UserId == userId).ToList();
            if( quizMatchingIdAndPlayerId.Count == 0 )
            {
                return null;
            }

            var games = context.Game.Where(x => x.QuizId == id).ToList();
            context.Game.RemoveRange(games);
            var quizquestions = context.QuizQuestion.Where(x => x.QuizId == id).ToList();
            context.QuizQuestion.RemoveRange(quizquestions);

            context.Quiz.Remove(quizMatchingIdAndPlayerId[0]);
            context.SaveChanges();

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
            var quizzesOfTheUser = context.Quiz.Where(x => x.UserId == userId).ToList();
            return quizzesOfTheUser;
        }
    }
}
