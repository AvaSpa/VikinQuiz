import * as React from 'react';

import './QuestionsComponent.css';

import MainQuestionComponent from './MainQuestionComponent/MainQuestionComponent';
import QuestionsListComponent from './QuestionsListComponent/QuestionsListComponent';

import HttpService from '../../services/HttpService';

interface IProps {
   quizId: number
}

interface IAnswerDto {
   text: string,
   id: number,
   isChecked? : boolean,
   errorMessage?: string
}

interface IQuestionDto {
   id: number,
   correctAnswerId: number,
   text: string,
   answers: IAnswerDto[],
   index?: number,
   titleErrorMessage?: string
}

interface IState {
   activeQuizId: number,
   isEditMode: boolean,
   currentActiveQuestion: IQuestionDto
}
class QuestionsComponent extends React.Component<IProps, IState> {

   //#region fields
   public httpService = new HttpService();
   public readonly endpointUrl = "http://localhost:60151/api/questions";
   public paramsObject = {
      params: {
         quiz: this.props.quizId // quizId 
      }
   }
   public state = {
      isEditMode: false,
      activeQuizId: this.props.quizId, // this.props.quizId
      currentActiveQuestion: 
         {
            id: -1, 
            text: "",
            titleErrorMessage: "",
            correctAnswerId: 1,
            index: 0,
            answers: [
                  { text: "", id: 1, isChecked: true, errorMessage: ""},
                  { text: "", id: 2, isChecked: false, errorMessage: ""},
                  { text: "", id: 3, isChecked: false, errorMessage: ""},
                  { text: "", id: 4, isChecked: false, errorMessage: ""}
               ]
         }
   }

   public refreshQuestionList = { // where the reference to re-ask for questions list (thus re-rendering) the questions list will be stored
      refresh: new Function()
   }
   //#endregion

   //#region helpers
   public createQuestionRequestObject = () => {
      const currentQuestion = this.state.currentActiveQuestion;

      const body : any = {
         id: currentQuestion.id,
         correctAnswerId: currentQuestion.correctAnswerId,
         text: currentQuestion.text,
         answers: []
      };

      for (const answer of currentQuestion.answers) {
         if(true) {
            body.answers.push({
               text : answer.text,
               id: answer.id
            });
         }
      }

      return body;
   }



   public getReferenceToRefreshQuestionList = () => {
      return this.refreshQuestionList;
   }


   
   // check the validity of the question inputs
   public isQuestionInputValid ( question : IQuestionDto ) : boolean {
      this.combinedInputValidators();
      const questionAnswers = question.answers;
      const conditions: boolean[] = [];

      conditions.push(question.text !== "");
      
      for(const answer of questionAnswers) {
         conditions.push(answer.text !== "");
      }

      conditions.push( questionAnswers.filter(answer => {
         return answer.id === question.correctAnswerId
      }).length === 1);

      const finalCondition = conditions.reduce( (sum, next) =>  sum && next );

      return finalCondition; 
   }
   //#endregion

   //#region handlers
   // update state on input value change
   public answerInputChangeHandler = (answerId : any, value : string) => {
      const currentActiveQuestion = this.state.currentActiveQuestion;

      currentActiveQuestion.answers = currentActiveQuestion.answers.map( answer => {
         if(answerId === answer.id) {
            answer.text = value;
         }
         return answer;
      } );

      this.singleInputValidator(answerId);
      this.setState({
         currentActiveQuestion
      });
   }

   public checkboxChangeHandler = (answerId : any) => {

      const currentActiveQuestion = this.state.currentActiveQuestion;
      currentActiveQuestion.correctAnswerId = answerId;

      currentActiveQuestion.answers = currentActiveQuestion.answers.map( answer => {
         answer.isChecked = answer.id === answerId;
         if (answer.id === answerId) {
            answer.id = answerId;
         }
         return answer;
      });
      
      this.setState({
         currentActiveQuestion
      });
   }

   public titleValidator = () => {
      const currentActiveQuestion = this.state.currentActiveQuestion;
      if (currentActiveQuestion.text.length === 0) {
         currentActiveQuestion.titleErrorMessage = "This field is required.";
      }
      else {
         currentActiveQuestion.titleErrorMessage = "";
      }
   }

   public singleInputValidator = (id : number) => {
      const currentActiveQuestion = this.state.currentActiveQuestion;
      for (const answer of currentActiveQuestion.answers) {
         if(answer.id === id) {
            if (answer.text.length === 0) {
               answer.errorMessage = "This field is required.";
            }
            else {
               answer.errorMessage = "";
            }
         }
      }
   }

   public combinedInputValidators() {
      const answers = this.state.currentActiveQuestion.answers;
      this.titleValidator();
      for (const answer of answers) {
         this.singleInputValidator(answer.id);
      }
      this.setState(
         this.state
      )
   }




