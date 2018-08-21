import * as React from 'react';
import { Link } from "react-router-dom";
import './LoginFormComponent.css';
import IInputData from 'src/entities/IInputData';
import FormComponent from '../FormComponent/FormComponent';
import Checkbox from '../CustomInputs/Checkbox/Checkbox';


class LoginFormComponent extends FormComponent {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return (
      <div className="form-body container-fluid login-form-container">
        {this.state.inputs.map((input: IInputData) => this.renderInput(input))}
        <div className="forget-remember col-xs-12">
          <Link to="/forgot" className="forget-pass">forgot password</Link>
        <div className="custom-control custom-checkbox-login">
            <Checkbox
                labelText="REMEMBER ME"
                labelClassNames={["remember-me-checkbox"]}
                inputId="rememberMe"
                inputOptions={{
                    name: "rememberMe"
                }}
            />
        </div>
        </div>
        <button disabled={!this.state.isValid} className="submit-button" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
      </div>
    );
  }
}

export default LoginFormComponent;