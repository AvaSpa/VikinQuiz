import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import axios from '../../../node_modules/axios';
import UserMinimalProfile from '../UserMinimalProfile/UserMinimalProfile';
import PlayButton from '../Buttons/PlayButton/PlayButton';

class StartGame extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            player: []
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

    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = "code";
        return (
            <div className="center-container">
                <div className="play-button">
                            <PlayButton/>
                        </div>
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
                            {this.state.player.map((p:any) =>
                                <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                            )}
                        </div>
                        <div className="players-container">
                            {this.state.player.map((p:any) =>
                                <UserMinimalProfile key={p.name} name={p.name} photo={p.pictureUrl} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        ); 
      }
}

export default StartGame;