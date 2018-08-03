import * as React from 'react';
import './App.css';
import MyQuizesPage from 'src/Components/MyQuizesPage/MyQuizesPage';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import NotFoundComponent from './Components/NotFoundComponent/NotFoundComponent';
import StartGame from './Components/StartGame/StartGame';
import UserMinimalProfile from './Components/UserMinimalProfile/UserMinimalProfile';
import BottomLogo from './Components/BottomLogo/BottomLogo';
import ResetPasswordComponent from './Components/ForgotPasswordComponent/ResetPasswordComponent/ResetPasswordComponent';
import SendEmailComponent from './Components/ForgotPasswordComponent/SendEmailComponent/SendEmailComponent';

class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
      <>
      <BrowserRouter>
        <div className="App">
        <Switch>
          <Route exact={true} path="/" component={SignUpPage} />
          <Route exact={true} path="/signup" component={SignUpPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/myQuizzes" component={MyQuizesPage} />
          <Route exact={true} path="/editQuiz" component={NotFoundComponent} />
          <Route exact={true} path="/newQuiz" component={NotFoundComponent} />
          <Route exact={true} path="/startgame" component={StartGame} />
          <Route exact={true} path="/avatar" component={UserMinimalProfile} />
          <Route exact={true} path="/forgot" component={SendEmailComponent} />
          <Route exact={true} path="/forgot/:token" component={ResetPasswordComponent} />
          <Route path="*" component={NotFoundComponent} />
        </Switch>
        </div>
      </BrowserRouter>
      <footer><BottomLogo /></footer>
      </>
    );
  }
}

export default App;
