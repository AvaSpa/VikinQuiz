import * as React from 'react';
import './MainQuestionComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import SingleAnswer from './SingleAnswer/SingleAnswer';
import GenericButton from '../../Buttons/GenericButton/GenericButton';
import HttpService from 'src/services/HttpService';
import {apiUrl} from "src/constants";

class MainQuestionComponent extends React.Component<any, any> {
   public apiEndpoint = apiUrl + "api/storage/";
   public containerName: string = "answer-pictures";
   public httpService: HttpService = new HttpService();

   public state = {
      imgUrl: "http://via.placeholder.com/150x150",
      isImageAPlaceholder: false
   }  

   public constructUrl = function(urlPath : string, index : number, fileExtension : string) {
      return urlPath + (index + 1) + fileExtension;
   }

   public titleChangeHandler = (evt: any) => {
      this.props.titleChangeHandler(evt.target.value);
   }

   public componentWillMount() {
      const request = this.httpService.get(this.apiEndpoint + this.containerName);

      request.then( (succesfulResponse : any) => {
         console.log(succesfulResponse);
         this.setState({
            imgUrl: succesfulResponse.data,
            isImageAPlaceholder: true
         });
      });
   }

   public answersToJsx = (questionsData: any[]) => {
      let jsxElements: any = [];
      

      jsxElements = questionsData.map((answer, index) => {
         return (
            <SingleAnswer
               errorMessage={answer.errorMessage}
               key={answer.id}
               answerMaxLength={this.props.answerMaxLength}
               value={answer.text}
               answerId={answer.id}
               checked={answer.isChecked}
               index={index}
               imgUrl={this.state.isImageAPlaceholder ? this.constructUrl(this.state.imgUrl, index, ".png") : this.state.imgUrl }
               checkboxChangeHandler={this.props.checkboxChangeHandler}
               inputChangeHandler={this.props.inputChangeHandler}
            />
         );
      });

      return jsxElements;
   }


   public render() {
      let cancelButton = null;
      if (this.props.isEditMode) {
         cancelButton = (
            <GenericButton
               onClick={this.props.editModeHandler}
               classNames={["cancel-button"]}
               innerText={"Cancel"}
            />
         );
      }
      return (<div className='main-question'>
         <div className="container-message">{`Question No. ${this.props.questionIndex > 0 ? this.props.questionIndex : ''}`}</div>
         <div className="question-answers">
            <FormInput
               ErrorMessage={this.props.titleErrorMessage}
               maxlength={this.props.titleMaxLength ? this.props.answerMaxLength : null}
               titleMaxLength={this.props.titleMaxLength}
               InputType="text"
               ContainerClassName="question-title"
               InputId="question-title"
               InputLabel={<span>Question: </span>}
               value={this.props.question.text}

               changed={this.titleChangeHandler}
            />
         </div>

         <div className="answers-list">
            <div className="answers-message" >Answers</div>
            <div className="answers" >
               {this.answersToJsx(this.props.question.answers)}
            </div>
         </div>

         <SubmitButton
            click={this.props.onSubmitButtonClick}
         />
         {cancelButton}
      </div>
      );
   }

}

export default MainQuestionComponent;