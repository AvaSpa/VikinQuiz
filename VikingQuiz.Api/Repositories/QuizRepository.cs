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
        public QuizRepository(VikinQuizContext context) {
            this.context = context;
        }

        public Quiz CreateQuiz(Quiz quiz) {
            context.Add(quiz);
            context.SaveChanges();
            return quiz;
        }

        public Quiz UpdateQuiz(Quiz quiz) {
            Quiz foundQuiz = context.Quiz.Where(dbQuiz => dbQuiz.Id == quiz.Id && dbQuiz.UserId == quiz.UserId).FirstOrDefault();
            if (foundQuiz == null) {
                return null;
            }

            foundQuiz.Title = quiz.Title;
            foundQuiz.PictureUrl = quiz.PictureUrl;
            foundQuiz.UserId = quiz.UserId;

            context.SaveChanges();
            return quiz;
        }

        public bool DeleteQuiz(int id, int userId) {
            if (!context.Quiz.Any(dbQuiz => dbQuiz.Id == id && dbQuiz.UserId == userId))
                return false;

            int[] gameIds = context.Game.Where(g => g.QuizId==id).Select(g=> g.Id).ToArray();

            int[] playerIds = context.PlayerGame.Where(pg=> gameIds.Contains(pg.GameId)).Select(pg=>pg.PlayerId).ToArray();

            context.PlayerGame.RemoveRange(context.PlayerGame.Where(pg => gameIds.Contains(pg.GameId)));

            context.Game.RemoveRange(context.Game.Where(g => gameIds.Contains(g.Id)));

            int[] questions = context.QuizQuestion.Where(qq => qq.QuizId == id).Select(q=> q.QuestionId).ToArray();

            context.Question.RemoveRange(context.Question.Where(q => questions.Contains(q.Id)));

            context.Answer.RemoveRange(context.Answer.Where(a => questions.Contains(a.QuestionId.Value)));

            context.QuizQuestion.RemoveRange(context.QuizQuestion.Where(qq => qq.QuizId == id));

            context.Quiz.Remove(new Quiz { Id = id });
            context.SaveChanges();
            return true;
        }

        public Quiz GetQuizById(int id) {
            Quiz foundQuiz = context.Quiz.Where(dbQuiz => dbQuiz.Id == id)
                .Select(quiz => new Quiz { Id = quiz.Id, Title = quiz.Title, UserId = quiz.UserId, PictureUrl = quiz.PictureUrl })
                .FirstOrDefault();

            return foundQuiz;
        }

        public List<Quiz> GetQuizByUserId(int id) {
            return context.Quiz.Where(q => q.UserId == id).OrderByDescending(q => q.LastModified).ToList();

        }

        public IEnumerable<Quiz> GetAll(int userId) {
            var quizzesOfTheUser = context.Quiz.Where(dbQuiz => dbQuiz.UserId == userId).ToList();
            return quizzesOfTheUser;
        }
    }
}
