import * as React from 'react';
import './FormComponent.css';
import FormInput from './FormInput/FormInput';
import InputData from 'src/entities/InputData';

class FormComponent extends React.Component<any, any> {
   constructor(props: any) {
      super(props);

      this.state = {
         inputs: this.props.inputs,
         url: this.props.url,
         isValid: false
      }
   }


   public changeValueHandler(id: string, event: any) {
      const inputsCopy: InputData[] = this.state.inputs.slice();
      const index: number = inputsCopy.findIndex((input) => input.id === id);
      inputsCopy[index].value = event.target.value;
      this.setState({
         inputs: inputsCopy
      })
   }

   public getFormData(): any {
      const data: any = {};
      this.state.inputs.forEach((input: InputData) => {
         data[input.name] = input.value;
      });
      return data;
   }

   public submitDataHandler = () => {
      const url: string = this.state.url;
      const formData: any = this.getFormData();

      if (this.getValidityState(true)) {
         this.props.onSubmit(url, formData);
      }

      const validity = this.getValidityState(false);

      if (validity !== this.state.isValid) {
         this.setState({
            isValid: validity
         });
      }
   }

   //   public changeErrorStateOfInput = (id : string, errorMessage : string) => {
   //      const item  = this.getItemById(id, this.state.inputs);
   //   }

   public getItemById(id: string, inputs: any) {
      const inputsCopy: InputData[] = inputs.slice();
      const index: number = inputsCopy.findIndex((input) => input.id === id);
      return {
         index,
         item: inputsCopy[index]
      };
   }

   public getCopyOfInputs(inputs: any) {
      return inputs.slice();
   }

   public checkValidityOfAll() {
      if (this.props.validator) {
         for (const input of this.state.inputs) {
            this.props.validator(
               this.state.inputs,
               this.props.validationRules,
               input.id,
               {
                  getCopyOfInputs: this.getCopyOfInputs,
                  getItemById: this.getItemById,
                  changeErrorMessageOf: this.changeErrorMessageOf
               }
            );
         }
      }
   }




   public renderInput(input: InputData) {
      return (
         <FormInput key={input.id}
            InputId={input.id}
            InputType={input.type}
            InputLabel={input.label}
            value={input.value}
            ErrorMessage={input.errorMessage}
            changed={this.changeHandler.bind(this, input)}
         />
      )
   }


   public changeErrorMessageOf = (id: string, errorMessage: string) => {
      
      const inputsData = this.getItemById(id, this.state.inputs);
      if (this.state.inputs[inputsData.index].errorMessage !== errorMessage) {
         //   console.log(this.state.inputs);
         const inputsCopy = this.getCopyOfInputs(this.state.inputs);
         inputsCopy[inputsData.index].errorMessage = errorMessage;
         this.setState({
            inputs: inputsCopy
         });
      }

   }



   public changeHandler = (input: any, evt: any) => {

      this.changeValueHandler(input.id, evt);

      if (this.props.validator) {

         this.props.validator(
            this.state.inputs,
            this.props.validationRules,
            input.id,
            {
               getCopyOfInputs: this.getCopyOfInputs,
               getItemById: this.getItemById,
               changeErrorMessageOf: this.changeErrorMessageOf
            }
         );
      }

      const validity = this.getValidityState(false);
      //   console.log(validity, this.state.isValid);
      if (validity !== this.state.isValid) {
         this.setState({
            isValid: validity
         });
      }
   }

   public getValidityState(checkAll: boolean) {
      if (this.props.validator) {
         if (checkAll) {
            this.checkValidityOfAll()
         }
         for (const input of this.state.inputs) {
            if (input.errorMessage !== '') {
               return false;
            }
         }
      }
      return true;
   }


   public render() {
      return (
         <div className="form-body container-fluid">
            {this.state.inputs.map((input: InputData) => this.renderInput(input))}
            <button disabled={!this.state.isValid} className="submitButton" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
         </div>
      );
   }
}

export default FormComponent;
