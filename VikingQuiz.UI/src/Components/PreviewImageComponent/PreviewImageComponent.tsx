import * as React from 'react';
import './PreviewImageComponent.css';

const previewImageComponent = (props: any) => {
        return (
            <div className="preview">
                {props.iamge ? <img className="preview-image" src={props.image} alt="preview" /> : null}
            </div>
        );
}

export default previewImageComponent;