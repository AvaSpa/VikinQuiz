using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Utilities;

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
            Quiz foundQuiz = context.Quiz.Where(dbQuiz => dbQuiz.Id == quiz.Id && dbQuiz.UserId == quiz.UserId).FirstOrDefault();
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

        public string GetQuizPictureUrl(int id)
        {
            var pictureUrl = context.Quiz.FirstOrDefault(q => q.Id == id).PictureUrl;
            return pictureUrl ;
        }

        public void DeleteQuiz (int id)
        {

            var quizToRemove = context.Quiz.FirstOrDefault(q => q.Id == id);


            /* var games = context.Game.Where(g => g.QuizId == id).ToList();
            context.Game.RemoveRange(games);
            var quizquestions = context.QuizQuestion.Where(dbQuestion => dbQuestion.QuizId == id).ToList();
            context.QuizQuestion.RemoveRange(quizquestions); 
             */
            context.Quiz.Remove(quizToRemove);
            context.SaveChanges();

        }

        public Quiz GetQuizById(int id)
        {
            Quiz foundQuiz = context.Quiz.Where(dbQuiz => dbQuiz.Id == id)
                .Select(quiz => new Quiz { Id = quiz.Id, Title = quiz.Title, UserId = quiz.UserId, PictureUrl = quiz.PictureUrl})
                .FirstOrDefault();

            return foundQuiz;
        }

        public List<Quiz> GetQuizByUserId(int id)
        {
            return context.Quiz.Where(q => q.UserId == id).OrderByDescending(q => q.LastModified).ToList();

        }

        public IEnumerable<Quiz> GetAll(int userId)
        {
            var quizzesOfTheUser = context.Quiz.Where(dbQuiz => dbQuiz.UserId == userId).ToList();
            return quizzesOfTheUser;
        }
    }
}
