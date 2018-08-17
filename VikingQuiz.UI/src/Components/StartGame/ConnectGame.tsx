import * as React from 'react';
import './ConnectGame.css';
import axios from 'node_modules/axios';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';

class ConnectGame extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            player: null,
            baseUrl: "http:///localhost:60151/api/player/",
            showplayer: false
        }
    }

    
    public componentDidMount() {
        axios.get(this.state.baseUrl + this.props.location.state.id)
        .then(response => {
            console.log(response.data);
            this.setState({player: response.data, showplayer: true})
        })
        .catch(err => console.log("cat"))
        window.setTimeout(()=>{console.log(this.state.player)}, 5000);
    }


    public render() {
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
                               {this.state.showplayer? (<UserMinimalProfile key={this.state.player.name} name={this.state.player.name} photo={this.state.player.pictureUrl} />) : null}
                            </div>
                            <div className="col-sm-auto">
                                <label className="connectgame-status-label">{statusLabel}</label>
                            </div>
                            <div className="spinner">
                                <div className="bounce1"/>
                                <div className="bounce2"/>
                                <div className="bounce3"/>
                            </div>
                        </div>
                    </div>         
            </div>
        ); 
      }
}

export default ConnectGame;