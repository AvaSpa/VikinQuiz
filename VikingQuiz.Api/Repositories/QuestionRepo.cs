﻿using System;
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

        public void AddQuestion(Question q)
        {
            ctx.Question.Add(q);
            ctx.SaveChanges();
        }

        public void UpdateQuestion(Question q)
        {
            Question qq = ctx.Question.Find(q.Id);
            if (qq != null)
            {
                qq.Text = q.Text;
                qq.CorrectAnsId = q.CorrectAnsId;
                ctx.SaveChanges();
            }
            else
                throw new Exception("Question not found!");
        }

        public void DeleteQuestion(int id)
        {
            Question qq = ctx.Question.Find(id);
            if (qq != null)
            {
                ctx.Question.Remove(qq);
                ctx.SaveChanges();
            }
            else
                throw new Exception("Question not found!");
        }

        public List<Question> GetAll()
        {
            return ctx.Question.ToList();
        }
    }
}
