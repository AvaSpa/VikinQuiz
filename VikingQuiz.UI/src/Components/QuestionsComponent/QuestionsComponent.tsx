import * as React from 'react';
import './QuestionsComponent.css';

interface IProps {
    editMode: boolean,
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
                <h1>Questions come here</h1>
            </div>
        )
    }
}

export default QuestionsComponent;