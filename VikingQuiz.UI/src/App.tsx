import * as React from 'react';
import './App.css';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import RedirectComponent from './Components/RedirectComponent/RedirectComponent';
import NotFoundComponent from './Components/NotFoundComponent/NotFoundComponent';
import BottomLogo from './Components/BottomLogo/BottomLogo';
import UnauthorizedComponent from './Components/Unauthorized/UnauthorizedComponent';

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
            <Route exact={true} path="/redirect" component={RedirectComponent} />
            <Route exact={true} path="/unauthorized" component={UnauthorizedComponent} />
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
