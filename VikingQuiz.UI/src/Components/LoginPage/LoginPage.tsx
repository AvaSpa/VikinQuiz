import * as React from 'react';
import './LoginPage.css'
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import LoginFormComponent from '../LoginFormComponent/LoginFormComponent';
import { Redirect } from 'react-router-dom';
import { loginRules} from '../../entities/Validation/rules';
 
import {loginValidator} from '../../entities/Validation/validators';
import HttpService from '../../services/HttpService';
import StorageService from '../../services/StorageService';
 
function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }
 
 
 
 
class LoginPage extends React.Component<any, any> {
    private httpService: any = new HttpService();
    private storageService: StorageService = new StorageService();
   
    constructor(props: any) {
      super(props);
 
      this.state = {
          showErrorMessage: false,
          serverErrorMessage: '',
          redirect: false
      }
    }
 
   
 
    public userDataHandler = (url: string, formData: any) => {
        if(!url || !formData){
            return;
        }
 
        const body: any = {
            email: formData.Email,
            password: formData.Password
        }
   
        this.httpService.post(url, body)
            .then((result: any) => { this.loginSuccess(result); })
            .catch((error: any) => { this.loginError(error); });
    }
 
    public loginSuccess = (result: any) => {
        const loginToken: string = result.data.token;
        this.storageService.saveItem('token', loginToken);
        this.setState({
            redirect: true
        });
    };
 
    public loginError = (error: any) => {
        this.setState({ showErrorMessage: true });
        if (error.response === undefined) {
            this.setState({ serverErrorMessage: "Could not connect to the server. Please try again later" });
        }
        else {
            if (error.response.status === 404) {
                this.setState({ serverErrorMessage: "Username or Password incorrect. Please try again" });
            }
            if (error.response.status === 400) {
                this.setState({ serverErrorMessage: "Please confirm your account first" });
            }
        }
        setTimeout(() => this.setState({
            showErrorMessage: false,
            serverErrorMessage: ''
        }), 5000);
    };

    public postSuccesful = (response: any) => {
        const loginToken: string = response.data.token;
        this.storageService.saveItem('token', loginToken);
        this.setState({
            redirect: true
        });
   }

   public postError = (error: any) => {
        this.showErrorMessage(error);
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
                          <div className="loginmsg">
                              LOG IN
                          </div>
                      </div>
                  </div>
                   <div className="row">
                        <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                          <div className="form-container">
                              {this.state.showErrorMessage ? (<div className="message server-message">{this.state.serverErrorMessage}</div>) : null}
                              <LoginFormComponent inputs={[
                                {id: 'user-email', type: 'email', label: 'Email', errorMessage: '', name: 'Email', value: ''},
                                {id: 'user-password', type: 'password', label: 'Password', errorMessage: '', name: 'Password', value: ''},
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
                           
                                    onPostError={this.postError}
                                    onPostSuccess={this.postSuccesful}
                                />
                            </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>  
      );
    }

    private showErrorMessage = (error: any) =>{
        this.setState({ showErrorMessage: true });
        if (error.response === undefined) {
            this.setState({ serverErrorMessage: "Could not connect to the server. Please try again later" });
        }
        else {
            if (error.response.status === 404) {
                this.setState({ serverErrorMessage: "Username or Password incorrect. Please try again" });
            }
            if (error.response.status === 400) {
                this.setState({ serverErrorMessage: "Please confirm your account first" });
            }
        }
        setTimeout(() => this.setState({
            showErrorMessage: false,
            serverErrorMessage: ''
        }), 5000);
   }
  }
 
  export default LoginPage;