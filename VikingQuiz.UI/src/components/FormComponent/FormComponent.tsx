import * as React from 'react';
import './FormComponent.css';
import FormInput from './FormInput/FormInput';
import InputData from '../../entities/InputData';



interface IProps{
  inputs: InputData[];
}

interface IState{
  inputs: InputData[];
}

class FormComponent extends React.Component<IState, IProps> {
  constructor(props: any) {
    super(props);

    this.state = {
      inputs: []
    }
  }

  public componentWillMount(){
    this.setState({
      inputs: this.props.inputs
    });
  }

  public changeValueHandler(id: string, event: any){
    const inputsCopy: InputData[] = this.state.inputs.slice();
    const index: number = inputsCopy.findIndex((input) => input.id === id);
    inputsCopy[index].value = event.taget.value;
    this.setState({
      inputs: inputsCopy
    })
  }

  public renderInput(input: InputData){
    return(
      <FormInput key = {input.id}
                 InputId={input.id} 
                 InputType={input.type} 
                 InputLabel={input.label} 
                 ErrorMessage={input.errorMessage} 
                 changed={this.changeValueHandler.bind(this, input.id)}
                 />
    )
  }


  public render() {
    return (
      <div className="row">
        <form className="col-md-4 col-md-offset-4">
          <div className="form-container">
            <div className="form-body">
              {this.state.inputs.map((input: InputData) => 
                this.renderInput(input)
              )}
              {/* <FormInput InputId="user-name" InputType="text" InputLabel="Name" ErrorMessage="" ShowError={false}/>
              <FormInput InputId="user-email" InputType="email" InputLabel="Email" ErrorMessage="invalid email" ShowError={true}/>
              <FormInput InputId="user-password" InputType="password" InputLabel="Password" ErrorMessage="" ShowError={false}/>
              <FormInput InputId="user-confpass" InputType="password" InputLabel="Confirm Password" ErrorMessage="passwords do not match" ShowError={true}/> */}
            </div>
          </div>
        </form>
      </div>
      
    );
  }
}

export default FormComponent;
