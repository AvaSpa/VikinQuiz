using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class AnswerRepo
    {
        private VikinQuizContext ctx = new VikinQuizContext();

        public AnswerRepo(VikinQuizContext context)
        {
            this.ctx = context;
        }

        public void AddAnswer(Answer answer)
        {
            ctx.Answer.Add(answer);
            ctx.SaveChanges();
        }

        public void DeleteAnswer(int id)
        {
            Answer ans = ctx.Answer.Find(id);
            if (ans != null)
            {
                ctx.Answer.Remove(ans);
                ctx.SaveChanges();
            }
            else
                throw new Exception("Answer not found!")
        }

        public void UpdateAnswer(Answer ans)
        {
            var existingAnswer = ctx.Answer.Find(ans.Id);
            if (existingAnswer != null)
            {
                existingAnswer.Text = ans.Text;
                existingAnswer.QuestionId = ans.QuestionId;
                existingAnswer.QuestionId = ans.QuestionId;
                ctx.SaveChanges();
            }
            else
                throw new Exception("Answer not found!")
        }


        public List<Answer> GetAllAnswers()
        {
            return ctx.Answer.ToList();
        }

        public Answer GetAnswerById(int id)
        {
            return ctx.Answer.Find(id);
        }

        public Answer GetAnswerByText(string text)
        {
            return ctx.Answer.FirstOrDefault(d => (d.Text == text));
        }

    }
}
