import * as React from 'react';
import './ConnectGame.css';
// import axios from '../../../node_modules/axios';
// import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';

class ConnectGame extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
            serverMessage: '',
            redirect: false,
            player: [],
            // baseUrl : "http:///localhost:60151/api/",
            // endPoint: "player/",
            // playerId: 3
        }
    }

    
    // public componentWillMount() {
    //     axios.get(this.state.baseUrl + this.state.endPoint + this.state.playerId)
    //     .then(response => {
    //         console.log(response.data)
    //         this.setState({player: response.data})
    //     })
    //     .catch(err => console.log(err))
    // }


    public render() {
        const mainMessage = "CONNECTED";
        const statusLabel = "WAITING FOR GAME TO START...";
        return (
            <div className="container">
                    <div className="row">
                        <div className="center-container">
                            <div className="col-sm-auto">
                                <label className="connectgame-main-label">{mainMessage}</label>
                            </div>
                            {/* <div className="connectgame-players-container">
                                {this.state.player.map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                            </div> */}
                            <div className="col-sm-auto">
                                <label className="connectgame-status-label">{statusLabel}</label>
                            </div>
                        </div>
                    </div>         
            </div>
        ); 
      }
}

export default ConnectGame;