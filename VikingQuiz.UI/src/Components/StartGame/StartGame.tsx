import * as React from 'react';
import './StartGame.css';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import BottomLogo from '../BottomLogo/BottomLogo';

class StartGame extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
    }



    public render() {
        const displayedMessage = "YOUR CODE";
        const randomstring = require("randomstring");
        const code = randomstring.generate({
            length: 6,
            charset: 'abcdefghijklmnopqrstuvwxyz0123456789'
        });
        return (
            <div className="codeForm">
                <div className="container">
                    <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                            <HomeButton/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                            <div className="code-label"> {displayedMessage} </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                            <div className="code"> {code} </div>
                        </div>
                    </div>
                </div>
                <footer id="footer"><BottomLogo /></footer>  
            </div>
        ); 
      }
}

export default StartGame;