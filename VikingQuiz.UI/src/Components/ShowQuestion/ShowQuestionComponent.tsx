import * as React from 'react';
import './ShowQuestionComponent.css';
import ShowQuestionFooter from './ShowQuestionFooter/ShowQuestionFooter';
import ShowQuestionHeader from './ShowQuestionHeader/ShowQuestionHeader';
import ShowQuestionMain from './ShowQuestionMain/ShowQuestionMain';
// import * as SignalR from '@aspnet/signalr'

const QUIZ_URL: string = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640';
const QUIZ_NAME: string = 'Quiz Title';
class ShowQuestionComponent extends React.Component<any, any>{

    
    public state = {
        timer: 20,
        showCorrectAnswer: false,
        question: {
            number: 3,
            text: 'Where is my precious?'
        }
    }

    // private hubConnection: SignalR.HubConnection = new SignalR.HubConnectionBuilder().withUrl('http://localhost:60151/hello').build();
    

    public componentWillMount(){

        // this.hubConnection.on('GetCurrentQestion', this.foo);

        // this.hubConnection.start()
        // .then(()=>console.log('SignalR connected successfully'))
        // .catch(()=>console.log('SignalR failed to connect'));
        // this.hubConnection.invoke('GetCurrentQuestion').then();
        setTimeout(() => {
            this.setState({
                timer: -1,
                showCorrectAnswer: true
            })
        }, 5000)
    }

    public nextQuestionHandler = () => {
        // this.hubConnection.invoke('GetCurrentQuestion');
        this.setState({
            timer: 20,
            showCorrectAnswer: false
        })
        setTimeout(() => {
            this.setState({
                timer: -1,
                showCorrectAnswer: true
            })
        }, 3000);
    }

    public timeout = () => {
        console.log('Time is Over');

        // make request for timeout here
        this.setState({
            timer: 20,
            showCorrectAnswer: false
        })
    }

    public render(){
        return (
            <div className='show-question'>
                <header className='header'>
                    <ShowQuestionHeader timer={this.state.timer} timeout={this.timeout} quizName={QUIZ_NAME} quizPicture={QUIZ_URL}/>
                </header>
                <main className='main'>
                    <ShowQuestionMain answers={[{id: 1, text: 'True', pictureUrl: 'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/1.png'},
                                                {id: 2, text: 'False', pictureUrl: 'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/2.png'},
                                                {id: 3, text: 'Very False', pictureUrl: 'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/3.png'},
                                                {id: 4, text: 'More Than False', pictureUrl: 'https://intershipwirtekblob.blob.core.windows.net/answer-pictures/4.png'}]}
                                      correctId={1}
                                      showCorrectAnswer={this.state.showCorrectAnswer}
                                      questionNumber={this.state.question.number}
                                      questionText={this.state.question.text}
                                      next={this.nextQuestionHandler}/>
                </main>
                <footer className='footer'>
                    <ShowQuestionFooter />
                </footer>
            </div>
        )
    }
}

export default ShowQuestionComponent;