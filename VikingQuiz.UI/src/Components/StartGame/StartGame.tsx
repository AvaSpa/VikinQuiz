import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import CancelButton from '../Buttons/CancelButton/CancelButton';
import StartButton from '../Buttons/StartButton/StartButton';
import axios from '../../../node_modules/axios';
import GameDto from '../../entities/GameDto';
import HttpService from '../../services/HttpService';

class StartGame extends React.Component<any, any> {
    private httpService: any = new HttpService();
    
    constructor(props: any) {
      super(props);

        this.state = {
            serverMessage: '',
            gameId: null,
            player: [],
            baseUrl : "http://localhost:60151/api",
            playerGameEndPoint: "/playergame/current/",
            gameEndPoint: "/game",
            playersPerLine: 7,
            code: null
        }
    }

    public componentWillMount() {
        this.createGame();
    }

    public gameDataHandler = (url: string) => {
        if(!url){
            return;
        }

        const component: any = this;

        const quizId = this.props.location.state.id;
        const date = this.getDate();

        const body: GameDto = new GameDto(quizId, date, "");

        this.httpService.post(url, body)
        .then((res: any) => {
            component.setState({
                gameId: res.data.id,
                code: res.data.code
            });  
            this.getPlayersOfGame();      
        })
        .catch((error: any) => {
            if(!error){
                component.setState({
                    serverMessage: "Couldn't create game"
                });
                return;
            };
            component.setState({
                serverMessage: error.response.data
            });
            setTimeout(()=>component.setState({
                serverMessage: ''
            }), 5000);  
        });
    }

    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = this.state.code;
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
                                {this.state.player.slice(this.state.playersPerLine, this.state.player.length).map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                                {this.state.player.slice(0,this.state.playersPerLine).map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                            </div>
                        </div>
                        <div className="startgame-center-container">
                            <StartButton/>
                        </div>
                    </div>
                </div>                        
                <CancelButton/>
            </div>
        ); 
    }

    private getDate(){
        const currentDate = new Date();
        const date = currentDate.getFullYear() + "-" + currentDate.getMonth() + "-" + currentDate.getDay();
        return date;
    }

    private createGame(){
        this.gameDataHandler(this.state.baseUrl + this.state.gameEndPoint);
    }

    private getPlayersOfGame(){
        axios.get(this.state.baseUrl+this.state.playerGameEndPoint+this.state.gameId)
        .then(response => {
            console.log(response.data)
            this.setState({player: response.data})
        })
        .catch(err => console.log(err));
    }
}

export default StartGame;