import * as React from 'react';
import './LoginPage.css'
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';

import InputData from '../../entities/InputData';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import UserDto from '../../entities/UserDto';
import axios from '../../../node_modules/axios';
import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }


class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
    }
  
  
    public userDataHandler(url: string, formData: any){
        console.log("url: " + url);
        console.log("formData: " + formData, formData);
    
        const body: UserDto = new UserDto(formData.Username, formData.Password, formData.Email);
    
        console.log(body);
    
        axios.post(url, body)
        .then((res: any) => console.log(res))
        .catch((error: any) => console.log(error));
    }


    public render() {
      return (
          <div className="registerform">
              <div className="container">
                  <SignUpButton />
                  <HomeButton />
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                          <div className="loginmsg">
                              LOG IN
                          </div>
                      </div>
                  </div>
                   <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                          <div className="form-container">
                              <LoginFormComponent inputs={[
                                new InputData('user-email', 'email', 'Email', 'invalid email', 'Email', ''),
                                new InputData('user-password', 'password', 'Password', '', 'Password', ''),
                                ]} url="http://localhost:60151/api/users" buttonName="" onSubmit={this.userDataHandler} />
                              <div className="socials">
                              <SocialButtonsWrapper 
                                    postURLs={{
                                        facebook: 'http://localhost:60151/api/facebook',
                                        google: 'http://localhost:60151/api/google'
                                    }}
                                    clientIds={{
                                        facebook: "426789224472011",
                                        google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
                                    }}
                                    wrapperMessage={"Login Using"}
                            
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
  
  export default LoginPage;