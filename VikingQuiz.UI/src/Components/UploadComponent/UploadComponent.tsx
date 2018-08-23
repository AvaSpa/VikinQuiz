import * as React from 'react';
import './UploadComponent.css';
import UploadButton from '../Buttons/UploadButton/UploadButton';


class UploadComponent extends React.Component<any, any> {

    private fileInputRef: any = React.createRef();

    public fileSelectHandler = (event: any) => {
        const file = event.target.files[0];

        if(!this.props.imageValidator.isImageValid(file)){
            this.props.error();
            return;
        }
        
        this.props.upload(file);
    }

    public uploadPhotoHandler = () => {
        this.fileInputRef.current.click();
    }

    public render(){
        return (
            <div className={"upload-component " + this.props.classes.join(' ')}>
                <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInputRef} />
                <UploadButton click={this.uploadPhotoHandler} disabled={this.props.disabled}/>
            </div>
        );
    }


 
}

export default UploadComponent;