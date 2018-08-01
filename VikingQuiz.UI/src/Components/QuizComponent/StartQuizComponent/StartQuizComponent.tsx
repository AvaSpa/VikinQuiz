import * as React from 'react';
import './StartQuizComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import UploadButton from '../../Buttons/UploadButton/UploadButton'

interface IState{
    title: string,
    selectedFile: any
}

interface IProps{
    editMode: boolean
}

const initialTitle: string = 'add quiz title';

class StartQuizComponent extends React.Component<IProps, IState>{

    public fileInput: any = React.createRef();

    public state = {
        title: initialTitle,
        selectedFile: null
    }

    public changeTitleHandler = (event: any) => {
        this.setState({
            title: event.target.value
        })
    }

    public focusTitleHandler = () => {
        if(this.state.title === initialTitle){
            this.setState({
                title: ''
            })
        }
    }

    public fileSelectHandler = (event: any) => {
        const file = event.target.files[0]
        if(!this.isValidImage(file)){
            return;
        }
        this.setState({
            selectedFile: file
        });
    }

    public uploadPhotoHandler = () => {
        this.fileInput.current.click();
    }

    public saveQuizHandler = () => {
        const body = {
            title: this.state.title,
            picture: this.state.selectedFile
        }   
        console.log(body);
    }

    public render() {
        return ( 
            <div className = "start-quiz row">
                <div className="col-md-5 col-xs-12">
                    <FormInput InputId="quizTitle" InputType="text" name="quizTitle" value={this.state.title} changed={this.changeTitleHandler} focus={this.focusTitleHandler}/>
                </div>
                <div className="upload col-md-5 col-xs-9">
                    <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInput}/>
                    <span className="label-photo-txt"> { this.props.editMode ? "edit quiz photo" : "upload quiz photo"}</span>
                    <UploadButton click={this.uploadPhotoHandler} />
                </div>
                <div className="success-btn col-md-2 col-xs-3">
                    <SubmitButton click={this.saveQuizHandler}/>
                </div>
            </div>
        )
    }

    private isValidImage = (fileObject: any) => {
        const acceptedFormats: any = ['png','jpeg', 'gif'].map((type: string) => 'image/' + type);
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if(!fileObject){
            return false;
        }

        if(!acceptedFormats.includes(fileObject.type))
        {
            return false;
        }

        if(fileObject.size / kilobyteSize > megabyteSize*numberOfMegabytes){
            return false;
        }

        return true;
    }

}

export default StartQuizComponent;