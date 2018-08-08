import * as React from 'react';
import '../LoginSignUpButtons/Buttons.css';
import {Link} from 'react-router-dom';

class LogOutButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
    }

    public handleLogOut(){
        localStorage.removeItem("token");
        console.log("ok")
    }

    public render() {
        return (
            <Link to="/login">
            <button className="switchButton" onClick={this.handleLogOut}> LOG OUT </button>
            </Link>
        );
    }
}

export default LogOutButton;