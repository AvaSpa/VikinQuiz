import * as React from 'react';
import './NewQuizButton.css';
import { Redirect } from 'react-router-dom';

class NewQuizButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false
        }

        this.handleNewQuizRedirect = this.handleNewQuizRedirect.bind(this);
    }

    public handleNewQuizRedirect(){
        this.setState({
            redirect: true});
        setTimeout(()=>{console.log(this.state.redirect)}, 2000);
        
    }

    public render() {
        if(this.state.redirect){
        return (
            <Redirect
                    to={{pathname: '/newQuiz',
                    state: {id: null, editMode: false}

        }}
                />      
        )}
        return (       
                <button className="new_Quiz_Button" onClick={this.handleNewQuizRedirect}/>
            )
    }
}

export default NewQuizButton;