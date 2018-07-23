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

        public Answer AddAnswer(Answer answer)
        {
            ctx.Answer.Add(answer);
            ctx.SaveChanges();
            return answer;
        }

        public void DeleteAnswer(int id)
        {
            Answer ans = ctx.Answer.Find(id);
            ctx.Answer.Remove(ans);
            ctx.SaveChanges();
        }

        public Answer UpdateAnswer(Answer ans)
        {
            var existingAnswer = ctx.Answer.Find(ans.Id);
            existingAnswer.Text = ans.Text;
            existingAnswer.QuestionId = ans.QuestionId;
            existingAnswer.QuestionId = ans.QuestionId;
            ctx.SaveChanges();
            return ans;
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

