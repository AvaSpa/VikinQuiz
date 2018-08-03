import * as React from 'react';
import './LoginFormComponent.css';
import IInputData from 'src/entities/IInputData';
import FormComponent from '../FormComponent/FormComponent';

class LoginFormComponent extends FormComponent {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="form-body container-fluid">
        {this.state.inputs.map((input: IInputData) => this.renderInput(input))}
        <div className="forget-remember col-xs-12">
          <a href="#" className="forget-pass col-xs-6">forgot password</a>
          <div className="custom-control custom-checkbox col-xs-6">

            <label className="custom-control-label" htmlFor="remember-me">
               remember me
               <input className="custom-control-input" id="remember-me" name="remember-me" type="checkbox" onChange={this.props.checkboxChangedHandle}/>
               <div className="checkbox-style" />
            </label>
            
          </div>
        </div>
        <button disabled={!this.state.isValid} className="submit-button" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
      </div>
    );
  }
}

export default LoginFormComponent;