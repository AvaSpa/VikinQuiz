import * as React from 'react';
import './MainQuestionComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import SingleAnswer from './SingleAnswer/SingleAnswer';
import GenericButton from '../../Buttons/GenericButton/GenericButton';

const MainQuestionComponent = function(props : any) {

   const titleChangeHandler = function (evt: any) {
      props.titleChangeHandler(evt.target.value);
   }

   const answersToJsx = function(questionsData: any[]) {
      let jsxElements : any = [];

      jsxElements = questionsData.map(answer => {
         return (
            <SingleAnswer
               errorMessage={answer.errorMessage}
               key={answer.id}
               answerMaxLength={props.answerMaxLength}
               value={answer.text}
               answerId={answer.id}
               checked={answer.isChecked}
               
               checkboxChangeHandler={props.checkboxChangeHandler}
               inputChangeHandler={props.inputChangeHandler}
            />
         );
      });

      return jsxElements;
   }
   

   let cancelButton = null;
   if(props.isEditMode) {
      cancelButton = (
         <GenericButton
            onClick={props.editModeHandler}
            classNames={["cancel-button"]}
            innerText={"Cancel"}
         />
      );
   }
      
      return (
         <div className='main-question'>
            <div className="container-message">{`Question No. ${props.questionIndex > 0 ? props.questionIndex: ''}`}</div>
            <div className="question-answers">
               <FormInput
                  ErrorMessage={props.titleErrorMessage}
                  maxlength={props.titleMaxLength ? props.answerMaxLength : null}
                  titleMaxLength={props.titleMaxLength}
                  InputType="text"
                  ContainerClassName="question-title"
                  InputId="question-title"
                  InputLabel={<span>Question: </span>}
                  value={props.question.text}
                  
                  changed={titleChangeHandler}
               />
            </div>

            <div className="answers-list">
               <div className="answers-message" >Answers</div>
               <div className="answers" >
                  {answersToJsx(props.question.answers)}
               </div>
            </div>

            <SubmitButton 
               click={props.onSubmitButtonClick} 
            />
            {cancelButton} 
         </div>
      );
}

export default MainQuestionComponent;