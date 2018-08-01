import * as React from 'react';
import './Buttons.css';
import {Link} from 'react-router-dom';

class SignUpButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Link to="/signup">
            <button className="switch-button" > SIGN UP </button>
            </Link>
        );
    }
}

export default SignUpButton;
