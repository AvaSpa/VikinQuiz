import * as React from 'react';
import './FormInput.css';

const FormInput: any = (props: any) => {
  const defaultInputClass = 'vq-input form-control';
  const errorInputClass = props.ErrorMessage ? ' input-error' : '';
    return (
       <div className="form-group col-xs-12">
            <label className="form-label" htmlFor={props.InputId}>{props.InputLabel}</label>
            <input id={props.InputId} name={props.name} className={defaultInputClass + errorInputClass} type={props.InputType} onChange={props.changed} />
        <div className="form-error">{props.ErrorMessage}</div>
      </div>
    )
}

export default FormInput;
