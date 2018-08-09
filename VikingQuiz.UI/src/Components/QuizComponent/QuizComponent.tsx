import * as React from 'react';
import './QuizComponent.css';
import StartQuizComponent from './StartQuizComponent/StartQuizComponent';
import QuestionsComponent from '../QuestionsComponent/QuestionsComponent';


interface IProps {
    id: number,
    editMode: boolean
}

interface IState {
    id: number,
    editMode: boolean
    showQuestions: boolean
}


class QuizComponent extends React.Component<IProps, IState> {

    public state = {
        id: this.props.id,
        editMode: this.props.editMode,
        showQuestions: false
    }

    

    public saveQuizHandler = (quizId: number) => {
        console.log(quizId);
        this.setState({
            id: quizId,
            showQuestions: true
        });
    }

    public render(){
        return (
            <div className="quiz container">
                <StartQuizComponent editMode={this.state.editMode} quizId={this.state.id} save={this.saveQuizHandler}/>
                {this.state.showQuestions ? 
                 <QuestionsComponent quizId={this.state.id} /> : <QuestionsComponent quizId={this.state.id} />
                }
            </div>
            
        )
    }
}

export default QuizComponent;
