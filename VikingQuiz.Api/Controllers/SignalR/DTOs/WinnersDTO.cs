using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Controllers.SignalR.DTOs
{
    public class WinnersDTO
    {
        public PlayerDTO[] winners;
        public WinnersDTO(PlayerDTO[] winners) { this.winners = winners; }
    }
}
