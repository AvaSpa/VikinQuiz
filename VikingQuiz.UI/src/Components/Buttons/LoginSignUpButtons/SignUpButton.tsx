import * as React from 'react';
import './Buttons.css';

class SignUpButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="signupButton" onClick={this.handleClick} > SIGN UP </button>
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default SignUpButton;