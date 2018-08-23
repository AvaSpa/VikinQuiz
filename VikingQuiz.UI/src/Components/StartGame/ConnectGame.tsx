import * as React from 'react';
import './ConnectGame.css';
// import axios from 'node_modules/axios';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import {apiUrl} from "src/constants";
// import * as SignalR from "@aspnet/signalr";
import SignalRSingleton from "src/hubSingleton";
import axios from 'axios';
import {Redirect} from "react-router";



class ConnectGame extends React.Component<any, any> {
  public connectionSingleton : any = SignalRSingleton;

  constructor(props: any) {
    super(props);

    this.state = {
      serverMessage: "",
      redirect: false,
      player: null,
      baseUrl: apiUrl + "api/player/",
      showplayer: false
    };
  }

  /* 
                this.hubConnection = new SignalR.HubConnectionBuilder().withUrl(apiUrl + "gamemaster").build();

        this.hubConnection.start()
            .then(() => {
				this.hubConnection.on('EverybodyAnswered', this.endQuestion)
				this.hubConnection.on('GameIsOver', this.redirectToRankingPage);
                console.log('SignalR connected successfully')
                this.getCurrentQuestion();
            })
            .catch(() => console.log('SignalR failed to connect'));
        setTimeout(this.endQuestion,5000);
    */

  public gameStarted = () => {
    this.setState({
        redirect: true
    });
  };

  /* 
    
        this.hubConnection = new SignalR.HubConnectionBuilder().withUrl(apiUrl + 'gamemaster').build();


        this.hubConnection.start()
        .then(() => {
            this.hubConnection.on("NewPlayerHasConnected", this.getPlayer);
            this.hubConnection.invoke("CreateGame", this.state.quizId)
            .then( (Response : any) => {
                this.setState({ code: Response })
            })
        })
        .catch( ()=>console.log('SignalR failed to connect'));
    */
  public componentWillMount() {
      console.log(this.connectionSingleton, SignalRSingleton);
      this.connectionSingleton.connection.on("GameStarted", this.gameStarted);

    axios
      .get(this.state.baseUrl + this.props.location.state.id)
      .then(response => {
        console.log(response.data);
        this.setState({ player: response.data, showplayer: true });
      })
      .catch(err => console.log("cat"));
    window.setTimeout(() => {
      console.log(this.state.player);
    }, 5000);
  }

  public render() {
      if(this.state.redirect) {
         return  <Redirect
              to={"/playeranswer"}
          />
      }
    const mainMessage = "CONNECTED";
    const statusLabel = "WAITING FOR GAME TO START";
    return (
      <div className="container connect-game-container">
        <div className="row">
          <div className="center-container">
            <div className="col-sm-auto">
              <label className="connectgame-main-label">{mainMessage}</label>
            </div>
            <div className="connectgame-players-container">
              {this.state.showplayer ? (
                <UserMinimalProfile
                  key={this.state.player.name}
                  name={this.state.player.name}
                  photo={this.state.player.pictureUrl}
                />
              ) : null}
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
}

export default ConnectGame;