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
        <div className="forget-remember col-xs-12">
          <a href="#" className="forget-pass col-xs-6">FORGOT PASSWORD</a>
          <div className="custom-control custom-checkbox col-xs-6">

            <label className="custom-control-label" htmlFor="rememberMe">
               REMEMBER ME
               <input className="custom-control-input" id="rememberMe" name="rememberMe" type="checkbox"/>
               <div className="checkbox-style" />
            </label>
            
          </div>
        </div>
        <button className="submitButton" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
      </div>
    );
  }
}

export default LoginFormComponent;