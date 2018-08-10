import * as React from 'react';
import './App.css';
import MyQuizesPage from 'src/Components/MyQuizesPage/MyQuizesPage';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import NotFoundComponent from './Components/NotFoundComponent/NotFoundComponent';
import UserMinimalProfile from './Components/UserMinimalProfile/UserMinimalProfile';
import ConnectGame from './Components/StartGame/ConnectGame';
import StartGame from './Components/StartGame/StartGame';
import PlayGame from './Components/StartGame/PlayGame';
import BottomLogo from './Components/BottomLogo/BottomLogo';
import QuizComponent from './Components/QuizComponent/QuizComponent';
import ResetPasswordComponent from './Components/ForgotPasswordComponent/ResetPasswordComponent/ResetPasswordComponent';
import SendEmailComponent from './Components/ForgotPasswordComponent/SendEmailComponent/SendEmailComponent';
import SnackbarComponent from './Components/SnackbarComponent/SnackbarComponent';
import RedirectComponent from './Components/RedirectComponent/RedirectComponent';

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route exact={true} path="/" component={SignUpPage} />
            <Route exact={true} path="/signup" component={SignUpPage} />
            <Route exact={true} path="/login" component={LoginPage} />
            <Route exact={true} path="/redirect" component={RedirectComponent} />
            <Route exact={true} path="/myQuizzes" component={MyQuizesPage} />
            <Route exact={true} path="/quiz" component={QuizComponent} />
            <Route exact={true} path="/startgame" component={StartGame} />
            <Route exact={true} path="/playgame" component={PlayGame} />
            <Route exact={true} path="/connect" component={ConnectGame} />
            <Route exact={true} path="/avatar" component={UserMinimalProfile} />
            <Route exact={true} path="/forgot" component={SendEmailComponent} />
            <Route exact={true} path="/forgot/:token" component={ResetPasswordComponent} />
            <Route exact={true} path="/snackbar" component={SnackbarComponent} />
            <Route path="*" component={NotFoundComponent} />
        </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;