import * as React from 'react';
import './FormComponent.css';
import FormInput from './FormInput/FormInput';
import InputData from 'src/entities/InputData';



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
    inputsCopy[index].value = event.target.value;
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
      <div className="form-body">
        {this.state.inputs.map((input: InputData) => this.renderInput(input))}
      </div>
      // <div className="form-body">
      //   <FormInput InputId="user-name" InputType="text" InputLabel="Name" ErrorMessage="" ShowError={false}/>
      //   <FormInput InputId="user-email" InputType="email" InputLabel="Email" ErrorMessage="invalid email" ShowError={true}/>
      //   <FormInput InputId="user-password" InputType="password" InputLabel="Password" ErrorMessage="" ShowError={false}/>
      //   <FormInput InputId="user-confpass" InputType="password" InputLabel="Confirm Password" ErrorMessage="passwords do not match" ShowError={true}/>
    );
  }
}

export default FormComponent;
