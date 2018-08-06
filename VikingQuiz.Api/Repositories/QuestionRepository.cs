using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class QuestionRepository
    {
        private VikinQuizContext context;

        public QuestionRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Question AddQuestion(int quizId, Question question)
        {
            List<Question> allExistingQuestions = this.GetAllByQuizId(quizId);
            Question foundQuestion = allExistingQuestions.Where(q => q.Text == question.Text).FirstOrDefault();
            if (foundQuestion != null)
            {
                return null;
            }
            ctx.Question.Add(question);
            ctx.QuizQuestion.Add(new QuizQuestion
            {
                QuestionId = question.Id,
                QuizId = quizId
            });
            ctx.SaveChanges();
            return question;
        }

        public Question UpdateQuestion(Question question)
        {
            var existingQuestion = ctx.Question.FirstOrDefault(q => q.Id == question.Id);
            existingQuestion.Text = question.Text;
            existingQuestion.CorrectAnsId = question.CorrectAnsId;
            context.SaveChanges();
            return question;
        }

        public void DeleteQuestion(int quizId, int id)
        {
            List<Answer> answers = ctx.Answer.Where(a => a.QuestionId == id).ToList();
            ctx.Answer.RemoveRange(answers);
            List<QuizQuestion> quizQuestions = ctx.QuizQuestion.Where(qq => qq.QuestionId == id && qq.QuizId == quizId).ToList();
            ctx.QuizQuestion.RemoveRange(quizQuestions);
            Question foundQuestion = ctx.Question.FirstOrDefault(q => q.Id == id);
            ctx.Question.Remove(foundQuestion);
            ctx.SaveChanges();
        }

        public List<Question> GetAll()
        {
            return context.Question.ToList();
        }

        public List<Question> GetAllByQuizId(int quizId)
        {
            return ctx.Question
                    .Where(q => q.QuizQuestion
                                .FirstOrDefault(qq => qq.QuizId == quizId) != null)
                    .ToList();
        }


        public Question getQuestionById(int id)
        {
            return ctx.Question.FirstOrDefault(q => q.Id == id);
        }

        public Question getQuestionByText(string text)
        {
            return ctx.Question.FirstOrDefault(q => q.Text == text);
        }
    }
}
