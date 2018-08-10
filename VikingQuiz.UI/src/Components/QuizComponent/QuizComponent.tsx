import * as React from 'react';
import './QuizComponent.css';
import StartQuizComponent from './StartQuizComponent/StartQuizComponent';
import QuestionsComponent from '../QuestionsComponent/QuestionsComponent';
import LogOutButton from 'src/Components/Buttons/LogOutButton/LogOutButton';


interface IState {
    id: number,
    editMode: boolean
    showQuestions: boolean
}


class QuizComponent extends React.Component<any, IState> {

    public state = {
        id: this.props.location.state.id,
        editMode: this.props.location.state.editMode,
        // id: this.props.id,
        // editMode: this.props.editMode,
        showQuestions: false
    }

    

    public saveQuizHandler = (quizId: number) => {
        this.setState({
            id: quizId,
            showQuestions: true
        });
    }

    public render(){
        return (
            <div className="quiz container">
               <LogOutButton />
               <StartQuizComponent editMode={this.state.editMode} quizId={this.state.id} save={this.saveQuizHandler}/>
               {this.state.showQuestions ? 
                  <QuestionsComponent quizId={this.state.id} /> : null
               }
            </div>
            
        )
    }
}

export default QuizComponent;