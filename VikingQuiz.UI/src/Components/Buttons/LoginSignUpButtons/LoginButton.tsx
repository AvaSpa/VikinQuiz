import * as React from 'react';
import '../Buttons.css';
import {Link} from 'react-router-dom';

class LoginButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <Link to="/login">
            <button className="switch-button" > LOG IN </button>
            </Link>
        );
    }
}

export default LoginButton;