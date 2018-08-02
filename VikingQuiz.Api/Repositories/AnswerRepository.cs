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
            context.Answer.Add(answer);
            context.SaveChanges();
            return answer;
        }

        public void DeleteAnswer(int id)
        {
            Answer ans = context.Answer.Find(id);
            context.Answer.Remove(ans);
            context.SaveChanges();
        }

        public Answer UpdateAnswer(Answer ans)
        {
            var existingAnswer = context.Answer.Find(ans.Id);
            existingAnswer.Text = ans.Text;
            existingAnswer.QuestionId = ans.QuestionId;
            context.SaveChanges();
            return ans;
        }


        public List<Answer> GetAllAnswers()
        {
            return context.Answer.ToList();
        }

        public Answer GetAnswerById(int id)
        {
            return context.Answer.Find(id);
        }

        public Answer GetAnswerByText(string text)
        {
            return context.Answer.FirstOrDefault(d => (d.Text == text));
        }

    }
}

