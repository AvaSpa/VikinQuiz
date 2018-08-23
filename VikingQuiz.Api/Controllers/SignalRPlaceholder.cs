using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using VikingQuiz.Api.Repositories;

namespace VikingQuiz.Api.Controllers
{
    //your controller will have to extend Microsoft.AspNetCore.SignalR.Hub
    //just like a controller would normally extend Microsoft.AspNetCore.Mvc.Controller
    public class SignalRPlaceholder : Hub
    {
        private UserRepository userRepository;
        public SignalRPlaceholder(UserRepository userRepository)
        {
            this.userRepository = userRepository;
        }
        public Task SayHello(string whatToSay)
        {
            //Extending Hub gives you access to the 'Clients' property
            //which represents all the clients connected to this particular socket.
            //You can now call methods on the front end by invoking them by the name they have been registered under
            //In this case, I registered a method under the name 'sendAll' that receives one parameter(string) as arguments
            return Clients.All.SendAsync("sendAll", userRepository.GetAll().Count + " hello world " + whatToSay);
        }
    }
}
