import * as React from 'react';
import './FormInput.css';

const formInput: any = (props: any) => {
  const defaultInputClass = 'vq-input form-control';
  const errorInputClass = props.ErrorMessage ? ' input-error' : '';
    return (
       <div className="formgroup col-xs-12">
            <label className="formlabel" htmlFor={props.InputId}>{props.InputLabel}</label>
            <input id={props.InputId} name={props.name} className={defaultInputClass + errorInputClass} type={props.InputType} onChange={props.changed} />
        <div className="formerror">{props.ErrorMessage}</div>
      </div>
    )
}

export default FormInput;
