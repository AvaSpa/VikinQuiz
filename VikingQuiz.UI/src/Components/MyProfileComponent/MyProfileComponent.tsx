import * as React from 'react';
import './MyProfileComponent.css'

interface IProfileComponent {
    profilePictureUrl: string,
    profileName: string,
    children: any
}

const MyProfileComponent: any = (props: IProfileComponent) => {
   console.log("MY PROFILE COMPONENT, (PART OF PLAYER ANSWER PAGE)", props);
    return (
        <figure className="my-profile-container">
            <img className='profile-picture' src={props.profilePictureUrl} alt='Avatar' />
            <div className='profile-text'>
               <figcaption className="my-profile-name">{props.profileName}</figcaption>
               {props.children}
            </div>
        </figure>
    );
}

export default MyProfileComponent;
