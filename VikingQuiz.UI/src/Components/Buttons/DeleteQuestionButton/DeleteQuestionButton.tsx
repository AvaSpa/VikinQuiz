import * as React from 'react';
import "./DeleteQuestionButton.css";
import YesNoComponent from '../../YesNoComponent/YesNoComponent';


class DeleteQuestionButton extends React.Component<any, any>{

   public state = {
      confirmBoxVisibility: false
   }

   public elementClasses: string[] = ["generic-button"];
   public handleYesClick = () => {
      this.setState({
         confirmBoxVisibility: false
      });
      this.props.deleteHandler(this.props.questionId);
   }

   public handleNoClick = () => {
      this.setState({
         confirmBoxVisibility: false
      });
      //
   }

   public onClick = () => {
      this.setState({
         confirmBoxVisibility: true
      });
   }

   public render() {
      if (this.props.classNames) {
         this.elementClasses = this.elementClasses.concat(this.props.classNames);
      }
      return (
         <div className={"delete-button-container"}>
            <button
               className={this.elementClasses.join(" ")}
               onClick={this.onClick}
               disabled={this.props.disabled}>

               {this.props.innerText}
            </button>
            {this.state.confirmBoxVisibility? (<YesNoComponent handleYesClick={this.handleYesClick} handleNoClick={this.handleNoClick} confirmationMessage={"Are you sure you want to delete this question?"} />):null}
         </div>

      );
   }


}
export default DeleteQuestionButton;


/* 

      }

    public render(): any{
        return(
            <>
            <div className="block_Page_For_Confirmation"/>
            <div className="yes_No_Container">
                <div className="question_Message">
                    {this.props.confirmationMessage}
                </div>
                <div className="yes_No_Buttons">
                    <button className="yes_Button" onClick={this.props.handleYesClick}/>
                    <button className="no_Button" onClick={this.props.handleNoClick}/>
                </div>
            </div>
            </>

*/