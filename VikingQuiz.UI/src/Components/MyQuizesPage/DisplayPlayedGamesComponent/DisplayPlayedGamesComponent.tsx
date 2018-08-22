import * as React from 'react';
import './DisplayPlayedGamesComponent.css'
import HttpService from '../../../services/HttpService';

interface IState {
    games: any[]
    gameData: IGameData[],
    noGamesPlayed: boolean,
    sortedGameDataByDate: any[]
}

interface IGameData {
    numberOfPlayers: number,
    gameDate: string,
    quizTitle: string,
    quizPhoto: string
}

class DisplayPlayedGamesComponent extends React.Component<any, IState>{
    
    private readonly apiAddressForGames = 'http://localhost:60151/api/game/usergames';
    private readonly apiAdressForPlayerGame = 'http://localhost:60151/api/playergame/playersnumber/';
    private readonly apiAddressForQuizzes = 'http:///localhost:60151/api/quizzes/';
    private httpService: HttpService = new HttpService();

    constructor(props: any) {
        super(props);

        this.state = {
            games: [],
            gameData: [],
            noGamesPlayed: true,
            sortedGameDataByDate: []
        }

        this.SetupHandlers();
    }

    public SetupHandlers = () => {
        this.updatePlayedGamesListOnQuizDelete = this.updatePlayedGamesListOnQuizDelete.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
        this.sortPlayedGamesByDate = this.sortPlayedGamesByDate.bind(this);
        this.getPlayedGames = this.getPlayedGames.bind(this)
    }

    public componentWillMount(){   
        this.getPlayedGames()
        this.sortPlayedGamesByDate()
    }

    public getPlayedGames(){
        this.httpService.getWithToken(this.apiAddressForGames)
        .then((response: any) => {
            this.setState({ games: response.data }) 
            response.data.forEach((game: any) => {
                let gameNumberOfPlayers:any;
                let quizDetails: any;                   
                this.httpService.getWithToken(this.apiAdressForPlayerGame + game.id) 
                    .then((result: any) => {
                        gameNumberOfPlayers = result.data   
                        const gameDataCopy = this.state.gameData;
                        this.httpService.getWithToken(this.apiAddressForQuizzes + game.quizId)
                            .then((res: any) => {
                                quizDetails = res.data                                                 
                                gameDataCopy.push({
                                    numberOfPlayers: gameNumberOfPlayers,
                                    gameDate: game.gameDate,
                                    quizTitle: quizDetails.title,
                                    quizPhoto: quizDetails.pictureUrl
                                    })     
                                    this.setState({
                                        gameData: gameDataCopy,
                                        noGamesPlayed: false
                                    })     
                                    this.sortPlayedGamesByDate();                                                                                          
                            });  
                    })
            })
        })
        .catch((error: any) => console.log(error))  
    }

    public sortPlayedGamesByDate()
    {
        this.setState({
            sortedGameDataByDate : this.state.gameData
                .sort((a: any, b: any) => a.gameDate.split('/').join()
                .localeCompare(b.gameDate.split('/').join()))
        })
    }
       
    public updatePlayedGamesListOnQuizDelete(){
        this.setState({
            gameData: [],
            noGamesPlayed: true 
        })
        this.componentWillMount()
    }


    public render(){     
        if(this.state.noGamesPlayed)
        {
            return(null)
        }
        return(
            <div className="display-played-games-container">
                <div className="played-quizzes-header">
                    PLAYED QUIZZES
                </div>
                <div className="played-games-container">
                    {this.state.sortedGameDataByDate.reverse().slice(0, 5).map((p: any) =>
                        <div className="played-game-item" key={p.id}>
                            <div className="played-game-details">
                                <div className="played-game-photo">
                                    <img className="played-quiz-photo" src={p.quizPhoto} />
                                </div>
                                <div className="played-game-informations">
                                    <div className="number-of-players-container">
                                        <div className="player-icon" />
                                        <div className="players-number"> 
                                            {p.numberOfPlayers}                          
                                        </div>                                       
                                    </div>
                                    <div className="game-date-container">
                                        <div className="calendar-icon" />
                                        <div className="game-date">
                                            {p.gameDate}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="played-quiz-title">
                                {p.quizTitle}
                            </div>
                        </div>
                    )}         
                </div>
            </div>
        );
    } 
}

export default DisplayPlayedGamesComponent;