import * as React from 'react';
import './QuizItem.css';
import ManageQuizComponent from '../MyQuizesPage/ManageQuizComponent/ManageQuizComponent';

class QuizItem extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
  
        this.state = {
            id: '',
            handleChildDelete: this.props.handleChildDelete,
            isSelected: false
        }

        this.SetupHandlers();

      }

      public SetupHandlers = () => {
        this.handleDeleteSelection = this.handleDeleteSelection.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
      }

      public componentWillMount(){
          this.setState({isSelected:false,
                        id: this.props.id
                        })
      }


      public handleDeleteSelection(){
        this.setState({isSelected: true});
      }

     public render(){
         return(
            <div className={"quiz-item-container" + (this.state.isSelected ? " selected-for-deletion" : "")}>
                <div className="quiz-photo-container" > 
                    <img className="quiz-photo" src={this.props.photo} />
                    <ManageQuizComponent deleteSelection={this.handleDeleteSelection} id={this.state.id} handleChildDelete={this.state.handleChildDelete}
                            noDeleteAnswer={this.componentWillMount}/>
                </div>       
                <div className="quiz-title">
                    {this.props.title}
                </div> 
            </div>
         )
     } 
}

export default QuizItem;