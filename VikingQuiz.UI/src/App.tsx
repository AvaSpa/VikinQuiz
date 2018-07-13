import * as React from 'react';
import './App.css';

import axios from 'axios';
import logo from './logo.svg';

class App extends React.Component<any, any> {
  constructor(props: any){
    super(props);
    this.state = { MyData: [] };
    
  this.init();
}
  public init(){
    axios.get("http://localhost:60151/api/values").then(Response => {
      global.console.log(Response.data);
      this.setState({MyData:Response.data }) ;
    });
  }


  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          Values: {this.state.MyData}
        </p>
      </div>
    );
  }
}

export default App;
