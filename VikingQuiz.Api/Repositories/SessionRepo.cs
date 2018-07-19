using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;

namespace VikingQuiz.Api.Repositories
{
    public class SessionRepo
    {
        private VikinQuizContext ctx;

        public SessionRepo(VikinQuizContext ctx)
        {
            this.ctx = ctx;
        }

        public void Create(Sesion s)
        {
            ctx.Add(s);
            ctx.SaveChanges();
        }

        public void Update(Sesion s)
        {
            Sesion old = ctx.Sesion.Find(s.Id);
            if (old != null)
            {
                old.Token = s.Token;
                old.UserId = s.UserId;
                old.ExpTime = s.ExpTime;
            }
            else
                throw new Exception("Session not found!");
        }

        public void Delete(int id)
        {
            Sesion sesion = ctx.Sesion.Find(id);
            if (sesion != null)
            {
                ctx.Sesion.Remove(sesion);
                ctx.SaveChanges();
            }
            else
                throw new Exception("Session not found!");
        }


        public Sesion GetSesion(int id)
        {
            return ctx.Sesion.Find(id);
        }

        public Sesion GetByToken(string token)
        {
            return ctx.Sesion.SingleOrDefault(t => t.Token == token);
        }

        public bool ExistsByToken(string token)
        {
            return ctx.Sesion.Any(t => t.Token == token);
        }

        public List<Sesion> GetAll()
        {
            return ctx.Sesion.ToList();
        }
    }
}
