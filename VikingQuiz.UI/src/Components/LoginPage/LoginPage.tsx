import * as React from 'react';
import './LoginPage.css'
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';
import BottomLogo from '../BottomLogo/BottomLogo';
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

interface ILoginCredentials{
    email: string,
    password: string
};

class LoginPage extends React.Component<any, any> {
    private httpService: any = new HttpService();
    private readonly apiAddress: string = 'http://localhost:60151/api';
    private readonly apiSessionAddress: string = '/session';
    private readonly apiGoogleAddress: string = '/google';
    private readonly apiFacebookAddress: string = '/facebook';

    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            checkbox: false
        }
    }

    public componentDidMount() {
        const remember: boolean = this.storageService.getItem('remember') === 'true' ? true : false;
        const tokenExists: boolean = this.storageService.itemExists('token');

        if (remember && tokenExists) {
            this.setState({ redirect: true });
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
        return (<Redirect push={true} to="/myQuizzes"/>);
      }
      return (
          <div className="registerform">
              <div className="container">
                  <SignUpButton />
                  <HomeButton />
                  <div className="row">
                    <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                          <div className="login-msg">
                              LOG IN
                          </div>
                      </div>
                  </div>
                   <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                          <div className="form-container">
                              <p className="formerror server-message">{this.state.serverMessage}</p>
                              <LoginFormComponent inputs={[
                                {id: 'user-email', type: 'email', label: 'Email', errorMessage: '', name: 'Email', value: ''},
                                {id: 'user-password', type: 'password', label: 'Password', errorMessage: '', name: 'Password', value: ''},
                                ]} url={this.apiAddress + this.apiSessionAddress} buttonName="" onSubmit={this.userDataHandler} 
                           validator={loginValidator}
                           validationRules={loginRules}
                           checkboxChangedHandle={this.checkboxClickedHandle}
                                />
                              <div className="socials">
                              <SocialButtonsWrapper 
                                    postURLs={{
                                        facebook:   this.apiAddress + this.apiFacebookAddress,
                                        google:     this.apiAddress + this.apiGoogleAddress
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
              <footer id="footer"><BottomLogo /></footer>
          </div>   
      );
    }
    
    private userDataHandler = (url: string, formData: any) => {
        if (!url || !formData) {
            return;
        }

        const body: ILoginCredentials = {
            email: formData.Email,
            password: formData.Password
        }

        this.httpService.post(this.apiAddress + this.apiSessionAddress, body)
        .then((result: any) => this.onLogInSuccess(result))
        .catch((error: any) => this.onLogInError(error))
    };

    private onLogInSuccess = (result: any) => {
        const loginToken: string = result.data.token;
        this.storageService.saveItem('token', loginToken);
        this.setState({redirect: true});
    };

    private onLogInError = (error: any) => {
        if (!error) {
            this.setState({
                serverMessage: "Could not connect to the server"
            });
            return;
        };
        this.setState({
            serverMessage: error.response.data
        })
        setTimeout(() => this.setState({
            serverMessage: ''
        }), 5000);
    };

    private checkboxClickedHandle = () => {
        const checkboxChange: boolean = !this.state.checkbox;
        this.setState({ checkbox: checkboxChange });
        this.storageService.saveItem('remember', checkboxChange.toString());
    };
  }
  
  export default LoginPage;
