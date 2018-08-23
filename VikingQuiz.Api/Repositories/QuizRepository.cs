using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public struct QuizQuestionsAnswers
    {
        public Quiz quiz;
        public IList<Question> questions;
        public IDictionary<int, Tuple<IList<Answer>, int>> answers;
    }
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

        public List<Quiz> GetQuizzesByUserId(int id) {
            return context.Quiz.Where(q => q.UserId == id).OrderByDescending(q => q.LastModified).ToList();

        }

        public IEnumerable<Quiz> GetAll(int userId) {
            var quizzesOfTheUser = context.Quiz.Where(dbQuiz => dbQuiz.UserId == userId).ToList();
            return quizzesOfTheUser;
        }

        public QuizQuestionsAnswers GetQuizByIdAndAssociatedQuestionsAndAnswers(int id)
        {
            IList<int> questionIds = context.QuizQuestion.Where(qq => qq.QuizId == id).Select(qq => qq.QuestionId).ToList();
            IList<Question> questions = context.Question.Where(q => questionIds.Contains(q.Id)).ToList();
            IDictionary<int, Tuple<IList<Answer>, int>> answers =
                (from Questions in context.Question
                 join Answers in context.Answer on Questions.Id equals Answers.QuestionId
                 group Answers by new { Id = Questions.Id, CorrectAnsId = Questions.CorrectAnsId } into g
                 select new
                 {
                     key = g.Key.Id,
                     value = new Tuple<IList<Answer>, int>(g.ToArray(), g.Key.CorrectAnsId)
                 })
                 .ToDictionary(t=>t.key, t=>t.value);
            QuizQuestionsAnswers quizQuestionsAnswers = new QuizQuestionsAnswers
            {
                quiz = context.Quiz.FirstOrDefault(q => q.Id == id),
                questions = questions,
                answers = answers
            };

            return quizQuestionsAnswers;
        }
    }
}
