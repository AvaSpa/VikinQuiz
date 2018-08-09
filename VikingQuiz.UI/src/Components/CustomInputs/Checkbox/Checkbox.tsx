import * as React from 'react';
import './Checkbox.css';

const CustomCheckbox: any = (props: any) => {

   return (
      <label className="custom-checkbox">
         <input type="checkbox" name="test" checked={props.checked} onChange={props.changeHandler}/>
         <span className="checkbox-display" />
      </label>
   )
}

export default CustomCheckbox;