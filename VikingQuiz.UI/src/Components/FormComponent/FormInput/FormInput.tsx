import * as React from 'react';
import './FormInput.css';

const FormInput: any = (props: any) => {
    return (
       <div className="formgroup col-xs-12">
        <label className="formlabel" htmlFor={props.InputId}>{props.InputLabel}</label>
        <input id={props.InputId} name={props.name} className="myinput form-control" type={props.InputType} onChange={props.changed}/>
        <div className="formerror">{props.ErrorMessage}</div>
      </div>
    )
}

export default FormInput;