import * as React from 'react';
import './SignUpPage.css'
import FormComponent from 'src/Components/FormComponent/FormComponent';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LoginButton from '../Buttons/LoginSignUpButtons/LoginButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import IUserDto from '../../entities/IUserDto';
import { Redirect } from 'react-router-dom';
import {signUpRules} from '../../entities/Validation/rules';
import {signUpValidator} from '../../entities/Validation/validators';
import HttpService from '../../services/HttpService';
import StorageService from 'src/services/StorageService';
import {apiUrl} from 'src/constants';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }

function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }


const signupFormBody: any = [
    {id: 'user-name', type: 'text', label: 'Name', errorMessage: '', name: 'Username', value: ''},
    {id: 'user-email', type: 'email', label: 'Email', errorMessage: '', name: 'Email', value: ''},
    {id: 'user-password', type: 'password', label: 'Password', errorMessage: '', name: 'Password', value: ''},
    {id: 'user-confpass', type: 'password', label: 'Confirm Password', errorMessage: '', name: 'ConfPassword', value: ''}
]

class SignUpPage extends React.Component<{}, any> {
   private httpService: any = new HttpService();
   private storageService: StorageService = new StorageService();

   constructor(props: any) {
      super(props);

      this.state = {
          showErrorMessage: false,
          serverErrorMessage: '',
          redirect: false,
          loginRedirect: false
      }
   }

  public userDataHandler = (url: string, formData: any) => {
    if(!url || !formData){
        return;
    }

    const comp: any = this;

    const body: IUserDto = {id: -1, username: formData.Username, password: formData.Password, email: formData.Email, pictureUrl: ''};

    this.httpService.post(url, body)
    .then((res: any) => {
        const emailUrl: string  = apiUrl + "api/email/" + res.data.id; 
        this.httpService.get(emailUrl);
        comp.setState({
            redirect: true
        });
    })
    .catch((error: any) => {
        if(!error){
            comp.setState({
                serverMessage: "Couldn't connect to the server"
            });
            return;
        };
        comp.setState({
            serverMessage: error.response.data
        });
        setTimeout(()=>comp.setState({
            serverMessage: ''
        }), 5000);  
    });
  }


   public postSuccesful = (response: any) => {
        const loginToken: string = response.data.token;
        this.storageService.saveItem('token', loginToken);
        this.setState({
            loginRedirect: true
        });
   }

   public postError = (error: any) => {
        this.showErrorMessage(error);
   }

   public render() {
      if(this.state.redirect){
        return (<Redirect push={true} to="/login"/>);
      }
      if(this.state.loginRedirect){
        return (<Redirect push={true} to="/myQuizzes"/>);
      }
      return (
         <div className="register-form">
            <div className="container">
               <LoginButton />
               <HomeButton buttonIsDisabled={true} />
               <div className="row">
                  <div>
                     <div className="signup-msg">
                        SIGN UP
                        </div>
                  </div>
               </div>
               <div className="row">
                  <div>
                     <div className="form-container">
                        {this.state.showErrorMessage ? (<div className="message server-message">{this.state.serverErrorMessage}</div>) : null}
                        <FormComponent className="signup-form" inputs={signupFormBody}
                           url={apiUrl + "api/users"}
                           buttonName=""
                           onSubmit={this.userDataHandler}
                           validator={signUpValidator}
                           validationRules={signUpRules}
                        />
                        <div className="socials">
                           <SocialButtonsWrapper
                              postURLs={{
                                facebook: apiUrl + 'api/facebook',
                                google: apiUrl + 'api/google'
                              }}
                              clientIds={{
                                 facebook: "1691716487610141",
                                 google: "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
                              }}
                              wrapperMessage={"Sign Up Using"}

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

export default SignUpPage;
