import * as React from 'react';
import './UploadButton.css';
import '../CircleButton.css';

const uploadButton = (props: any) => {
        return (
            <button className="circle-button upload-button" onClick={props.click} disabled={props.disabled}/>
        );
}

export default uploadButton;