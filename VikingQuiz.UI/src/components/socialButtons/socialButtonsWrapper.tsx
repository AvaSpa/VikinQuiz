import * as React from 'react';

import FacebookLoginButton from './facebookButton';
import GoogleLoginButton from './googleButton';

import './buttonStyles.css';


function SocialButtonsWrapper(props : any) {
   return (
      <div className='row container-fluid social-buttons-container'>
         <div className="text-center wrapper-text">{props.wrapperMessage}</div>
         <div className="col-xs-12 col-sm-6" >
            <FacebookLoginButton
               clientId={"426789224472011"}
               onResponseFailure={props.onResponseFailure}
               onResponseSuccesful={props.onResponseSuccesful}

               onPopupClosed={props.onPopupClosed}
               onPopupOpen={props.onPopupOpen}

               onPostError={props.onPostError}
               onPostSuccess={props.onPostSuccess}

               postURL={"http://localhost:8080/"}

            />
         </div>
         <div className="col-xs-12 col-sm-6">
            <GoogleLoginButton
               clientId={"973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"}

               onResponseFailure={props.onResponseFailure}
               onResponseSuccesful={props.onResponseSuccesful}

               onPopupClosed={props.onPopupClosed}
               onPopupOpen={props.onPopupOpen}

               onPostError={props.onPostError}
               onPostSuccess={props.onPostSuccess}
               postURL={"http://localhost:8080/"}

            />
         </div>
      </div>
   )
}

export default SocialButtonsWrapper;

/*
EXAMPLE USAGE

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App';
import './fontello-embedded.css';
import './fonts/fonts.css';

import SocialButtonsWrapper from './components/socialButtons/socialButtonsWrapper';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }

function postSuccesful(): void { console.dir("Post succesful"); }
function postError(): void { console.dir("Post NOT succesful"); }

function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }



ReactDOM.render(
   (
         <SocialButtonsWrapper 


            onResponseFailure={responseFailureHandler}
            onResponseSuccesful={responseSuccesfulHandler}

            onPopupClosed={popupClosedHandler}
            onPopupOpen={popupOpenHandler}

            onPostError={postError}
            onPostSuccess={postSuccesful}

         />
        
   ),
   document.getElementById('root')); 


registerServiceWorker();

*/

