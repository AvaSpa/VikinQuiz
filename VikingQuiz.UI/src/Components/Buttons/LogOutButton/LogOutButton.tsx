import * as React from 'react';
import '../LoginSignUpButtons/Buttons.css';
import {Link} from 'react-router-dom';
import StorageService from '../../../services/StorageService';

class LogOutButton extends React.Component<any, any> {
    private storage: StorageService = new StorageService();

    constructor(props: any) {
        super(props);

    this.handleLogOut = this.handleLogOut.bind(this);
    }

    public handleLogOut(){
        this.storage.removeItem("token");
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