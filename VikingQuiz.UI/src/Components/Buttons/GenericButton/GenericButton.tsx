import * as React from 'react';
import "./GenericButton.css";

const genericButton = (props: any) =>
{
   let elementClasses : string[] = ["generic-button"];
   if(props.classNames) {
      elementClasses = elementClasses.concat(props.classNames);
   }
    return (
        <button className={elementClasses.join(" ")} onClick={props.onClick} disabled={props.disabled}>{props.innerText}</button>
    );
}
export default genericButton;