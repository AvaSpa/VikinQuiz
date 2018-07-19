using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using VikingQuiz.Api.Mappers;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.Repositories;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Controllers
{
    public class SesionController : Controller
    {
        private readonly SessionRepo sessionRepo;
        private IEntityMapper<Sesion, SesionViewModel> mapper;

        public SesionController(VikinQuizContext context)
        {
            sessionRepo = new SessionRepo(context);
            mapper = new SesionToViewModelMapper();
        }

        [HttpGet]
        public List<SesionViewModel> GetSessions()
        {
            return sessionRepo.GetAll().Select(s => mapper.Map(s)).ToList();
        }

        [HttpGet("{id}")]
        public Sesion GetSession(int id)
        {
            return sessionRepo.GetSesion(id);
        }

        [HttpGet("{token}")]
        public bool CheckToken(string token)
        {
            return sessionRepo.ExistsByToken(token);
        }

        [HttpPost]
        public Sesion CreateSession([FromBody]UserViewModel user)
        {
            Sesion sesion = new Sesion
            {
                UserId = user.Id,
                ExpTime = 7200,
            };
            sessionRepo.Create(sesion);
            return sesion;
        }
    }
}
