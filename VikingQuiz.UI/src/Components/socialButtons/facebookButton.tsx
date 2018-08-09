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

/* 
   PROPS:
         clientId: string -> the id of the app

         onPopupClosed
         onPopupOpen
         onResponseSuccesful
         onPostError
         onPostSuccess
         onResponseFailure
            --> function handlers for its own events


         postURL: string -> url to send social button response data (after succesful login)


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