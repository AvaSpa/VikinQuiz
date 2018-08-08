import * as React from 'react';
import './YesNoComponent.css';


class YesNoComponent extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
  
        this.state = {
            serverMessage: ''
        }
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
        )
    }
}

export default YesNoComponent;