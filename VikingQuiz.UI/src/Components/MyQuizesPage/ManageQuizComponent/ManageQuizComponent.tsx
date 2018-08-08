import * as React from 'react';
import './ManageQuizComponent.css';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../../../node_modules/axios';
import YesNoComponent from '../../YesNoComponent/YesNoComponent';

class ManageQuizComponent extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
          serverMessage: '',
          redirect: false,
          isHidden: true,
          id: this.props.id
      }

      this.handleDeleteButtonClick = this.handleDeleteButtonClick.bind(this);
      this.handleQuizDeleteNoClick = this.handleQuizDeleteNoClick.bind(this);
      this.handleQuizDeleteYesClick = this.handleQuizDeleteYesClick.bind(this);
      this.handleEditQuizRedirect = this.handleEditQuizRedirect.bind(this);
    }


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
        
        const url : string = 'http://localhost:60151/api/quizzes/' + this.props.id
        const rerenderParent = this.props.handleChildDelete;
        
        axios.delete(url)
            .then(res => {
                console.log(res);
                console.log(res.data);
                rerenderParent();
            })
            .catch(err => console.log(err))  

    }

    public handleEditQuizRedirect(){
        this.setState({
            redirect: true})
        console.log('ok')
    }

    public render(): any {

        const visibility = this.state.isHidden;
        let confirmationQuestion;

        if(!visibility){
            confirmationQuestion =  
                <YesNoComponent handleNoClick={this.handleQuizDeleteNoClick} handleYesClick={this.handleQuizDeleteYesClick}
                    id={this.state.id} confirmationMessage="ARE YOU SURE YOU WANT TO DELETE THIS QUIZ?"  />
        } else {
            confirmationQuestion = null
        }

        if(!this.state.redirect){      
        return(
            <>
            {confirmationQuestion}
            <div className="manage_Quiz">
                    <button className="edit_Quiz_Button" onClick={this.handleEditQuizRedirect} />

                <button className="delete_Quiz_Button" onClick={this.handleDeleteButtonClick}/>

                <Link to="/playGame">
                    <button className="play_Game_Button" />
                </Link>
            </div>
            </>      
        )}
        else{
            return (
                <Redirect
                        to={{pathname: '/editQuiz',
                        state: {id: this.state.id, editMode: true}}}/>
            );
        }
    
    }
}

export default ManageQuizComponent;