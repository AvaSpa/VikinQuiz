import * as React from 'react';
import './FormInput.css';

const FormInput: any = (props: any) => {
  const defaultInputClass = 'vq-input form-control';
  const errorInputClass = props.ErrorMessage ? ' input-error' : '';
    return (
       <div className="formgroup col-xs-12">
        <label className="formlabel" htmlFor={props.InputId}>{props.InputLabel}</label>
        <input className={defaultInputClass + errorInputClass} id={props.InputId} name={props.name} value={props.value} type={props.InputType} onChange={props.changed} onFocus={props.focus} />
        <div className="formerror">{props.ErrorMessage}</div>
      </div>
    )
}

export default FormInput;
