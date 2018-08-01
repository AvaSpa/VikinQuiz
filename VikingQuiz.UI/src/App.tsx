import * as React from 'react';
import './App.css';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
<<<<<<< Updated upstream
<<<<<<< Updated upstream
import { BrowserRouter , Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import RedirectComponent from './Components/RedirectComponent/RedirectComponent';
import NotFoundComponent from './Components/NotFoundComponent/NotFoundComponent';
=======
import { BrowserRouter , Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
>>>>>>> Stashed changes
=======
import { BrowserRouter , Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
>>>>>>> Stashed changes


class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <BrowserRouter>
        <div className="App">
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        <Switch>
          <Route exact={true} path="/" component={SignUpPage} />
          <Route exact={true} path="/signup" component={SignUpPage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/redirect" component={RedirectComponent} />
          <Route path="*" component={NotFoundComponent} />
          </Switch>
=======
          <Route exact path="/" component={SignUpPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
>>>>>>> Stashed changes
=======
          <Route exact path="/" component={SignUpPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
>>>>>>> Stashed changes
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
