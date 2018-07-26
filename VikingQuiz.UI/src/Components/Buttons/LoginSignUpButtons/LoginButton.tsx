import * as React from 'react';
import '../Buttons.css';

class LoginButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="switchButton" onClick={this.handleClick} > LOG IN </button>
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default LoginButton;