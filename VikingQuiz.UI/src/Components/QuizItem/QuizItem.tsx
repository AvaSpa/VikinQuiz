import * as React from 'react';
import './QuizItem.css';
import ManageQuizComponent from '../MyQuizesPage/ManageQuizComponent/ManageQuizComponent';


class QuizItem extends React.Component<any, any>{
    constructor(props: any) {
        super(props);
  
        this.state = {
            serverMessage: '',
            redirect: false,
            isHidden: true,
            id: this.props.id,
            handleChildDelete: this.props.handleChildDelete,
            isSelected: false
        }

        this.handleMouseHover = this.handleMouseHover.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleDeleteSelection = this.handleDeleteSelection.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
      }

      public componentWillMount(){
          this.setState({isSelected:false})
      }

      public handleMouseHover(){
            this.setState({
                isHidden: false
            });
      }

      public handleMouseOut(){
          this.setState({
              isHidden: true
          });
      }

      public handleDeleteSelection(){
        this.setState({
            isSelected: true
        });
      }

     public render(){

         return(
            <div className="quiz_Item_Container">
                <div onMouseEnter={this.handleMouseHover} onMouseLeave={this.handleMouseOut}>
                    {this.state.isHidden && !this.state.isSelected ? (
                        <div className="quiz_Photo_Container"  >  
                            <img className="photo" src={this.props.photo} />
                        </div>)
                            : (<ManageQuizComponent deleteSelection={this.handleDeleteSelection} id={this.state.id} handleChildDelete={this.state.handleChildDelete}
                            noDeleteAnswer={this.componentWillMount}/>)}
                </div>       
                <div className="quiz_Title">
                    {this.props.title}
                </div> 
            </div>
         )
     } 
}

export default QuizItem;