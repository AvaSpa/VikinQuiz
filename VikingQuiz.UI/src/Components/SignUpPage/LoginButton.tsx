import * as React from 'react';
import './Buttons.css';

class LoginButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            //
        }
    }

    public render() {
        return (
            <button className="loginButton" onClick={this.handleClick} > LOG IN </button>
        );
    }

    public componentDidMount(){
        //
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default LoginButton;