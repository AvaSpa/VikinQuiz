import * as React from 'react';
import './FormInput.css';

const formInput: any = (props: any) => {
  const defaultInputClass = 'vq-input form-control';
  const errorInputClass = props.ErrorMessage ? ' input-error' : '';
    return (
       <div className={props.ContainerClassName ? props.ContainerClassName : "formgroup col-xs-12"}>
            <label 
               className="formlabel" 
               htmlFor={props.InputId}
            >
               {props.InputLabel}
            </label>
            <input

               maxLength={props.maxlength || null}

               id={props.InputId}
               name={props.name}
               className={(props.InputClassName ? props.InputClassName : "") + defaultInputClass + errorInputClass}
               type={props.InputType}
               onChange={props.changed}
               value={props.value}
               onFocus={props.focus}
               readOnly={props.readonly}
            />
        <div className="formerror">{props.ErrorMessage}</div>
      </div>
    )
}

export default formInput;
