import * as React from 'react';
import './FormInput.css';
// import {ControlLabel, FormControl, FormGroup} from 'react-bootstrap';

interface IProps{
    InputId:          string    // id to be associated to the input
    InputType:        string,   // the type of input (e.g. text, password, email etc.)
    InputLabel:       string,   // the text the label above the input
    ErrorMessage:     string,   // the text of the error message
    ShowError:        boolean   // whether or not to show the error
}

interface IStates{
    InputId: string
    InputType: string,
    InputLabel: string,
    ErrorMessage: string,
    ShowError: boolean
}

class FormInput extends React.Component<IProps, IStates> {
  constructor(props: any) {
    super(props);
    this.state = {
        ErrorMessage: "",
        InputId: "my-input",
        InputLabel: "None",
        InputType: "text",
        ShowError: false
    };
  }

  public componentDidMount()
  {
    if(this.props.InputId !== this.state.InputId){
      this.setState({
        ErrorMessage: this.props.ErrorMessage,
        InputId: this.props.InputId,
        InputLabel: this.props.InputLabel,
        InputType: this.props.InputType,
        ShowError: this.props.ShowError
      });
    }
  }

  public render() {
    return (

      // <FormGroup>
      //   <ControlLabel>{this.state.InputLabel}</ControlLabel>
      //   <FormControl id={this.state.InputId} type={this.state.InputType} placeholder={this.state.InputPlaceholder} />

      // </FormGroup>

      <div className="formgroup">
        <label className="formlabel" htmlFor={this.state.InputId}>{this.state.InputLabel}</label>
        <input id={this.state.InputId} className="myinput" type={this.state.InputType} />
        {this.state.ShowError ? <div className="formerror">{this.state.ErrorMessage}</div> : null}
      </div>
    );
  }
}

export default FormInput;