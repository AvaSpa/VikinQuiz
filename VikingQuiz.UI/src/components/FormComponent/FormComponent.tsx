import * as React from 'react';
import './FormComponent.css';
import FormInput from './FormInput/FormInput';
import InputData from 'src/entities/InputData';

class FormComponent extends React.Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      inputs: this.props.inputs,
      url: this.props.url
    }
  }

  // public componentWillMount(){
  //   this.setState({
  //     inputs: this.props.inputs
  //   });
  // }

  public changeValueHandler(id: string, event: any){
    const inputsCopy: InputData[] = this.state.inputs.slice();
    const index: number = inputsCopy.findIndex((input) => input.id === id);
    inputsCopy[index].value = event.target.value;
    this.setState({
      inputs: inputsCopy
    })
  }

  public getFormData(): any{
    const data: any = {};
    this.state.inputs.forEach((input: InputData) => {
      data[input.name] = input.value;
    });
    return data;
  }

  public submitDataHandler = () => {
    const url: string = this.state.url;
    const formData: any = this.getFormData();

    this.props.onSubmit(url, formData);
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
        <button className="submitButton" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
      </div>
    );
  }
}

export default FormComponent;
