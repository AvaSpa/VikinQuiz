import * as React from 'react';
import './HomeButton.css';
import { Redirect } from 'react-router-dom';

class HomeButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false,
            buttonIsDisabled: this.props.buttonIsDisabled
          };

        this.handleClick = this.handleClick.bind(this);
    }

    public handleClick() {
        this.setState({redirect: true});

    }

        public render() {       
            if(this.state.redirect){  
                return (
                    <Redirect
                        push={true}
                        to={{pathname: '/myQuizzes'}}
                    />
                )}
                
            if(this.state.buttonIsDisabled)
            {
                return (
                    <button className="home-button" disabled={true} />
                );
            }
            return (
                <button className="home-button" onClick={this.handleClick} />
            );
        }
}

export default HomeButton;
