import * as React from 'react';
import './SignUpPage.css'
import FormComponent from 'src/components/FormComponent/FormComponent';
import InputData from '../../entities/InputData';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import SubmitButton from '../Buttons/SubmitButton/SubmitButton';
import LoginButton from '../Buttons/LoginSignUpButtons/LoginButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';


function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }


class SignUpPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
        <div className="registerform">
            <div className="container">
                <LoginButton />
                <HomeButton />
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="signupmsg">
                            SIGN UP
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-md-offset-3">
                        <div className="form-container">
                            <FormComponent inputs={[
                                new InputData('user-name', 'text', 'Name', ''),
                                new InputData('user-email', 'email', 'Email', 'invalid email'),
                                new InputData('user-password', 'password', 'Password', ''),
                                new InputData('user-confpass', 'password', 'Confirm Password', 'passwords do not match')
                                ]}/>
                            <div className="checkbutton">
                                <SubmitButton />
                            </div>
                            <div className="socials">
                                <SocialButtonsWrapper 
                                    postURLs={{
                                        facebook: 'http://localhost:8080/',
                                        google: 'http://localhost:8080/'
                                    }}
                                    clientIds={{
                                        facebook: "426789224472011",
                                        google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
                                    }}
                                    wrapperMessage={"Sign Up Using"}
                            
                                    onResponseFailure={responseFailureHandler}
                                    onResponseSuccesful={responseSuccesfulHandler}
                            
                                    onPopupClosed={popupClosedHandler}
                                    onPopupOpen={popupOpenHandler}
                            
                                    onPostError={postError}
                                    onPostSuccess={postSuccesful}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      
    );
  }
}

export default SignUpPage;


/*
import SocialButtonsWrapper from './components/socialButtons/socialButtonsWrapper';
 
function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }
 
 
 
ReactDOM.render(
   (
      <SocialButtonsWrapper
         postURLs={{
            facebook: 'http://localhost:8080/',
            google: 'http://localhost:8080/'
         }}
         clientIds={{
            facebook: "426789224472011",
            google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
         }}
         wrapperMessage={"Sign Up Using"}
 
         onResponseFailure={responseFailureHandler}
         onResponseSuccesful={responseSuccesfulHandler}
 
         onPopupClosed={popupClosedHandler}
         onPopupOpen={popupOpenHandler}
 
         onPostError={postError}
         onPostSuccess={postSuccesful}
 
      />
 
   ),
   document.getElementById('root'));
*/