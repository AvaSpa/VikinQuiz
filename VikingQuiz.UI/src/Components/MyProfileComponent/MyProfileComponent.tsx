import * as React from 'react';
import './MyProfileComponent.css'

interface IProfileComponent {
    profilePictureUrl: string,
    profileName: string
}

const MyProfileComponent: any = (props: IProfileComponent) => {
    return (
        <figure>
            <img className='profile-picture' src={props.profilePictureUrl} alt='Avatar' />
            <figcaption>{props.profileName}</figcaption>
        </figure>
    );
}

export default MyProfileComponent;
