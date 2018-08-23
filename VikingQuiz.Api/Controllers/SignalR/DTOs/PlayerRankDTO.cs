using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace VikingQuiz.Api.Controllers.SignalR.DTOs
{
    public class PlayerRankDTO : PlayerDTO
    {
        public int rank;
        public int numberOfPlayers;
    }
}
