import * as React from 'react';
import SignUpButton from '../Buttons/LoginSignUpButtons/SignUpButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';

class LoginPage extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
    }
  
  
    public render() {
      return (
          <div className="registerform">
              <div className="container">
                  <SignUpButton />
                  <HomeButton />
                  <div className="row">
                      <div className="col-md-4 col-md-offset-4">
                          <div className="signupmsg">
                              LOG IN
                          </div>
                      </div>
                  </div>
                  {/* <div className="row">
                      <div className="col-md-4 col-md-offset-4">
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
                                  SIGN UP WITH
                              </div>
                          </div>
                      </div>
                  </div> */}
              </div>
          </div>
        
      );
    }
  }
  
  export default LoginPage;