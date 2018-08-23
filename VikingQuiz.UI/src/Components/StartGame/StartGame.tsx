import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import CancelButton from '../Buttons/CancelButton/CancelButton';
import StartButton from '../Buttons/StartButton/StartButton';
import * as SignalR from '@aspnet/signalr'
import PlayerDto from '../../entities/PlayerDto';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import { Redirect } from 'react-router-dom';
import {apiUrl} from "src/constants";

class StartGame extends React.Component<any, any> {
    private hubConnection: SignalR.HubConnection;
    
    constructor(props: any) {
      super(props);

      this.state = {
          redirect: false,
          quizId: this.props.location.state.id,
          code: null,
          players: []
      }
    }

    public componentDidMount() {
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
    }

    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = this.state.code;
        if(this.state.redirect){
            return (<Redirect push={true} to={"/show-question/" + this.state.code} />);        }
        return (
            <div className="startgame-container container">
                <div className="startgame-center-container">
                    <div className="row">
                        <div className="startgame-center-container">
                            <div className="col-sm-auto">
                                <HomeButton/>
                            </div>
                            <div className="col-sm-auto">
                                <div className="code-label"> {displayedMessage} </div>
                            </div>
                            <div className="col-sm-auto">
                                <div className="code"> {displayedCode} </div>
                            </div>
                            <div className="players-container">
                                {this.state.players.map((p:any) => 
                                    <UserMinimalProfile key={p.name} photo={p.pictureUrl} name={p.name} />
                                )}
                            </div>
                        </div>
                        <div className="startgame-center-container">
                            <StartButton clicked = {this.startGameHandler}/>
                        </div>
                    </div>
                </div>                        
                <CancelButton/>
            </div>
        ); 
    }

    private startGameHandler = () => {
        this.hubConnection.invoke("BeginGame", this.state.code);
        this.setState({
            redirect: true
        })
    }

    private getPlayer = (name: string, pictureUrl: string) => {
        console.log(name, pictureUrl);
        const playersUpdated : PlayerDto[] = this.state.players;
        const newPlayer : PlayerDto  = new PlayerDto(pictureUrl, name);
        playersUpdated.push(newPlayer);
        this.setState({ players: playersUpdated })
    }

}

export default StartGame;