import * as React from 'react';
import './UploadComponent.css';
import UploadButton from '../Buttons/UploadButton/UploadButton';
import PreviewImageComponent from '../PreviewImageComponent/PreviewImageComponent';

class UploadComponent extends React.Component<any, any> {

    private fileInputRef: any = React.createRef();

    public constructor(props: any){
        super(props);

        this.state = {
            imageFile: null,
            imageSource: null
        }
    }

    public fileSelectHandler = (event: any) => {
        const file = event.target.files[0];
        if(!this.isImageValid(file)){
            return;
        }
        const reader = new FileReader();
        
        let imageSource = null;
        reader.onload = (e: any) => {
            imageSource = e.target.result;
        }
        
        reader.readAsDataURL(file);
        this.setState({
            imageFile: file,
            imageSource: imageSource
        });
    }

    public uploadPhotoHandler = () => {
        this.fileInputRef.current.click();
    }

    public render = () => {
        return (
            <div className="upload-component">
                <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInputRef} />
                <UploadButton click={this.uploadPhotoHandler} disabled={this.props.disabled}/>
                <PreviewImageComponent image={this.state.imageSource} />
            </div>
        );
    }
}

export default UploadComponent;