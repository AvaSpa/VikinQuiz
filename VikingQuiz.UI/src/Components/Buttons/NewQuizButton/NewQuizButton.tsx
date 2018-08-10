import * as React from 'react';
import './NewQuizButton.css';
import { Redirect } from 'react-router-dom';

class NewQuizButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false
        }

        this.handleNewQuizRedirect = this.handleNewQuizRedirect.bind(this);
    }

    public handleNewQuizRedirect(){
        this.setState({ redirect: true});
        
    }

    public render() {
        if(this.state.redirect){
        return (
                <Redirect
                    to={{pathname: '/quiz',
                    state: {id: null, editMode: false}
                    }}
                />      
            )
        }

        return (       
                <button className="new-quiz-button" onClick={this.handleNewQuizRedirect}/>
        )
    }
}

export default NewQuizButton;