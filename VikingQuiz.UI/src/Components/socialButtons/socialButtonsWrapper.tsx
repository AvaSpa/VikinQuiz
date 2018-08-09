import * as React from 'react';

import FacebookLoginButton from './facebookButton';
import GoogleLoginButton from './googleButton';

import './buttonStyles.css';


function SocialButtonsWrapper(props: any) {
   return (
      <div className='row container-fluid social-buttons-container'>
         <div className="text-center wrapper-text">{props.wrapperMessage}</div>
         <div className="col-xxs-12 col-xs-6" >
            <FacebookLoginButton
               clientId={props.clientIds.facebook}
               onResponseFailure={props.onResponseFailure}
               onResponseSuccesful={props.onResponseSuccesful}

               onPopupClosed={props.onPopupClosed}
               onPopupOpen={props.onPopupOpen}

               onPostError={props.onPostError}
               onPostSuccess={props.onPostSuccess}

               postURL={props.postURLs.facebook}

            />
         </div>
         <div className="col-xxs-12 col-xs-6">
            <GoogleLoginButton
               clientId={props.clientIds.google}
               postURL={props.postURLs.google}

               onResponseFailure={props.onResponseFailure}
               onResponseSuccesful={props.onResponseSuccesful}

               onPopupClosed={props.onPopupClosed}
               onPopupOpen={props.onPopupOpen}

               onPostError={props.onPostError}
               onPostSuccess={props.onPostSuccess}

            />
         </div>
      </div>
   )
}

export default SocialButtonsWrapper;

