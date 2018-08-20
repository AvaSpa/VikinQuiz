import * as React from 'react';
import './UploadComponent.css';
import UploadButton from '../Buttons/UploadButton/UploadButton';
import PreviewImageComponent from '../PreviewImageComponent/PreviewImageComponent';

class UploadComponent extends React.Component<any, any> {

    private fileInputRef: any = React.createRef();
    

    public constructor(props: any){
        super(props);

        this.state = {
            imageSource: null
        }
    }

    public fileSelectHandler = (event: any) => {
        const file = event.target.files[0];

        if(!this.props.imageValidator.isImageValid(file)){
            this.setState({
                imageSource: null
            });
            this.props.error();
            return;
        }

        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.setState({
                imageSource: e.target.result
            });
        }
        
        reader.readAsDataURL(file);
        
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
                <PreviewImageComponent image={this.state.imageSource} />
            </div>
        );
    }


 
}

export default UploadComponent;