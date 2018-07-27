import * as React from 'react';

import axios from 'axios';
import GoogleLogin from 'react-google-login';
import './buttonStyles.css';

import * as ButtonInterfaces from './buttonInterfaces';



const createPostMessage = function (socialResData: any): ButtonInterfaces.IPostMessage {
   return {
      id: socialResData.googleId || null,
      email: socialResData.w3.U3 || null,
      pictureUrl: socialResData.w3.Paa || null
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
         props.onResponseSuccesful(response);
         const message = createPostMessage(response);

         axios.post( // request with recieve data
            props.postURL,
            message
         )
            .then(props.onPostSuccess) // server success trigger
            .catch(props.onPostError); // server failure trigger
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

/* 
   PROPS:
         clientId: string -> the id of the app
         type: string -> "google" or "facebook"

         onPopupClosed
         onPopupOpen
         onResponseSuccesful
         onPostError
         onPostSuccess
         onResponseFailure
            --> function handlers for its own events


         postURL: string -> url to send social button response data (after succesful login)

         btnClassName: string -> classname of the button itself
         btnText: string or JSX expression -> what's inside the button itself
         containerClassName: string -> class of the social button container

*/

// Example Usage
/* 
function popupClosedHandler() : void { console.log("Popup closed"); }
function popupOpenHandler() : void { console.log("Popup opened"); }
function responseSuccesfulHandler(res : any) : void { console.log("Response succesful", res); }
function postSuccesful() : void { console.dir("Post succesful"); }
function postError() : void { console.dir("Post NOT succesful"); }


ReactDOM.render(
   (
      <div>
      <SocialButton
         clientId="973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
         type="google"

         onPopupClosed={popupClosedHandler}
         onPopupOpen={popupOpenHandler}
         onResponseSuccesful={responseSuccesfulHandler}

         onPostError={postError}
         onPostSuccess={postSuccesful}

         postURL={"http://localhost:8080/"}
         btnClassName="btn btn-primary"
         btnText={"Google login"}
         containerClassName="social-button google-button"

      />
      <SocialButton
         clientId="426789224472011"
         type="facebook"

         onPopupClosed={popupClosedHandler}
         onPopupOpen={popupOpenHandler}
         onResponseSuccesful={responseSuccesfulHandler}

         onPostError={postError}
         onPostSuccess={postSuccesful}

         postURL={"http://localhost:8080/error"}
         btnClassName="btn btn-primary"
         btnText={"FB Login"}
         containerClassName="social-button facebook-button"

      />
      </div>
   ),
   document.getElementById('root')); */