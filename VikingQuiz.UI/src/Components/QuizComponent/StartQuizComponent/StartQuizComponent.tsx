import * as React from 'react';
import './StartQuizComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import UploadButton from '../../Buttons/UploadButton/UploadButton'
import HttpService from '../../../services/HttpService';

interface IState {
    title: string,
    selectedFile: any,
    editMode: boolean,
    imageError: string,
    titleError: string,
    isValid: boolean
}

interface IProps{
   editMode: boolean
}

const initialTitle: string = 'add quiz title';

class StartQuizComponent extends React.Component<IProps, IState>{


    public fileInputRef: any = React.createRef();
    public previewImageRef: any = React.createRef();
    public httpService: any = new HttpService();

    public state = {
        title: initialTitle,
        selectedFile: '',
        editMode: this.props.editMode,
        imageError: '',
        titleError: '',
        isValid: false
    }

    public componentWillMount(){
        // axios.get('')
        // .then()
        // .catch();
        this.allValid();
    }

    public changeTitleHandler = (event: any) => {
        this.setState({
            title: event.target.value

        });
        // this.allValid();
    }

    public focusTitleHandler = () => {
        if(this.state.title === initialTitle){
            this.setState({
                title: ''
            })
        }
    }

    public fileSelectHandler = (event: any) => {

        const file = event.target.files[0];
        console.log(this.isImageValid(file));
        if(!this.isImageValid(file)){
            return;
        }

        console.log("Enter")
        const reader = new FileReader();
        
        reader.onload = (e: any) => {
            this.previewImageRef.current.src = e.target.result;
        }
        
        reader.readAsDataURL(file);
        this.setState({
            selectedFile: file
        });
    }

    public uploadPhotoHandler = () => {
        this.fileInputRef.current.click();
    }

    

    public saveQuizHandler = () => {
        
        const fd = new FormData();
        fd.append('files', this.state.selectedFile);
        fd.append('title', this.state.title);
        console.log(fd);
        const url: string = 'http://localhost:60151/api/values'; 
        this.httpService.post(url, fd);
    }

    public render() {
        return ( 
            <div className = "start-quiz row">
                <div className="col-md-5 col-xs-12">
                    <FormInput InputId="quizTitle" InputType="text" name="quizTitle" value={this.state.title} changed={this.changeTitleHandler} focus={this.focusTitleHandler}/>
                    <div className="error-color">{this.state.titleError}</div>
                </div>
                <div className="upload-label col-md-5 col-xs-9">
                    <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInputRef} />
                    <span className="label-photo-txt"> { this.state.selectedFile ? "edit quiz photo" : "upload quiz photo"}</span>
                    <UploadButton click={this.uploadPhotoHandler} />
                    {this.state.selectedFile ? 
                    <img id="preview-image" src={require("./../../../media/home.png")} alt="picture" ref={this.previewImageRef} />
                     : null}
                     <div className="error-color">{this.state.imageError}</div>
                </div>
                <div className="success-btn col-md-2 col-xs-3">

                    <SubmitButton disabled={this.state.isValid} click={this.saveQuizHandler}/>
                </div>
            </div>
        )
    }

    public isTitleValid = (): boolean => {
        const currentTitle: string = this.state.title;

        if(currentTitle === initialTitle || !currentTitle){
            this.setState({
                titleError: "Please add a title"
            });
            return false;
        }

        return true;
    }

    private allValid = () => {
        if(this.isTitleValid() && this.isImageValid(this.state.selectedFile)){
            this.setState({
                isValid: true
            })
        }
    }

    private isImageValid = (fileObject: any): boolean => {
        const acceptedFormats: any = ['png','jpeg', 'gif'].map((type: string) => 'image/' + type);
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if(!fileObject){
            this.setState({
                imageError: 'File doesn\'t exist'
            });
            return false;
        }

        if(!acceptedFormats.includes(fileObject.type))
        {
            this.setState({
                imageError: 'The only supported fomats are: png, jpeg, gif'
            });
            return false;
        }

        if(fileObject.size / kilobyteSize > megabyteSize*numberOfMegabytes){
            this.setState({
                imageError: 'The size is larger than ' + numberOfMegabytes + ' MBs'
            });
            return false;
        }

        return true;
    }

}

export default StartQuizComponent;