import * as SignalR from "@aspnet/signalr";


const SignalRSingleton = {
    connection : SignalR.HubConnection
};

export default SignalRSingleton;

