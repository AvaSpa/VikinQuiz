import * as React from 'react';
import './ProfileAndHomeComponent.css'
import HomeButton from '../Buttons/HomeButton/HomeButton';
import MyProfileComponent from '../MyProfileComponent/MyProfileComponent';

const ProfileAndHomeComponent = (props: any) => {

    return(
        <div className="profile-container">
            <HomeButton buttonIsDisabled={props.buttonIsDisabled} />
            <div className="profile-details">
                <MyProfileComponent  profilePictureUrl={props.profilePictureUrl} profileName={props.profileName}>   
                  {props.children}
                </MyProfileComponent>
            </div>
        </div>
    )

}

export default ProfileAndHomeComponent;