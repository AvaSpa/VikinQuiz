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
        redirect: false,
        playerId: null
        };
    }
    
    public playerDataHandler = (url: string, formData: any) => {
        
        if(!url || !formData){
            return;
        }

        const component: any = this;
    
        const body: PlayerCodeDto = new PlayerCodeDto('pictureurl', formData.PlayerName, formData.GameCode);
    
        this.httpService.post(url, body)
        .then((res: any) => {
            component.setState({
                redirect: true,
                playerId: res.data.id
            });
        })
        .catch((error: any) => {
            if(!error){
                component.setState({
                    serverMessage: "Couldn't connect to the game"
                });
                return;
            };
            component.setState({
                serverMessage: error.response.data
            });
            setTimeout(()=>component.setState({
                serverMessage: ''
            }), 5000);  
        });
      }
    

    public render() {
        const baseUrl = "http://localhost:60151/api";
        const endPoint = "/player";

        if (this.state.redirect) {
            return (
                <Redirect to={{ pathname: '/connect', state: { id: this.state.playerId } }} />
            )
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
                                    url={baseUrl + endPoint}
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