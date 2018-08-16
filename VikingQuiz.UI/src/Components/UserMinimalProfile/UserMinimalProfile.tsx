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
            <figure>
                <img className="user-photo" src="http://mythologian.net/wp-content/uploads/2017/02/real-floki-from-vikings-1024x657.jpg"/>                      
                <figcaption>{this.props.name}</figcaption>
            </figure>
        );
    }
}

export default UserMinimalProfile;