import * as React from 'react';
import './UserMinimalProfile.css';

class UserMinimalProfile extends React.Component<any, any>{
    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false
        }
    }

    public render() {
        return (
            <div className="player-container single-player-container"> 
                    <div className="player-photo">
                        <img className="photo" src={this.props.photo}/>                      
                    </div>
                    <div className="player-name">
                        {this.props.name}
                    </div>
            </div>
        );
    }
}

export default UserMinimalProfile;