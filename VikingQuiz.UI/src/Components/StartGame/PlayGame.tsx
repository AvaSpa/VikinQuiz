import * as React from 'react';
import './PlayGame.css';
import HttpService from '../../services/HttpService';
import PlayerCodeDto from '../../entities/PlayerCodeDto';
import { Redirect } from 'react-router-dom';
import { connectRules } from '../../entities/Validation/rules';
import { connectValidator } from '../../entities/Validation/validators';
import PlayGameComponent from './PlayGameComponent/PlayGameComponent';
import SnackbarComponent from '../SnackbarComponent/SnackbarComponent';
import ISnackbarData from '../../entities/SnackBarData';
import { errorSnackbar } from '../../commons/commons';

class PlayGame extends React.Component<any, any> {
    private httpService: any = new HttpService();

    constructor(props: any) {
      super(props);

      this.state = {  
        serverMessage: '',
        redirect: false,
        playerId: null,
        showSnackbar: false,
        snackbarData: errorSnackbar
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
            this.errorHandler(error);
        });
    }
    
      public showSnackbarHandler = (snackbar: ISnackbarData) =>{
        this.setState({
            snackbarData: {...snackbar},
            showSnackbar: true
        })

        if(this.state.snackbarData.duration > 0){
            setTimeout(() => {
                this.setState({
                    showSnackbar: false
                });
            }, this.state.snackbarData.duration);
        }
    }

    public render() {
        const baseUrl = "http://localhost:60151/api";
        const endPoint = "/player";

        if (this.state.redirect) {
            return (
                <Redirect to={{ pathname: '/connect', state: { id: this.state.playerId } }} />
            )
        }
    
        return <div className="container play-game-container">
            <div className="row">
              <div className="center-container">
                <div className="col-sm-auto">
                  <div className="form-container playgame">
                    <p className="form-error server-message">
                      {this.state.serverMessage}
                    </p>
                    <PlayGameComponent inputs={[
                            { id: "code", type: "text", label: "Enter your code/pin", errorMessage: "", name: "GameCode", value: "" }, 
                            { id: "name", type: "text", label: "Your Name", errorMessage: "", name: "PlayerName", value: "" }]} 
                        url={baseUrl + endPoint} 
                        buttonName="" 
                        onSubmit={this.playerDataHandler} 
                        validator={connectValidator} 
                        validationRules={connectRules} />
                  </div>
                </div>
              </div>
            </div>
            <SnackbarComponent data={this.state.snackbarData} show={this.state.showSnackbar} />
          </div>; 
    }

    private errorHandler(error: any){
        const snackbar: ISnackbarData = errorSnackbar;
        snackbar.message = "Invalid code, please try again";
        this.showSnackbarHandler(snackbar);
    }
}

export default PlayGame;