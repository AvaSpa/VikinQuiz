import * as React from 'react';
// import * as SignalR from '@aspnet/signalr';
import './ConnectGame.css';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import NotFoundPng from 'src/media/not-found.png';
import { Redirect } from 'react-router';
import SignarRSingleton from "src/hubSingleton";

interface IPlayerDTO {
   name: string,
   pictureUrl: string
}

interface IConnectGameState {
   player: IPlayerDTO,
   serverMessage: string,
   redirect: boolean
}

class ConnectGame extends React.Component<any, IConnectGameState> {
   private hubConnection: any = SignarRSingleton;
   constructor(props: any) {
      super(props);

      this.state = {
         serverMessage: '',
         redirect: false,
         player: { name: 'user', pictureUrl: NotFoundPng }
      }
   }

   public componentDidMount() {
      this.hubConnection.connection.on("GameStarted", this.startGame);
      this.hubConnection.connection.invoke("GetPlayerDetails").then( (response : any) => this.setState({ player: response }));
   }

   public render() {
      const mainMessage = "CONNECTED";
      const statusLabel = "WAITING FOR GAME TO START";
      if (this.state.redirect) {
         return (<Redirect push={true} to="/playeranswer" />);
      }
      return (
         <div className="container connect-game-container">
            <div className="row">
               <div className="center-container">
                  <div className="col-sm-auto">
                     <label className="connectgame-main-label">{mainMessage}</label>
                  </div>
                  <div className="connectgame-players-container">
                     <UserMinimalProfile name={this.state.player.name} photo={this.state.player.pictureUrl} />
                  </div>
                  <div className="col-sm-auto">
                     <label className="connectgame-status-label">{statusLabel}</label>
                  </div>
                  <div className="spinner">
                     <div className="bounce1" />
                     <div className="bounce2" />
                     <div className="bounce3" />
                  </div>
               </div>
            </div>
         </div>
      );
   }
   private startGame = () => this.setState({ redirect: true });
}

export default ConnectGame;