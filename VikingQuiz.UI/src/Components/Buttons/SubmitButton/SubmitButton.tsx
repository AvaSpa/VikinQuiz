import * as React from 'react';
import './SubmitButton.css';

const submitButton = (props: any) =>
{
    return (
        <button className="circle-btn submit-button" onClick={props.click} disabled={props.disabled}/>
    );
}
export default submitButton;
