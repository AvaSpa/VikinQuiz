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
// import register from '../../registerServiceWorker';

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

   public userDataHandler(url: string, formData: any) {
      //  console.log("url: " + url);
      //  console.log("formData: " + formData, formData);
      // implement validation here, if not valid don't go or return <somethig
      const body: UserDto = new UserDto(formData.Username, formData.Password, formData.Email);

      //  console.log(body);

      axios.post(url, body)
         .then((res: any) => console.log(res))
         .catch((error: any) => console.log(error));
   }


   public validator(inputs: any, validationRules: any, id: string, funcs: any) {
      // validationRules, id, funcs
      //   console.log(id);
      const rules = validationRules[id];
      const inputsCopy = funcs.getCopyOfInputs(inputs);
      const inputItem = funcs.getItemById(id, inputs);
      const item = inputsCopy[inputItem.index]

      // console.log(rules, inputsCopy, index, id);
      const confPass = funcs.getItemById("user-confpass", inputs).item;
      // console.log(confPass);
      if (id === 'user-password') {
         if (confPass.value) {
            this.validator(inputs, validationRules, 'user-confpass', funcs);
         }
      }

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
                        <FormComponent className="signupForm" inputs={
                           [
                              new InputData('user-name', 'text', 'Name', '', 'Username', ''),
                              new InputData('user-email', 'email', 'Email', '', 'Email', ''),
                              new InputData('user-password', 'password', 'Password', '', 'Password', ''),
                              new InputData('user-confpass', 'password', 'Confirm Password', '', 'ConfPassword', '')
                           ]}
                           url="http://localhost:60151/api/users"
                           buttonName=""
                           onSubmit={this.userDataHandler}
                           validator={this.validator}
                           validationRules={{
                              "user-name": [
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length !== 0;
                                    },
                                    errorMessage: "Field required"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length >= 3;
                                    },
                                    errorMessage: "Name too short (> 3 characters)"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length <= 20;
                                    },
                                    errorMessage: "Name too long ( < 20 characters)"
                                 }
                              ],
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
                              ],
                              "user-confpass": [
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       return value.length !== 0;
                                    },
                                    errorMessage: "Field required"
                                 },
                                 {
                                    isValid(value: string, inputs: any, funcs: any) {
                                       // console.log(funcs);
                                       // const stateInputs = context.state.inputs;
                                       // replace by the inputs rgument

                                       // get the index of the confpass
                                       const passIndex = funcs.getItemById("user-confpass", inputs).index;
                                       // const passIndex: number = stateInputs.slice().findIndex((inp: any) => inp.id === "user-confpass");

                                       // const duplicatePassIndex: number = stateInputs.slice().findIndex((inp: any) => inp.id === "user-password");
                                       const duplicatePassIndex = funcs.getItemById("user-password", inputs).index;

                                       // console.log(inputs[passIndex].value === inputs[duplicatePassIndex].value);


                                       return inputs[passIndex].value === inputs[duplicatePassIndex].value;

                                    },
                                    errorMessage: "Passwords do not match"
                                 }
                              ]

                           }}
                        />
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
            <footer id="footer" className="pull-left"><BottomLogo /></footer>
         </div>

      );
   }
}

export default SignUpPage;
