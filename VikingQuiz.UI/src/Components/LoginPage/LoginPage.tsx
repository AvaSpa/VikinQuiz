import * as React from 'react';
import './LoginPage.css'
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';

import InputData from '../../entities/InputData';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';
import { setTimeout } from 'timers';
import { Redirect } from 'react-router-dom';
import { loginRules} from '../../entities/Validation/rules';

import {loginValidator} from '../../entities/Validation/validators';
import HttpService from '../../services/HttpService';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }




class LoginPage extends React.Component<any, any> {
    private httpService: any = new HttpService();
    
    constructor(props: any) {
      super(props);

      this.state = {
          serverMessage: '',
          redirect: false
      }
    }
  
   
  
    public userDataHandler = (url: string, formData: any) => {
        if(!url || !formData){
            return;
        }

        const comp: any = this;

        const body: any = {
            email: formData.Email,
            password: formData.Password 
        }
    
        this.httpService.post(url, body)
        .then((res: any) => {
                console.log("success");
                comp.setState({
                    redirect: true
                });
            }
        )
        .catch((error: any) => {
            if(!error){
                comp.setState({
                    serverMessage: "Couldn't connect to the server"
                });
                return;
            };
            comp.setState({
                serverMessage: error.response.data
            })
            setTimeout(()=>comp.setState({
                serverMessage: ''
            }), 5000);
        });
    }


    public render() {
      if(this.state.redirect){
        return (<Redirect push={true} to="/redirect"/>);
      }
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
                              <p className="formerror server-message">{this.state.serverMessage}</p>
                              <LoginFormComponent inputs={[
                                new InputData('user-email', 'email', 'Email', '', 'Email', ''),
                                new InputData('user-password', 'password', 'Password', '', 'Password', ''),
                                ]} url="http://localhost:60151/api/session" buttonName="" onSubmit={this.userDataHandler} 
                           validator={loginValidator}
                           validationRules={loginRules}
                                />
                              <div className="socials">
                              <SocialButtonsWrapper 
                                    postURLs={{
                                        facebook: 'http://localhost:60151/api/facebook',
                                        google: 'http://localhost:60151/api/google'
                                    }}
                                    clientIds={{
                                        facebook: "1691716487610141",
                                        google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
                                    }}
                                    wrapperMessage={"Log In Using"}
                            
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
