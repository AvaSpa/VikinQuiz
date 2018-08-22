import * as React from 'react';
import './AnswerComponent.css';

const answerComponent = (props: any) => {
    return (
        <div className={'answer-component ' + props.classes.join(' ')}>
            <img className='answer-picture' src={props.pictureUrl} alt="answer picture"/>
            <span className='answer-text'>{props.answer}</span>
        </div>
    )
}

export default answerComponent;