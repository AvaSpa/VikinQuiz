import * as React from 'react';
import '../Buttons.css';

class SignUpButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="signupButton" onClick={this.props.click} > SIGN UP </button>
        );
    }
}

export default SignUpButton;
