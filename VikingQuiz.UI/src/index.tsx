import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
 
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import './App';

import './fonts/fontello-embedded.css';
import './fonts/fonts.css';
import SignUpPage from './Components/SignUpPage/SignUpPage';
 
// import SocialButtonsWrapper from './Components/socialButtons/socialButtonsWrapper';
// import SignUpPage from './Components/SignUpPage/SignUpPage';
 
// function popupClosedHandler(): void { console.log("Popup closed"); }
// function popupOpenHandler(): void { console.log("Popup opened"); }
 
// function postSuccesful(res : any): void { console.dir("Post succesful: " + res); }
// function postError(res : any): void { console.dir("Post NOT succesful"); }
 
// function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
// function responseFailureHandler(): void { console.dir("Response failed"); }
 
 
 
ReactDOM.render(
   (
       <SignUpPage />
    //   <SocialButtonsWrapper
    //      postURLs={{
    //         facebook: 'http://localhost:60151/api/facebook',
    //         google: 'http://localhost:60151/api/google'
    //      }}
    //      clientIds={{
    //         facebook: "1691716487610141",
    //         google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
    //      }}
    //      wrapperMessage={"Sing Up Using"}
 
    //      onResponseFailure={responseFailureHandler}
    //      onResponseSuccesful={responseSuccesfulHandler}
 
    //      onPopupClosed={popupClosedHandler}
    //      onPopupOpen={popupOpenHandler}
 
    //      onPostError={postError}
    //      onPostSuccess={postSuccesful}
 
    //   />
 
   ),
   document.getElementById('root'));
 
 
registerServiceWorker();