import * as React from 'react';
import './ShowQuestionComponent.css';
import ShowQuestionFooter from './ShowQuestionFooter/ShowQuestionFooter';
import ShowQuestionHeader from './ShowQuestionHeader/ShowQuestionHeader';
import ShowQuestionMain from './ShowQuestionMain/ShowQuestionMain';

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

    public componentWillMount(){
        setTimeout(() => {
            this.setState({
                timer: -1,
                showCorrectAnswer: true
            })
        }, 5000)
    }

    public timeout = () => {
        console.log('Time is Over');

        // make requext for timeout here
        this.setState({
            showCorrectAnswer: true
        })
    }

    public render(){
        return (
            <div className='show-question'>
                <header className='header'>
                    <ShowQuestionHeader timer={this.state.timer} timeout={this.timeout} quizName={QUIZ_NAME} quizPicture={QUIZ_URL}/>
                </header>
                <main className='main'>
                    <ShowQuestionMain answers={[{id: 1, text: 'True', pictureUrl: 'http://uploads.friendsresilience.org/wp-content/uploads/2017/01/23002444/Paula-Barrett-Thumbs-Up-Actions.jpg'},
                                                {id: 2, text: 'False', pictureUrl: 'https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg'},
                                                {id: 3, text: 'Very False', pictureUrl: 'https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg'},
                                                {id: 4, text: 'More Than False', pictureUrl: 'https://imgix.bustle.com/2017/2/23/19aaee7e-1295-472c-9edd-d55e4a790b0c.jpg'}]}
                                      correctId={1}
                                      showCorrectAnswer={this.state.showCorrectAnswer}
                                      questionNumber={this.state.question.number}
                                      questionText={this.state.question.text}/>
                </main>
                <footer className='footer'>
                    <ShowQuestionFooter />
                </footer>
            </div>
        )
    }
}

export default ShowQuestionComponent;