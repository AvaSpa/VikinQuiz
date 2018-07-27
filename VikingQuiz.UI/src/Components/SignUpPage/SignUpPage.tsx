import * as React from 'react';
import './SignUpPage.css'
import axios from 'axios';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import InputData from '../../entities/InputData';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LoginButton from '../Buttons/LoginSignUpButtons/LoginButton';
import SocialButtonsWrapper from '../socialButtons/socialButtonsWrapper';
import BottomLogo from '../BottomLogo/BottomLogo';
import UserDto from '../../entities/UserDto';

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }
 
function postSuccesful(res: any): void { console.dir("Post succesful", res); }
function postError(res: any): void { console.dir("Post NOT succesful", res); }
 
function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }

class SignUpPage extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);

  }

  public userDataHandler(url: string, formData: any){
    const body: UserDto = new UserDto(formData.Username, formData.Password, formData.Email);

    axios.post(url, body)
    .then((res: any) => {
        console.log(res);
        const emailUrl: string  = "http://localhost:60151/api/email/" + res.data.id; 
        console.log(emailUrl);
        axios.get(emailUrl);
    })
    .catch((error: any) => console.log(error));
  }


  public render() {
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
                            <FormComponent className="signupForm" inputs={[
                                new InputData('user-name', 'text', 'Name', '', 'Username'),
                                new InputData('user-email', 'email', 'Email', 'invalid email', 'Email'),
                                new InputData('user-password', 'password', 'Password', '', 'Password'),
                                new InputData('user-confpass', 'password', 'Confirm Password', 'passwords do not match', 'ConfPassword')
                                ]} url="http://localhost:60151/api/users" buttonName="" onSubmit={this.userDataHandler} />
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
            <footer id="footer"><BottomLogo /></footer>
        </div>
      
    );
  }
}

export default SignUpPage;
