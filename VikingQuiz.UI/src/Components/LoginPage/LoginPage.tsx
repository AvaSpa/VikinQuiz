import * as React from 'react';
import './LoginPage.css'
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';

import InputData from '../../entities/InputData';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import axios from '../../../node_modules/axios';
import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';
import BottomLogo from '../BottomLogo/BottomLogo';
import { setTimeout } from 'timers';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }


class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
          serverMessage: ''
      }
    }
  
   public validator(inputs: any, validationRules: any, id: string, funcs: any) {
      // validationRules, id, funcs
        console.log(id);
      const rules = validationRules[id];
      const inputsCopy = funcs.getCopyOfInputs(inputs);
      const inputItem = funcs.getItemById(id, inputs);
      const item = inputsCopy[inputItem.index]


      for (const rule of rules) {
         // console.log(inputItem.value);
         if (!rule.isValid(item.value, inputs, funcs)) {
            // rules not vali

            funcs.changeErrorMessageOf(id, rule.errorMessage);
            return false;
         }
      }

      funcs.changeErrorMessageOf(id, "");
      return true;
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
    
        axios.post(url, body)
        .then((res: any) => console.log(res))
        .catch((error: any) => {
            console.dir(error.response);
            comp.setState({
                serverMessage: error.response.data
            })
            setTimeout(()=>comp.setState({
                serverMessage: ''
            }), 5000);
        });
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
                              <p className="formerror server-message">{this.state.serverMessage}</p>
                              <LoginFormComponent inputs={[
                                new InputData('user-email', 'email', 'Email', '', 'Email', ''),
                                new InputData('user-password', 'password', 'Password', '', 'Password', ''),
                                ]} url="http://localhost:60151/api/session" buttonName="" onSubmit={this.userDataHandler} 
                           validator={this.validator}
                           validationRules={{
                              "user-email": [
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length !== 0;
                                    },
                                    errorMessage: "Field required"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       // email RegExp https://stackoverflow.com/questions/201323/how-to-validate-an-email-address-using-a-regular-expression
                                       // /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


                                       const reg = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

                                       return reg.test(value);

                                    },
                                    errorMessage: "Email format is invalid"
                                 }
                              ],
                              "user-password": [
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length !== 0;
                                    },
                                    errorMessage: "Field required"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length > 3;
                                    },
                                    errorMessage: "More than 3 characters"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length < 20;
                                    },
                                    errorMessage: "Less than 20 characters"
                                 }
                              ]
                           }}
                                />
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
              <footer id="footer"><BottomLogo /></footer>
          </div>   
      );
    }
  }
  
  export default LoginPage;
