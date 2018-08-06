import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import axios from '../../../node_modules/axios';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import CancelButton from '../Buttons/CancelButton/CancelButton';
import StartButton from '../Buttons/StartButton/StartButton';

class StartGame extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            player: [],
            currentPlayerNumber: 0
        }
    }

    public componentWillMount() {
        axios.get('http:///localhost:60151/api/player')
        .then(response => {
            console.log(response.data)
            this.setState({player: response.data})
        })
        .catch(err => console.log(err))
    }

    public getFirstListOfPlayers() {
        const firstListOfPlayers = [];
        for( let i = 0; i < 7; i++){
            firstListOfPlayers[i] = this.state.player[i];
        }
        return firstListOfPlayers;
    }

    public getSecondListOfPlayers() {
        const secondListOfPlayers = [];
        for( let i = 7; i < this.state.player.length; i++){
            secondListOfPlayers[i-7] = this.state.player[i];
        }
        return secondListOfPlayers;
    }

    
    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = "code";
        let firstListOfPlayers = [];
        let secondListOfPlayers = [];
        if (this.state.player.length > 7){
            firstListOfPlayers = this.getFirstListOfPlayers();
            secondListOfPlayers = this.getSecondListOfPlayers();
        }
        else{
            firstListOfPlayers = this.state.player;
        }
        return (
            <div className="container">
                <div className="center-container">
                    <div className="row">
                        <div className="center-container">
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
                                {firstListOfPlayers.map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                            </div>
                            <div className="players-container">
                                {secondListOfPlayers.map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                            </div>
                        </div>
                        <div className="center-container">
                            <StartButton/>
                        </div>
                    </div>
                </div>                        
                <CancelButton/>
            </div>
        ); 
      }
}

export default StartGame;