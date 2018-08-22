import * as React from 'react'
import * as SignalR from '@aspnet/signalr'

class SignalRComponent extends React.Component<any, any>{
    private hubConnection: SignalR.HubConnection;
    constructor(props: any) {
        super(props);
        this.state = {
            message: null,
            msg2: null
        };
    }

    // in the following example, we will call a method on the back end and pass it a message
    // then the back end will call a method on the front end with some extra stuff added to that message
    // this very much resembles a normal Http method call (like GET or POST)
    // when using websockets you should not expect a response from the callee
    public componentDidMount() {
        // this is how you connect to a socket
        // you may connect to multiple sockets by chaining '.withUrl' one after the other
        this.hubConnection = new SignalR.HubConnectionBuilder().withUrl('http://localhost:60151/hello').withUrl('http://localhost:60151/controller').build();

        // this is how you register a method
        // the first argument is the name we want to register it under
        // the second argument is the method to be called when that name has been invoked
        this.hubConnection.on('sendAll', this.foo);
        // once you're all set up you'll have to start the connection
        // you can also call a function when succeeding
        // !IMPORTANT! you should catch error in a more graceful way
        // say, for example, the server is down; then the following will generate a nasty error for the end user
        this.hubConnection.start()
        .then(()=>console.log('SignalR connected successfully'))
        .catch(()=>console.log('SignalR failed to connect'));

        // you'll have to wait a bit for signalr to start the connection
        setTimeout(() => {
            // invoke returns a promise that resolves when the server finished invoking the method
            this.hubConnection.invoke('SayHello', 'ana are mere');
            this.hubConnection.invoke('CreateGame', 1).then((response)=>{this.setState({msg2: response})});
            // send returns a promise that is resolved when the client has sent the invocation to the server
            // the server may still be handling the invocation when the promise resolves
            // don't know what all that means. Just use .invoke
            // this.hubConnection.send('SayHello');
        }, 2000);


    }

    public render() {
        return (
            <>
            <div>{this.state.message}</div>
            <div>{this.state.msg2}</div>
            </>
        );
    }

    private foo = (msg: string) => {
        this.setState({ message: msg });
    }
}

export default SignalRComponent;