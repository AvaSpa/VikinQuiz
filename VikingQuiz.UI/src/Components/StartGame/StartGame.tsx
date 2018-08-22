import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import CancelButton from '../Buttons/CancelButton/CancelButton';
import StartButton from '../Buttons/StartButton/StartButton';

class StartGame extends React.Component<any, any> {
    
    constructor(props: any) {
      super(props);
    }

    public render() {
        const displayedMessage = "YOUR CODE";
        const displayedCode = this.props.location.state.code;
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
                            <div className="players-container"/>
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
}

export default StartGame;