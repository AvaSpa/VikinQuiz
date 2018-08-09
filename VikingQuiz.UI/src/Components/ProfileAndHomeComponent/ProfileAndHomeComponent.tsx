import * as React from 'react';
import './ProfileAndHomeComponent.css'
import HomeButton from '../Buttons/HomeButton/HomeButton';
import MyProfileComponent from '../MyProfileComponent/MyProfileComponent';

interface IProfileComponent {
    profilePictureUrl: string,
    profileName: string
}

const ProfileAndHomeComponent = (props: IProfileComponent) => {

    return(
        <div className="profile-container">
            <HomeButton />
            <div className="profile-details">
                <MyProfileComponent profilePictureUrl={props.profilePictureUrl} profileName={props.profileName}/>
            </div>
        </div>
    )

}

export default ProfileAndHomeComponent;