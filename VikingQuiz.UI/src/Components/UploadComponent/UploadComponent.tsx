import * as React from 'react';
import './UploadComponent.css';
import UploadButton from '../Buttons/UploadButton/UploadButton';

class UploadComponent extends React.Component<any, any>{
    private fileInputRef: any = React.createRef();


    public uploadPhotoHandler = () => {
        this.fileInputRef.current.click();
    }

    public fileSelectHandler = (event: any) => {
        const file = event.target.files[0];
        this.props.processPicture(file);
    }

    public render() {
        return (
            <div>
                <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInputRef} />
                <UploadButton click={this.uploadPhotoHandler} disabled={this.props.disabledButton}/>
            </div>
        )
    }

    
}

export default UploadComponent;