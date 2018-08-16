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
            baseUrl : "http:///localhost:60151/api/",
            endPoint: "player",
            playersPerLine: 7
        }
    }
    
    public componentWillMount() {
        axios.get(this.state.baseUrl+this.state.endPoint)
        .then(response => {
            console.log(response.data)
            this.setState({player: response.data})
        })
        .catch(err => console.log(err))
    }

    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = "code";
        return (
            <div className="container">
                    <div className="row">
                        <div className="center-container">
                            <div className="col-auto">
                                <HomeButton/>
                            </div>
                            <div className="col-auto">
                                <div className="code-label"> {displayedMessage} </div>
                                <div className="code"> {displayedCode} </div>
                            </div>
                            <div className="startgame-center-container">
                            <div className="players-container">
                                {this.state.player.slice(this.state.playersPerLine, this.state.player.length).map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                                {this.state.player.slice(0,this.state.playersPerLine).map((p:any) =>
                                    <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                                )}
                            </div>
                        </div>
                        <StartButton/>
                    </div>
                </div> 
                <CancelButton/>        
            </div>
        ); 
      }
}

export default StartGame;