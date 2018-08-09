import * as React from 'react';
import './YesNoComponent.css';

interface IYesNoComponentProps {
    confirmationMessage: string;
    handleYesClick(event: any): void;
    handleNoClick(event: any): void;
    id(props: any): void;
}

const YesNoComponent : any = (props: IYesNoComponentProps) => {

        return(
            <>
            <div className="block-page-for-confirmation"/>
            <div className="yes-no-container">
                <div className="question-message"> 
                    {props.confirmationMessage}
                </div>
                <div className="yes-no-buttons">
                    <button className="yes-button" onClick={props.handleYesClick}/>
                    <button className="no-button" onClick={props.handleNoClick}/>
                </div>
            </div>
            </>         
        );
    }

export default YesNoComponent;
