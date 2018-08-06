using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class AnswerRepository
    {
        private VikinQuizContext context = new VikinQuizContext();

        public AnswerRepository(VikinQuizContext context)
        {
            this.context = context;
        }

        public Answer AddAnswer(Answer answer)
        {
            Answer foundAnswer = ctx.Answer.Where(a => a.QuestionId == answer.QuestionId && a.Text == answer.Text).FirstOrDefault();
            if (foundAnswer != null)
            {
                return null;
            }
            ctx.Answer.Add(answer);
            ctx.SaveChanges();
            return answer;
        }

        public void DeleteAnswer(int id)
        {
            ctx.Answer.Remove(new Answer { Id = id });
            ctx.SaveChanges();
        }

        public Answer UpdateAnswer(Answer answer)
        {
            var existingAnswer = context.Answer.Find(answer.Id);
            existingAnswer.Text = answer.Text;
            existingAnswer.QuestionId = answer.QuestionId;
            context.SaveChanges();
            return answer;
        }


        public List<Answer> GetAllAnswers(int id)
        {
            return ctx.Answer
                    .Where(a => a.QuestionId == id)
                    .ToList();
        }

        public Answer GetAnswerById(int id)
        {
            return context.Answer.Find(id);
        }

        public Answer GetAnswerByText(string text)
        {
            return context.Answer.FirstOrDefault(answer => (answer.Text == text));
        }

    }
}

