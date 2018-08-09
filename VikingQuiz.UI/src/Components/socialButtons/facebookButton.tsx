import * as React from 'react';

import FacebookLogin from 'react-facebook-login';
import './buttonStyles.css';


import * as ButtonInterfaces from './buttonInterfaces';
import HttpService from 'src/services/HttpService';


const httpService = new HttpService();

const createPostMessage = (socialResData: any): ButtonInterfaces.IPostMessage => {
   return {
      email: socialResData.email || null,
      id: socialResData.userID || null,
      pictureUrl: socialResData.picture.data.url || null
   }
}

function popupClosedCondition(response : any) {
   return response.hasOwnProperty("status") && (response.status === "unknown" || response.status === undefined);
}

function dataExists(response : any) {
   return response.hasOwnProperty("userID");
}


// wrapped for the GoogleLogin
function SocialButton(props: ButtonInterfaces.IPropsSocialButton) {

   function socialResponse(response: any) {
      if(popupClosedCondition(response)) { // popup trigger
         props.onPopupClosed();
      }
      else if (dataExists(response)) { // data existance (by format) checker
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
      <div className="social-button google-button">
         <FacebookLogin
            
            appId={props.clientId}
            fields="name,email,picture"
            callback={socialResponse}
            onClick={props.onPopupOpen}
            autoLoad={false}
            icon={(
               <div>
                  <span className="icon icon-facebook" />
                  <div className="button-text">Facebook</div>
               </div>
            )}
            textButton=""
            cssClass={"btn btn-primary btn-block"}
         />
            
      </div>
   );
}

export default SocialButton;