import * as React from 'react';
import './Answer.css';
import * as SignalR from '@aspnet/signalr';
import { Redirect} from 'react-router-dom';


const MapStringToNumbers={
    unu: 1,
    doi: 2,
    trei: 3,
    patru: 4
} 

const MapNumberToString={
    1: "unu",
    2: "doi",
    3: "trei",
    4: "patru"
} 


class Answer extends React.Component<any, any> {

    private hubConnection: SignalR.HubConnection;
    private startTimer = Date.now();

    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            chosenAnswerExists: false,
            chosenAnswerId: null,
            correctAnswerId: null,
            answerMessage: null,
            answerMessageFontColor: null,
        }

        this.setupHandlers();
    }

    public setupHandlers(){
        this.handleUserSelection = this.handleUserSelection.bind(this);
        this.proceedToNextAnswers = this.proceedToNextAnswers.bind(this);
        this.handleGameIsOver = this.handleGameIsOver.bind(this);
    }

    public componentDidMount()
    {
        this.hubConnection = new SignalR.HubConnectionBuilder().withUrl("http://localhost:60151/gamemaster").build();
        this.hubConnection.on('SendCorrectAnswerId', this.handleTimeExpires);
        this.hubConnection.on('ProceedToNextAnswers', this.proceedToNextAnswers);
        this.hubConnection.on('GameIsOver', this.handleGameIsOver);
        this.hubConnection.start()
            .then(()=>console.log('SignalR connected successfully'))
            .catch(()=>console.log('SignalR failed to connect'));
    }

    public componentDidUpdate(){
        this.startTimer = Date.now();
    }

    public proceedToNextAnswers(){
        this.forceUpdate();
    }

    public handleGameIsOver(){
        this.setState({redirect: true})
    }

    public handleTimeExpires=(id: number)=>{
        
        const timerIsOver = 20;
        const noAnswerWasSelected = -1;
        this.hubConnection.invoke('PlayerAnsweredQuestion', noAnswerWasSelected, timerIsOver);

        const idConvertedToString = MapNumberToString[id]
        this.setState({correctAnswerId: idConvertedToString})

        const answerButton = document.getElementById(this.state.chosenAnswerId);
        if(answerButton !== null)
        {
            answerButton.style.border = "3px solid red";         
        }

        const correctAnswerButton = document.getElementById(this.state.correctAnswerId);
        if(correctAnswerButton !== null)
        {
            correctAnswerButton.style.border = "3px solid green";               
        }
        
        if(this.state.correctAnswerId === this.state.chosenAnswerId)
        {
            this.setState({answerMessage: 'RIGHT!', answerMessageFontColor: 'correct_answer_message'});
        }
        if((this.state.chosenAnswerId !== null) && (this.state.correctAnswerId !== this.state.chosenAnswerId))
        {
            this.setState({answerMessage: 'WRONG!', answerMessageFontColor: 'wrong_answer_message'});
        }
    }

    public handleUserSelection(id: any){
        const answerButton = document.getElementById(id);

        if( answerButton !== null)
        {
            answerButton.style.border = "3px solid #f0cc04";
        }

        const totalTime = (Date.now() - this.startTimer) / 1000
        this.setState({chosenAnswerExists: true, chosenAnswerId: id})
        const chosenAnswerIdAsInt = MapStringToNumbers[id]
        this.hubConnection.invoke('PlayerAnsweredQuestion', chosenAnswerIdAsInt, totalTime)
    }

    public render(): any {
        
        if(this.state.redirect){  
            return (
                <Redirect
                    push={true}
                    to={{pathname: '/playerranking'}}
                />
            )}

        let blockScreen;

        if(!this.state.chosenAnswerExists){
            blockScreen = null 
        } else {
            blockScreen =  <div className='block-screen'/>      
        }      

        return(
            <>
                {blockScreen}
                <div className='answers-container'>
                        <button id="unu" className='answer-photo' onClick={this.handleUserSelection.bind(this, "unu")}/>
                        <button id="doi" className='answer-photo' onClick={this.handleUserSelection.bind(this, "doi")}/>
                        <button id="trei" className='answer-photo' onClick={this.handleUserSelection.bind(this, "trei")}/>
                        <button id="patru" className='answer-photo' onClick={this.handleUserSelection.bind(this, "patru")}/>                 
                </div>
                <div className={this.state.answerMessageFontColor}>
                    {this.state.answerMessage}
                </div>
            </>
        )
    }
}

export default Answer;