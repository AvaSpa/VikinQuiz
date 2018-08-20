import * as React from 'react';
import './ManageQuizComponent.css';
import { Redirect} from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import YesNoComponent from '../../YesNoComponent/YesNoComponent';

class ManageQuizComponent extends React.Component<any, any> { 
    
    private readonly apiAddress : string = 'http://localhost:60151/api/quizzes/'
    
    constructor(props: any) {
      super(props);

      this.state = {
          redirectToEdit: false,
          redirectToPlayGame: false,
          isHidden: true,
          id: this.props.id
      }

      this.SetupHandlers();
    }

    public SetupHandlers = () => {
        this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
        this.handleQuizDeleteNoClick = this.handleQuizDeleteNoClick.bind(this);
        this.handleQuizDeleteYesClick = this.handleQuizDeleteYesClick.bind(this);
        this.handleEditQuizRedirect = this.handleEditQuizRedirect.bind(this);
        this.handlePlayGameButtonClick = this.handlePlayGameButtonClick.bind(this);
    };
    
    public componentDidMount(){
        this.setState( {id: this.props.id})   
    }

    public handleDeleteButtonClick(){
        this.setState({isHidden: false})
        this.props.deleteSelection();
    }

    public handleQuizDeleteNoClick(props: any){
        this.setState({isHidden: true})
        this.props.noDeleteAnswer()
    }

    public handleQuizDeleteYesClick(props: any){
        
        const rerenderParent = this.props.handleChildDelete;
        
        axios.delete(this.apiAddress + this.props.id)
            .then(res => {
                rerenderParent();
            })
            .catch(err => console.log(err))  
    }

    public handleEditQuizRedirect(){
        this.setState({redirectToEdit: true})
    }

    public handlePlayGameButtonClick(){
        this.setState({redirectToPlayGame: true})
    }

    public render(): any {

        const visibility = this.state.isHidden;
        let confirmationQuestion;

        if(!visibility){
            confirmationQuestion =  
                <YesNoComponent 
                    handleNoClick={this.handleQuizDeleteNoClick} handleYesClick={this.handleQuizDeleteYesClick}
                    id={this.state.id} confirmationMessage="ARE YOU SURE YOU WANT TO DELETE THIS QUIZ?"  
                />
        } else {
            confirmationQuestion = null
        }

        if(this.state.redirectToEdit){  
            return (
                <Redirect
                    to={{pathname: '/editQuiz',
                    state: {id: this.state.id, editMode: true}}}
                />
            )}
        else{
            if(this.state.redirectToPlayGame){
                return (
                    <Redirect
                        to={{pathname: '/playGame',
                        state: {id: this.state.id}}}
                    />
                )
            }
            else{
                return(
                    <>
                    {confirmationQuestion}
                    <div className="manage-quiz">
                        <button className="edit-quiz-button" onClick={this.handleEditQuizRedirect} />
                        <button className="delete-quiz-button" onClick={this.handleDeleteButtonClick}/>
                        <button className="play-game-button" onClick={this.handlePlayGameButtonClick} />
                    </div>
                    </>      
                )}
        }         
    } 
}

export default ManageQuizComponent;