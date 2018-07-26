import * as React from 'react';
import FormInput from './FormInput/FormInput';
import './FormComponent.css';

class RegisterForm extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
      <div className="row">
        <form className="col-md-4 col-md-offset-4">
          <div className="form-container">
            <div className="form-body">
              <FormInput InputId="user-name" InputType="text" InputLabel="Name" ErrorMessage="" ShowError={false}/>
              <FormInput InputId="user-email" InputType="email" InputLabel="Email" ErrorMessage="invalid email" ShowError={true}/>
              <FormInput InputId="user-password" InputType="password" InputLabel="Password" ErrorMessage="" ShowError={false}/>
              <FormInput InputId="user-confpass" InputType="password" InputLabel="Confirm Password" ErrorMessage="passwords do not match" ShowError={true}/>
            </div>
          </div>
        </form>
      </div>
      
    );
  }
}

export default RegisterForm;
