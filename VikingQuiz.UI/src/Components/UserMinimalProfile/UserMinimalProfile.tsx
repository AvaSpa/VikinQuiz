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
            <div className="player-container"> 
                    <div className="player-photo">
                        <img className="photo" src="http://mythologian.net/wp-content/uploads/2017/02/real-floki-from-vikings-1024x657.jpg"/>                      
                    </div>
                    <div className="player-name">
                        {this.props.name}
                    </div>
            </div>
        );
    }
}

export default UserMinimalProfile;