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
      let confirmDialogBox = null;
      if (this.state.confirmBoxVisibility) {
         confirmDialogBox = (
            <YesNoComponent
               handleYesClick={this.handleYesClick}
               handleNoClick={this.handleNoClick}
               confirmationMessage={"Are you sure you want to delete this question?"}
            />
         )
      }

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
            {confirmDialogBox}
         </div>

      );
   }


}
export default DeleteQuestionButton;
