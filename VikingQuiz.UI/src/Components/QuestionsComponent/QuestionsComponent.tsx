import * as React from 'react';
import './QuestionsComponent.css';
import MainQuestionComponent from './MainQuestionComponent/MainQuestionComponent';
import QuestionsListComponent from './QuestionsListComponent/QuestionsListComponent';

interface IProps {
    quizId: number
}

interface IState {
    quizId: number
}

class QuestionsComponent extends React.Component<IProps, IState>{

    public state = {
        quizId: this.props.quizId
    }

    public render(){
        return (
            <div className="questions-container">
                <MainQuestionComponent />
                <QuestionsListComponent />
            </div>
        )
    }
}

export default QuestionsComponent;