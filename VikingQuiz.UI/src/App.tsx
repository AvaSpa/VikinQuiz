import * as React from 'react';
import './App.css';
import SignUpPage from 'src/Components/SignUpPage/SignUpPage';
import { BrowserRouter , Route } from "react-router-dom";
import LoginPage from './Components/LoginPage/LoginPage';
import redirectComponent from './Components/RedirectComponent/RedirectComponent';


class App extends React.Component<{}, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact={true} path="/" component={SignUpPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/redirect" component={redirectComponent} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;