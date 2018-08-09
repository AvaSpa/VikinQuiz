import * as React from 'react';
import './QuestionsListComponent.css';
import GenericButton from '../../Buttons/GenericButton/GenericButton';
import HttpService from '../../../services/HttpService';
import DeleteQuestionButton from '../../Buttons/DeleteQuestionButton/DeleteQuestionButton';


const getNewQuestionsList = (ctx : any, httpService : any) => {
   const reqUrl = ctx.props.endpointUrl + "?quiz=" + ctx.props.quizId;
   const request = httpService.get(reqUrl, ctx.props.paramsObject);
   if (request) {
      console.log("-------------REQUEST SENT---------------");
      request
         .then( (succesfulRes : any) => {
            const questionsList = succesfulRes.data;
            ctx.addCheckedStateToQuestions(questionsList);
            ctx.addIndexPropertyToQuestions(questionsList);
            ctx.addErrorMesssageToQuestions(questionsList);
            ctx.setState({
               questionsData: questionsList
            });
         })
         .catch( (failedRes : any) => {
            console.log(failedRes)
         });
   }
}

class QuestionsListComponent extends React.Component<any, any> {

   public httpService = new HttpService();
   public state = {
      questionsData: [] 
   }

   public refreshRef : any = this.props.getReferenceToRefreshQuestionList();
   
   constructor(props: any) {
      super(props);
      this.refreshRef.refresh = getNewQuestionsList.bind(this, this, this.httpService);
   }

   public addCheckedStateToQuestions = (questions : any) => {

      for(const question of questions) {

         for(const answer of question.answers) {
            answer.isChecked = ( answer.id === question.correctAnswerId );
         }

      }
      
   }

   public addErrorMesssageToQuestions = (questions : any) => {

      for(const question of questions) {

         for(const answer of question.answers) {
            answer.errorMessage = "";
         }

      }
      
   }
   public addIndexPropertyToQuestions = (questions : any) => {

      for(const question of questions) {
         question.index = questions.indexOf(question) + 1
      }

   }


   public componentWillMount() {
      getNewQuestionsList(this, this.httpService);
   }



   public editButtonClickHandler = (question : any) => {
      const ctx = this;
      return function() {
         ctx.props.editButtonClickHandler(question);
      }
   }




   public questionsToJsx = (questionsData: any[]) => {
      let jsxElements: any;

      jsxElements = questionsData.map( (question, index) => {
         return (
            <li key={question.id}>
               <div className="question">
                  <span className="question-text">
                     <span className="question-number">{question.index}</span>
                     {question.text}
                  </span>
                  <GenericButton onClick={this.editButtonClickHandler(question)} classNames={["edit-button"]} />
                  <DeleteQuestionButton deleteHandler={this.props.deleteButtonClickHandler} classNames={["delete-button"]} questionId={question.id}/>
               </div>
            </li>
         );
      });

      return jsxElements;
   }

 
 

   public render() {
      return (
         <div className="questions-list">
            <h3 className="questions-list-title">Questions List</h3>
               <ul>
                  {this.questionsToJsx(this.state.questionsData)}
               </ul>
         </div>
      );
   }

}

export default QuestionsListComponent;

