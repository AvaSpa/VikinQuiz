import * as React from 'react';
import './ShowQuestionComponent.css';
import ShowQuestionFooter from './ShowQuestionFooter/ShowQuestionFooter';
import ShowQuestionHeader from './ShowQuestionHeader/ShowQuestionHeader';
import ShowQuestionMain from './ShowQuestionMain/ShowQuestionMain';
import { Redirect } from "react-router-dom";
import * as SignalR from '@aspnet/signalr'
import { apiUrl } from '../../constants';

const QUIZ_URL: string = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640';
const QUIZ_NAME: string = 'Quiz Title';
const picturesUrls: string[] = [
    'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/1.png',
    'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/2.png',
    'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/3.png',
    'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/4.png'
]
class ShowQuestionComponent extends React.Component<any, any>{

	public readonly code = this.props.match.params.code;
	
    public state = {
        timer: 20,
        questionNumber: null,
        quizUrl: null,
        quizName: null,
        showCorrectAnswer: false,
        redirect: false,
        question: {
            id: null,
            text: null,
            correctAnswerId: null,
            answers: []
        }
    }

    private hubConnection: SignalR.HubConnection;


    public componentWillMount() {

        this.hubConnection = new SignalR.HubConnectionBuilder().withUrl(apiUrl + "gamemaster").build();

        this.hubConnection.start()
            .then(() => {
				this.hubConnection.on('EverybodyAnswered', this.endQuestion)
				this.hubConnection.on('GameIsOver', this.redirectToRankingPage);
                console.log('SignalR connected successfully')
                this.getCurrentQuestion();
            })
            .catch(() => console.log('SignalR failed to connect'));
        setTimeout(this.endQuestion,5000);
    }

    public getCurrentQuestion = () => {
		this.hubConnection.invoke('GetCurrentQuestion', this.code).then((res: any) => {
            this.setState({
                question: res
            })
        });
    }

    public nextQuestionHandler = () => {
        this.hubConnection.invoke('GoToNextQuestion', this.code).then((areThereMoreQuestions: any) => {
			if(areThereMoreQuestions) {
				this.getCurrentQuestion();
			}
			else {
				this.redirectToRankingPage();
			}
        });
        this.setState({
            timer: 20,
            showCorrectAnswer: false
        })
    }

    public redirectToRankingPage = () => {
		console.log("redirectToRanking");
        this.setState({
            redirect: true
        })
    }

    public timeoutHandler = () => {
        this.hubConnection.invoke('GoToNextQuestion');
        this.setState({
            timer: -1,
            showCorrectAnswer: true
        })
    }

    public render() {
        
        const newAnswers: any[] = this.state.question.answers.map((answer: any, index: number) => {
            const newAnswer = { ...answer }
			newAnswer.pictureUrl = picturesUrls[index];
            return newAnswer;
		});
		console.log(newAnswers);
        if (this.state.redirect) {
			return <Redirect push={true} to={"/rankingPage/" + this.code} />;
        }
        return (
            <div className='show-question'>
                <header className='header'>
                    <ShowQuestionHeader timer={this.state.timer} timeout={this.timeoutHandler} quizName={QUIZ_NAME} quizPicture={QUIZ_URL} />
                </header>
                <main className='main'>
                    <ShowQuestionMain answers={newAnswers}
                        correctId={this.state.question.correctAnswerId}
                        showCorrectAnswer={this.state.showCorrectAnswer}
                        questionNumber={this.state.questionNumber}
                        questionText={this.state.question.text}
                        next={this.nextQuestionHandler} />
                </main>
                <footer className='footer'>
                    <ShowQuestionFooter />
                </footer>
            </div>
        )
    }

    private endQuestion = () => {
        this.setState({
            timer: -1,
            showCorrectAnswer: true
        })
    }
}

export default ShowQuestionComponent;