   public titleChangeHandler = (value: any) => {
      const currentActiveQuestion = this.state.currentActiveQuestion;
      currentActiveQuestion.text = value;
      this.titleValidator();
      this.setState({
         currentActiveQuestion
      });
      
   }

   public deleteButtonClickHandler = (question : any) => {
      // this.deleteQuestionRequest(this.state.activeQuizId);
      this.resetQuestionsData();
      this.deleteQuestionRequest(question, question.id);
   }
   
   public editButtonClickHandler = (question: IQuestionDto) => {
      this.setState({
         currentActiveQuestion: question,
         isEditMode: true
      })

   }

   // reset the state to its default values
   public resetQuestionsData = () => {
      this.state.isEditMode = false;
      this.setState({
         isEditMode: false,
         currentActiveQuestion: {
            id: -1, // questionId
            text: "",
            correctAnswerId: 1,
            index: 0,
            titleErrorMessage: "",
            answers: [
               { text: "", id: 1, isChecked: true, errorMessage: "" },
               { text: "", id: 2, isChecked: false, errorMessage: "" },
               { text: "", id: 3, isChecked: false, errorMessage: "" },
               { text: "", id: 4, isChecked: false, errorMessage: "" }
            ]
         }
      });
   }
   public cancelEditHandler = () => {
      this.refreshQuestionList.refresh()
      this.resetQuestionsData();
   }

   public onSubmitButtonClick = () => {
      const requestQuestionDataObject = this.createQuestionRequestObject(); 
      if (this.state.isEditMode) {
         this.updateExistingQuestionRequest(requestQuestionDataObject)
      } 
      else {
         this.createNewQuestionRequest(requestQuestionDataObject)
      }
   };
   //#endregion

 
   // new question request
   public createNewQuestionRequest = (newQuestionData: IQuestionDto) => {
      if (this.isQuestionInputValid(newQuestionData)) {
         const reqUrl = this.endpointUrl + "?quiz=" + this.props.quizId;
         const request = this.httpService.post(reqUrl, newQuestionData);
         if (request) {
            console.log("-------------CREATE NEW QUIZ REQUEST SENT---------------");
            request
               .then(succesfulRes => {
                  this.resetQuestionsData();
                  this.refreshQuestionList.refresh()
               })
               .catch(failedRes => {
                  console.log(failedRes.data);
               });
         }
      } else {
         // inputs are not right
      }

   }
   // update question request
   public updateExistingQuestionRequest = (updatedQuestionData: IQuestionDto) => {
      if (this.isQuestionInputValid(updatedQuestionData)) {
         const reqUrl = this.endpointUrl + "?quiz=" + this.props.quizId;
         const request = this.httpService.putWithToken(reqUrl, updatedQuestionData);
         if (request) {
            console.log("-------------UPDATE NEW QUIZ REQUETS SENT---------------");
            request
               .then(succesfulRes => {
                  this.refreshQuestionList.refresh()
               })
               .catch(failedRes => {
                  console.log(failedRes.data);
               });
         }
        
      }
      else {
         this.refreshQuestionList.refresh()
         // inputs are not right
      }
   }

   // delete question request
   public deleteQuestionRequest = (question : any, questionId: number) => {
      const reqUrl = `${this.endpointUrl}/${questionId}/?quiz=${this.props.quizId}`;
      const request = this.httpService.deleteWithToken(reqUrl);
      if (request) {
         console.log("-------------DELETE REQUEST SENT---------------");
         request
            .then(succesfulRes => {
               this.refreshQuestionList.refresh()
            })
            .catch(failedRes => {
               console.log(failedRes.data);
            });
      }
   }
   //#endregion


   public render() {
      console.log(this.props.quizId);
      return (
         <div className="questions-container">
            <MainQuestionComponent
               titleErrorMessage={this.state.currentActiveQuestion.titleErrorMessage}
               titleMaxLength={255}
               answerMaxLength={100}
               isEditMode={this.state.isEditMode}

               questionIndex={this.state.currentActiveQuestion.index}
               checkboxChangeHandler={this.checkboxChangeHandler}
               inputChangeHandler={this.answerInputChangeHandler}

               titleChangeHandler={this.titleChangeHandler}
               question={this.state.currentActiveQuestion}

               onSubmitButtonClick={this.onSubmitButtonClick}
               editModeHandler={this.cancelEditHandler}
            />
            <QuestionsListComponent
               getReferenceToRefreshQuestionList={this.getReferenceToRefreshQuestionList}

               endpointUrl={this.endpointUrl}
               paramsObjectt={this.paramsObject}
               questionId={this.state.currentActiveQuestion.id}
               quizId={this.props.quizId}
               // quizId={this.props.quizId}

               editButtonClickHandler={this.editButtonClickHandler}
               deleteButtonClickHandler={this.deleteButtonClickHandler}
            />
         </div>
      );
   }
}

export default QuestionsComponent;