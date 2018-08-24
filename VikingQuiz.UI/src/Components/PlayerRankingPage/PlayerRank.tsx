import * as React from 'react';
import './PlayerRank.css';
// import * as SignalR from '@aspnet/signalr'
import SignalRSingleton from "src/hubSingleton";


class PlayerRank extends React.Component<any, any> {
   private hubConnection: any = SignalRSingleton;

    constructor(props: any){
        super(props);

        this.state = {
            playerName: null,
            playerPictureUrl: null,
            playerPlace: null,
            numberOfPlayers: null
        }
    }

    public componentDidMount() {
      this.hubConnection.connection.invoke("GetPlayerWithRank").then( (Response : any) => this.getPlayerRankDto(Response) )
    }

    public render() {
        const role = "participant";
        const hardcodedName = "Veronika";
        const hardcodedHelmetPicture = "https://vignette.wikia.nocookie.net/clubpenguin/images/9/99/Solid_Gold_Viking_Helmet_clothing_icon_ID_1734.PNG/revision/latest?cb=20160228013022";
        const hardcodedPlayerPicture = "https://png.pngtree.com/element_origin_min_pic/16/10/29/3fcafedec46c93b1c2fc2dbc98a4c71d.jpg";
        const placeOutOf = this.state.playerPlace + " out of " + this.state.numberOfPlayers;
        const message = "congratulations!";

        return (
                <div className="container-fluid player-rank-container">
                    <div className="row">
                        <div className="col-xs-1">
                            <div className="participant-label">{role}</div>
                        </div>
                        <div className="col-xs-1">
                            <div className="participant-name-label">{hardcodedName}</div>
                        </div>
                    </div>
                    <div className="row">
                        <img className="prize-helmet" src={hardcodedHelmetPicture}/>
                    </div>
                    <div className="row">
                        <img className="player-profile" src={hardcodedPlayerPicture}/>
                    </div>
                    <div className="row">
                        <div className="place-out-of"> 
                            {placeOutOf}
                        </div>
                    </div>
                    <div className="row">
                        <div className="message">
                            {message}
                        </div>
                    </div>
                </div>
            );
    }

    private getPlayerRankDto = (playerRank: any) => {
        this.setState({
            playerName: playerRank.name,
            playerPictureUrl: playerRank.pictureUrl,
            playerPlace: playerRank.rank,
            numberOfPlayers: playerRank.numberOfPlayers
        });
    }

}

export default PlayerRank;