import * as React from 'react';
import './LoginFormComponent.css';
import InputData from 'src/entities/InputData';
import FormComponent from '../FormComponent/FormComponent';

class LoginFormComponent extends FormComponent {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="form-body container-fluid">
        {this.state.inputs.map((input: InputData) => this.renderInput(input))}
        <a href="#" className="forget-pass">forgot password</a>
        <label className="remember-me" htmlFor="rememberMe">remember me</label>
        <input id="rememberMe" name="rememberMe" className="myinput form-control" type="checkbox"/>
        <button className="submitButton" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
      </div>
    );
  }
}

export default LoginFormComponent;