import * as React from 'react';
import './SignUpPage.css'
import FormComponent from 'src/Components/FormComponent/FormComponent';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LoginButton from '../Buttons/LoginSignUpButtons/LoginButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import IUserDto from '../../entities/IUserDto';
import { Redirect } from 'react-router-dom';
import {signUpRules} from '../../entities/Validation/rules';
// import register from '../../registerServiceWorker';
import {signUpValidator} from '../../entities/Validation/validators';
import HttpService from '../../services/HttpService';

import { apiUrl } from '../../constants';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }

function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }

function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }

class SignUpPage extends React.Component<{}, any> {
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

    const body: IUserDto = {id: -1, username: formData.Username, password: formData.Password, email: formData.Email, pictureUrl: ''};

    this.httpService.post(url, body)
    .then((res: any) => {
        console.log(res);
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


   

   public render() {
        if(this.state.redirect){
        return (<Redirect push={true} to="/login"/>);
      }
      return (
         <div className="register-form">
            <div className="container">
               <LoginButton />
               <HomeButton />
               <div className="row">
                  <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                     <div className="signupmsg">
                        SIGN UP
                        </div>
                  </div>
               </div>
               <div className="row">
                  <div className="col-xs-10 col-xs-offset-1 col-md-6 col-md-offset-3">
                     <div className="form-container">
                        <p className="formerror server-message">{this.state.serverMessage}</p>
                        <FormComponent className="signupForm" inputs={
                           [
                                {id: 'user-name', type: 'text', label: 'Name', errorMessage: '', name: 'Username', value: ''},
                                {id: 'user-email', type: 'email', label: 'Email', errorMessage: '', name: 'Email', value: ''},
                                {id: 'user-password', type: 'password', label: 'Password', errorMessage: '', name: 'Password', value: ''},
                                {id: 'user-confpass', type: 'password', label: 'Confirm Password', errorMessage: '', name: 'ConfPassword', value: ''}
                           ]}
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
