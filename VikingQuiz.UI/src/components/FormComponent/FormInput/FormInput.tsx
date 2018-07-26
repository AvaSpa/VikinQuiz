import * as React from 'react';
import './FormInput.css';

const formInput: any = (props: any) => {
    return (
        <div className="formgroup">
        <label className="formlabel" htmlFor={props.InputId}>{props.InputLabel}</label>
        <input id={props.InputId} className="myinput" type={props.InputType} onChange={props.changed}/>
        <div className="formerror">{props.ErrorMessage}</div>
      </div>
    )
}

export default formInput;