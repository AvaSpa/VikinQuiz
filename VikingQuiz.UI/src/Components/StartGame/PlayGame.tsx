import * as React from 'react';
import * as SignalR from '@aspnet/signalr';
import './PlayGame.css';
import HttpService from '../../services/HttpService';
import { Redirect } from 'react-router-dom';
import { connectRules } from '../../entities/Validation/rules';
import { connectValidator } from '../../entities/Validation/validators';
import PlayGameComponent from './PlayGameComponent/PlayGameComponent';
import SnackbarComponent from '../SnackbarComponent/SnackbarComponent';
import ISnackbarData from '../../entities/SnackBarData';
import { errorSnackbar } from '../../commons/commons';
import { apiUrl } from '../../constants';

class PlayGame extends React.Component<any, any> {
    private httpService: any = new HttpService();
    private readonly baseUrl = "http://localhost:60151/api";
    private readonly endPoint = "/player";

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
        if (!url || !formData) {
            return;
        }

        const uploadUrl = apiUrl + 'api/player/upload';
        const formFile = new FormData();

        formFile.append('files', formData.image);
        this.httpService.post(uploadUrl, formFile)
            .then((response: any) => { this.registerUser(formData.PlayerName, response.data, formData.GameCode) });
    }

    public registerUser = (playerName: string, pictureUrl: string, gameCode: string) => {
        const hubConnection = new SignalR.HubConnectionBuilder().withUrl("http://localhost:60151/gamemaster").build();
        hubConnection.start()
        .then(()=>{
            hubConnection.invoke("ConnectToGame", gameCode, playerName, pictureUrl)
            .then((responseId)=>this.setState({redirect: true, playerId: responseId}))
        })
        .catch((error)=>console.log(error))
    }

    public showSnackbarHandler = (snackbar: ISnackbarData) => {
        this.setState({
            snackbarData: { ...snackbar },
            showSnackbar: true
        })

        if (this.state.snackbarData.duration > 0) {
            setTimeout(() => {
                this.setState({
                    showSnackbar: false
                });
            }, this.state.snackbarData.duration);
        }
    }

    public render() {
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
                                url={this.baseUrl + this.endPoint}
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

    // private errorHandler(error: any) {
    //     const snackbar: ISnackbarData = errorSnackbar;
    //     snackbar.message = "Invalid code, please try again";
    //     this.showSnackbarHandler(snackbar);
    // }
}

export default PlayGame;