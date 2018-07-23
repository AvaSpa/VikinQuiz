using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class QuestionRepo
    {
        private VikinQuizContext ctx;

        public QuestionRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public Question AddQuestion(Question q)
        {
            ctx.Question.Add(q);
            ctx.SaveChanges();
            return q;
        }

        public Question UpdateQuestion(Question q)
        {
            var existingQuestion = ctx.Question.Find(q.Id);
            existingQuestion.Text = q.Text;
            existingQuestion.CorrectAnsId = q.CorrectAnsId;
            ctx.SaveChanges();
            return q;
        }

        public void DeleteQuestion(int id)
        {
            Question q = ctx.Question.Find(id);
            ctx.Question.Remove(q);
            ctx.SaveChanges();
        }

        public List<Question> GetAll()
        {
            return ctx.Question.ToList();
        }

        public Question getQuestionById(int id)
        {
            return ctx.Question.Find(id);
        }

        public Question getQuestionByText(string text)
        {
            return ctx.Question.FirstOrDefault(d => (d.Text == text));
        }
    }
}
