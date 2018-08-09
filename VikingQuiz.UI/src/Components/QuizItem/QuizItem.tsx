import * as React from 'react';
import './QuizItem.css';
import ManageQuizComponent from '../MyQuizesPage/ManageQuizComponent/ManageQuizComponent';

class QuizItem extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
  
        this.state = {
            isHidden: true,
            id: '',
            handleChildDelete: this.props.handleChildDelete,
            isSelected: false
        }

        this.SetupHandlers();

      }

      public SetupHandlers = () => {
        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleDeleteSelection = this.handleDeleteSelection.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
      }

      public componentWillMount(){
          this.setState({isSelected:false,
                        id: this.props.id
                        })
      }

      public handleMouseHover(){
            this.setState({isHidden: false});
      }

      public handleMouseOut(){
          this.setState({isHidden: true});
      }

      public handleDeleteSelection(){
        this.setState({isSelected: true});
      }

     public render(){
         return(
            <div className="quiz-item-container">
                <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseOut}>
                    {this.state.isHidden && !this.state.isSelected ? 
                    (
                        <div className="quiz-photo-container"  >  
                            <img className="quiz-photo" src={this.props.photo} />
                        </div>
                    )
                    :   (
                        <ManageQuizComponent deleteSelection={this.handleDeleteSelection} id={this.state.id} handleChildDelete={this.state.handleChildDelete}
                            noDeleteAnswer={this.componentWillMount}/>
                        )
                    }
                </div>       
                <div className="quiz-title">
                    {this.props.title}
                </div> 
            </div>
         )
     } 
}

export default QuizItem;