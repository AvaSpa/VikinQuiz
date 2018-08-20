import * as React from 'react';
import './Checkbox.css';

const CustomCheckbox: any = (props: any) => {
    let labelClassList = ["custom-checkbox"]
    if (props.labelClassNames) {
        labelClassList = labelClassList.concat(props.labelClassNames);
    }

    let displayClassList = ["checkbox-display"]
    if (props.displayClassNames) {
        displayClassList = displayClassList.concat(props.displayClassNames);
    }

    let displayContainerClassList = ["checkbox-display-container"]
    if (props.displayContainerClassNames) {
        displayContainerClassList = displayClassList.concat(props.displayContainerClassList);
    }

    return <label className={labelClassList.join(" ")} htmlFor={props.inputId || null}>
        <input id={props.inputId || null} type="checkbox" name="test" checked={props.checked} onChange={props.changeHandler} {...props.inputOptions} />
        {props.labelText || ""}
        <div className={displayContainerClassList.join(" ")}>
            <span className={displayClassList.join(" ")} />
        </div>
    </label>;
}

export default CustomCheckbox;