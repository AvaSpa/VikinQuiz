import * as React from 'react';

import GoogleLogin from 'react-google-login';
import './buttonStyles.css';

import * as ButtonInterfaces from './buttonInterfaces';
import HttpService from '../../services/HttpService';


const httpService = new HttpService();

const createPostMessage = function (socialResData: any): ButtonInterfaces.IPostMessage {
   return {
      name: socialResData.profileObj.name || null,
      email: socialResData.profileObj.email || null,
      pictureUrl: socialResData.profileObj.imageUrl || null
   }
}

function popupClosedCondition(response: any) {
   return response.hasOwnProperty("error") && response.error === "popup_closed_by_user";
}

function dataExists(response: any) {
   return response.hasOwnProperty("googleId");
}


// wrapped for the GoogleLogin
function SocialButton(props: ButtonInterfaces.IPropsSocialButton) {


   function socialResponse(response: any) {
      if (popupClosedCondition(response)) { // popup trigger
         props.onPopupClosed();
      }
      else if (dataExists(response)) { // data existance (by format) checker
         console.log(response);
         props.onResponseSuccesful(response);
         const message = createPostMessage(response);

         httpService.post( // request with recieve data
            props.postURL,
            message
         )
            .then((res: any)=>{props.onPostSuccess(res);}) // server success trigger
            .catch((err: any) => {props.onPostError(err)}); // server failure trigger
      }
      else {
         props.onResponseFailure();
      }
   }

   return (
      <div className="social-button facebook-button">
         <GoogleLogin
            style={{}}
            clientId={props.clientId}

            onSuccess={socialResponse}
            onFailure={socialResponse}
            autoLoad={false}
            onRequest={props.onPopupOpen}
            buttonText="Google"
            className={"btn btn-primary btn-block"}
         > 
               <span className="icon icon-google-1" />
               <div className="button-text">Google</div>
         </GoogleLogin>
      </div>
   );
}

export default SocialButton;