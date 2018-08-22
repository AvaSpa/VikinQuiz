using System.Collections.Generic;

namespace VikingQuiz.Api.Controllers.SignalR.Services
{
    public interface IRoomService {
        IDictionary<string, GameInstance> Rooms { get; set; }
        IDictionary<string, string> Owners { get; set; }
    }
    public class RoomsService : IRoomService
    {
        public IDictionary<string, GameInstance> Rooms { get; set; }
        public IDictionary<string, string> Owners { get; set; }

        public RoomsService()
        {
            this.Rooms = new Dictionary<string, GameInstance>();
            this.Owners = new Dictionary<string, string>();
        }
    }
}
