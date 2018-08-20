import * as React from 'react';
import './SingleAnswer.css';
import CustomCheckbox from '../../../CustomInputs/Checkbox/Checkbox';
import FormInput from '../../../FormComponent/FormInput/FormInput';

class SingleAnswer extends React.Component <any, any> {
      public inputChangeHandler = (evt : any) => {
         this.props.inputChangeHandler(this.props.answerId, evt.target.value);
      }

      public checkboxChangeHandler = (evt : any) => {
         this.props.checkboxChangeHandler(this.props.answerId, evt.target.value);
      }


      
      public render() {
         return (
            <div className="answer" >
               <div className="answer-text">
                  <FormInput

                     changed={this.inputChangeHandler}
                     ErrorMessage={this.props.errorMessage}
                     value={this.props.value}
                     maxlength={this.props.answerMaxLength ? this.props.answerMaxLength : null}
                     InputClassName={this.props.checked ? "checked-input " : ""}
                     ContainerClassName="answer-input "
                     InputId={"answer-" + this.props.answerId}
                     InputLabel={<img className="answer-image" src={this.props.imgUrl} />}
                     InputType="text"
                  />
               </div>
               <div className="answer-checkbox">
                  <CustomCheckbox 
                     changeHandler={this.checkboxChangeHandler}
                     checked={this.props.checked}
                  />
               </div>
            </div>
         )
      }
}

export default SingleAnswer;