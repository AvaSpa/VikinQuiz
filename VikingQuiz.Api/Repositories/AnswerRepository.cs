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
            Answer foundAnswer = context.Answer.Where(a => a.QuestionId == answer.QuestionId && a.Text == answer.Text).FirstOrDefault();
            if (foundAnswer != null)
            {
                return null;
            }
            context.Answer.Add(answer);
            context.SaveChanges();
            return answer;
        }

        public void DeleteAnswer(int id)
        {
            context.Answer.Remove(new Answer { Id = id });
            context.SaveChanges();
        }

        public Answer UpdateAnswer(Answer answer, int questionId)
        {
            var existingAnswer = context.Answer.Find(answer.Id);
            existingAnswer.Text = answer.Text;
            existingAnswer.QuestionId = questionId;
            context.SaveChanges();
            return answer;
        }


        public List<Answer> GetAllAnswers(int id)
        {
            return context.Answer
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

