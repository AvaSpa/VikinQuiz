import * as React from "react";
import "./LoginPage.css";
import SignUpButton from "../Buttons/LoginSignUpButtons/SignUpButton";
import HomeButton from "../Buttons/HomeButton/HomeButton";
import SocialButtonsWrapper from "../socialButtons/socialButtonsWrapper";
import LoginFormComponent from "../LoginFormComponent/LoginFormComponent";
import { Redirect } from "react-router-dom";
import { loginRules } from "../../entities/Validation/rules";
import {apiUrl} from 'src/constants';
import { loginValidator } from "../../entities/Validation/validators";
import HttpService from "../../services/HttpService";
import StorageService from "../../services/StorageService";

import "./LoginPage.css";

// import InputData from "../../entities/InputData";
import { setTimeout } from "timers";

function popupClosedHandler(): void { console.log("Popup closed"); }
function popupOpenHandler(): void { console.log("Popup opened"); }

// function postSuccesful(res: any): void { console.dir("Post succesful", res); }
// function postError(res: any): void { console.dir("Post NOT succesful", res); }

function responseSuccesfulHandler(res: any): void { console.log("Response succesful", res); }
function responseFailureHandler(): void { console.dir("Response failed"); }

interface ILoginCredentials {
  email: string;
  password: string;
}

class LoginPage extends React.Component<any, any> {
  private httpService: any = new HttpService();
  private storageService: StorageService = new StorageService();

  private readonly apiAddress: string = apiUrl;
  private readonly apiSessionAddress: string = "/session";
  private readonly apiGoogleAddress: string = "/google";
  private readonly apiFacebookAddress: string = "/facebook";
    private readonly googleAppId: string = "1691716487610141";
    private readonly facebookAppId: string = "973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com";

  constructor(props: any) {
    super(props);

    this.state = {
      showErrorMessage: false,
      serverErrorMessage: "",
      redirect: false,
      serverMessage: "",
      checkbox: false
    };
  }

  public componentDidMount() {
    const remember: boolean =
      this.storageService.getItem("remember") === "true" ? true : false;
    const tokenExists: boolean = this.storageService.itemExists("token");

    if (remember && tokenExists) {
      this.setState({ redirect: true });
    }
  }

  public checkboxClickedHandle = () => {
    const checkboxChange: boolean = !this.state.checkbox;
    this.setState({ checkbox: checkboxChange });
    this.storageService.saveItem("remember", checkboxChange.toString());
  };

  public onLogInSuccess = (result: any) => {
    const loginToken: string = result.data.token;
    this.storageService.saveItem("token", loginToken);
    this.setState({ redirect: true });
  };

  public userDataHandler = (url: string, formData: any) => {
    if (!url || !formData) {
      return;
    }

    const body: ILoginCredentials = {
      email: formData.Email,
      password: formData.Password
    };

    this.httpService
      .post(this.apiAddress + this.apiSessionAddress, body)
      .then((result: any) => this.onLogInSuccess(result))
      .catch((error: any) => this.onLogInError(error));
  };

  public onLogInError = (error: any) => {
    this.setState({ showErrorMessage: true });
    if (error.response === undefined) {
      this.setState({
        serverErrorMessage:
          "Could not connect to the server. Please try again later"
      });
    } else {
      if (error.response.status === 404) {
        this.setState({
          serverErrorMessage: "Username or Password incorrect. Please try again"
        });
      }
      if (error.response.status === 400) {
        this.setState({
          serverErrorMessage: "Please confirm your account first"
        });
      }
    }
    setTimeout(
      () =>
        this.setState({
          showErrorMessage: false,
          serverErrorMessage: ""
        }),
      5000
    );
  };

  public postSuccesful = (response: any) => {
    const loginToken: string = response.data.token;
    this.storageService.saveItem("token", loginToken);
    this.setState({
      redirect: true
    });
  };

  public postError = (error: any) => {
    this.showErrorMessage(error);
  };

  public render() {
    if (this.state.redirect) {
      return <Redirect push={true} to="/myQuizzes" />;
    }
    return (
      <div className="register-form login-page-container">
        <div className="container">
          <SignUpButton />
          <HomeButton />
          <div className="row">
            <div>
              <div className="login-msg">LOG IN</div>
            </div>
          </div>
          <div className="row">
            <div>
              <div className="form-container">
                {this.state.showErrorMessage ? (
                  <div className="message server-message">
                    {this.state.serverErrorMessage}
                  </div>
                ) : null}
                <LoginFormComponent
                  inputs={[
                    {
                      id: "user-email",
                      type: "email",
                      label: "Email",
                      errorMessage: "",
                      name: "Email",
                      value: ""
                    },
                    {
                      id: "user-password",
                      type: "password",
                      label: "Password",
                      errorMessage: "",
                      name: "Password",
                      value: ""
                    }
                  ]}
                  url={this.apiAddress + this.apiSessionAddress }
                  buttonName=""
                  onSubmit={this.userDataHandler}
                  validator={loginValidator}
                  checkboxChangedHandle={this.checkboxClickedHandle}
                  validationRules={loginRules}
                />
                <div className="socials">
                  <SocialButtonsWrapper
                    postURLs={{
                        facebook: this.apiAddress + this.apiFacebookAddress,
                        google: this.apiAddress + this.apiGoogleAddress
                    }}
                    clientIds={{
                        facebook: this.facebookAppId,
                        google: this.googleAppId
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

  private showErrorMessage = (error: any) => {
    this.setState({ showErrorMessage: true });
    if (error.response === undefined) {
      this.setState({
        serverErrorMessage:
          "Could not connect to the server. Please try again later"
      });
    } else {
      if (error.response.status === 404) {
        this.setState({
          serverErrorMessage: "Username or Password incorrect. Please try again"
        });
      }
      if (error.response.status === 400) {
        this.setState({
          serverErrorMessage: "Please confirm your account first"
        });
      }
    }
    setTimeout(
      () =>
        this.setState({
          showErrorMessage: false,
          serverErrorMessage: ""
        }),
      5000
    );
  };
}

export default LoginPage;
