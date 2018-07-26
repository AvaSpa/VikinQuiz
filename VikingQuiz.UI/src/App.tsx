import * as React from 'react';
import FormComponent from 'src/components/FormComponent/FormComponent';
import InputData from './entities/InputData';
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
          <FormComponent inputs={[new InputData("232", "text", "label", "error")]}/>
        </div>
      </div>
    );
  }
}

export default App;
