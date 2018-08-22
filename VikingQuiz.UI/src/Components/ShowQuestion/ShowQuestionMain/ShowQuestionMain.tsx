import * as React from 'react';
import './ShowQuestionMain.css'
import AnswerComponent from '../../AnswerComponent/AnswerComponent';
import NextButton from '../../Buttons/NextButton/NextButton';

class ShowQuestionMain extends React.Component<any, any>{

    public renderAnswers(answers: any[]) {
        return answers.map((answer: any, index: number) =>
            <AnswerComponent key={answer.id} classes={(index % 2 === 0) ? ['left'] : ['right']} pictureUrl={answer.pictureUrl} answer={answer.text} />
        );
    }

    public renderCorrectAnswer(answers: any, correctAnswerId: number) {
        const correctAnswer: any = answers.find((answer: any) => answer.id === correctAnswerId);
        return (
            <>
                <img className='answer-image' src={correctAnswer.pictureUrl} alt='correct answer' />
                <div className='answer-text'>{correctAnswer.text}</div>
                <NextButton clicked={this.clickNextHandler} />
            </>
        )
    }

    public render() {
        return (
            <div className='show-main'>
                <div className='question-text'><span className='number'>{this.props.questionNumber}. </span>{this.props.questionText}</div>
                {
                    !this.props.showCorrectAnswer ?
                        <div className='answers'>
                            {this.renderAnswers(this.props.answers)}
                        </div> :
                        <div className='correct-answer'>
                            {this.renderCorrectAnswer(this.props.answers, this.props.correctId)}
                        </div>
                }
            </div>
        )
    }

    private clickNextHandler = () => {
        console.log('Next Button Clicked!');
        // make requst to change qustion
        this.props.next();
    }
}

export default ShowQuestionMain;
