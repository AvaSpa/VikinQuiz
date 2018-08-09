import * as React from 'react';
import './PlayGame.css';
import HttpService from '../../services/HttpService';
import InputData from '../../entities/InputData';
import PlayGameComponent from './PlayGameComponent';
import PlayerCodeDto from '../../entities/PlayerCodeDto';
import { Redirect } from 'react-router-dom';

class PlayGame extends React.Component<any, any> {
    private httpService: any = new HttpService();

    constructor(props: any) {
      super(props);

      this.state = {  
        serverMessage: '',
        redirect: false
        };
    }
    
    public playerDataHandler = (url: string, formData: any) => {
        if(!url || !formData){
            return;
        }

        const comp: any = this;
    
        const body: PlayerCodeDto = new PlayerCodeDto('', formData.PlayerName, formData.GameCode);
    
        console.log(body);

        this.httpService.post(url, body)
        .then((res: any) => {
            console.log(res);
            comp.setState({
                redirect: true
            });
        })
        .catch((error: any) => {
            if(!error){
                comp.setState({
                    serverMessage: "Couldn't connect to the game"
                });
                return;
            };
            comp.setState({
                serverMessage: error.response.data
            });
            setTimeout(()=>comp.setState({
                serverMessage: ''
            }), 5000);  
        });
      }
    

    public render() {
        if(this.state.redirect){
            return (<Redirect push={true} to="/connect"/>);
        }
        return (
            <div className="container">
                    <div className="row">
                        <div className="center-container">
                            <div className="col-sm-auto">
                                <div className="form-container playgame">
                                    <p className="formerror server-message">{this.state.serverMessage}</p>
                                    <PlayGameComponent inputs={
                                    [
                                        new InputData('code', 'text', 'Enter your code/pin', '', 'GameCode', ''),
                                        new InputData('name', 'text', 'Your Name', '', 'PlayerName', ''),
                                    ]}
                                    url="http://localhost:60151/api/player"
                                    buttonName=""
                                    onSubmit={this.playerDataHandler}
                                    validator={null}
                                    validationRules={null}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>         
            </div>
        ); 
      }
}

export default PlayGame;