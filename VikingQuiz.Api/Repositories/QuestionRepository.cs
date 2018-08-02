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

        public Question AddQuestion(Question q)
        {
            context.Question.Add(q);
            context.SaveChanges();
            return q;
        }

        public Question UpdateQuestion(Question q)
        {
            var existingQuestion = context.Question.Find(q.Id);
            existingQuestion.Text = q.Text;
            existingQuestion.CorrectAnsId = q.CorrectAnsId;
            context.SaveChanges();
            return q;
        }

        public void DeleteQuestion(int id)
        {
            Question q = context.Question.Find(id);
            context.Question.Remove(q);
            context.SaveChanges();
        }

        public List<Question> GetAll()
        {
            return context.Question.ToList();
        }

        public Question getQuestionById(int id)
        {
            return context.Question.Find(id);
        }

        public Question getQuestionByText(string text)
        {
            return context.Question.FirstOrDefault(d => (d.Text == text));
        }
    }
}
