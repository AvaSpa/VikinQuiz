import * as React from 'react';
import FormComponent from './Components/FormComponent/FormComponent';
import './App.css';
import logo from './logo.svg';

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { MyData: [] };
  }


  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="container-fluid">
          <FormComponent />
        </div>
      </div>
    );
  }
}

export default App;
