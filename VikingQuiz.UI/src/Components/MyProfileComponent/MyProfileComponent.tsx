import * as React from 'react';
import './MyProfileComponent.css'

interface IProfileComponent {
    profilePictureUrl: string,
    profileName: string,
    children: any
}

const MyProfileComponent: any = (props: IProfileComponent) => {
    return (
        <figure>
            <img className='profile-picture' src={props.profilePictureUrl} alt='Avatar' />
            <div className='profile-text'>
               <figcaption>{props.profileName}</figcaption>
               <span className="profile-content"> {props.children} </span>
            </div>
        </figure>
    );
}

export default MyProfileComponent;
