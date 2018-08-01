import * as React from 'react';
import './QuizComponent.css';
import StartQuizComponent from './StartQuizComponent/StartQuizComponent';

class QuizComponent extends React.Component {
    public render(){
        return (
            <div className="quiz container">
                <StartQuizComponent editMode={false} />
            </div>
        )
    }
}

export default QuizComponent;