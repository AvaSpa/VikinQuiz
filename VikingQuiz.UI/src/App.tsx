import * as React from 'react';
import './App.css';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import RedirectComponent from './Components/RedirectComponent/RedirectComponent';
import NotFoundComponent from './Components/NotFoundComponent/NotFoundComponent';

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
          <Route path="*" component={NotFoundComponent} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;