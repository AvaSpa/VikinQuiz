using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VikingQuiz.Api.Models;
using VikingQuiz.Api.ViewModels;

namespace VikingQuiz.Api.Mappers
{
    public class SesionViewModelToEntityMapper : IEntityMapper<SesionViewModel, Sesion>
    {
        public Sesion Map(SesionViewModel entity)
        {
            Sesion s = new Sesion
            {
                Token = entity.Token,
                UserId = entity.UserId
            };
            return s;
        }
    }

    public class SesionToViewModelMapper : IEntityMapper<Sesion, SesionViewModel>
    {
        public SesionViewModel Map(Sesion entity)
        {
            SesionViewModel viewModel = new SesionViewModel
            {
                UserId = entity.UserId,
                Token = entity.Token
            };
            return viewModel;
        }
    }
}
