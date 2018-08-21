import * as React from 'react';
import './StartQuizComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import ImageValidator from '../../../entities/Validation/imageValidator';
import HttpService from '../../../services/HttpService';
import SnackbarComponent from '../../SnackbarComponent/SnackbarComponent';
import ISnackbarData from '../../../entities/SnackBarData';
import {errorSnackbar, successSnackbar} from '../../../commons/commons';
import UploadComponent from '../../UploadComponent/UploadComponent';
import PreviewImageComponent from '../../PreviewImageComponent/PreviewImageComponent';

interface IState {
    title: string,
    selectedFile: any,
    imageError: string,
    titleError: string,
    isValid: boolean,
    saved: boolean,
    showSnackbar: boolean,
    snackbarData: ISnackbarData,
    imageSource: any
}

interface IProps{
    editMode: boolean
    quizId: number,
    save: any
}

const quizzesUrl: string = 'http://localhost:60151/api/quizzes';
const initialTitle: string = 'add quiz title';

class StartQuizComponent extends React.Component<IProps, IState>{

    public fileInputRef: any = React.createRef();
    public previewImageRef: any = React.createRef();

    public state = {
        title: initialTitle,
        selectedFile: '',
        imageError: '',
        titleError: '',
        isValid: false,
        saved: false,
        showSnackbar: false,
        snackbarData: errorSnackbar,
        imageSource: null
    }

    private httpService: any = new HttpService();
    private imageValidator: any = new ImageValidator();

    public showSnackbarHandler = (snackbar: ISnackbarData) =>{
        this.setState({
            snackbarData: {...snackbar},
            showSnackbar: true
        })

        if(this.state.snackbarData.duration > 0){
            setTimeout(() => {
                this.setState({
                    showSnackbar: false
                });
            }, this.state.snackbarData.duration);
        }
    }

    public componentWillMount(){
        
        if(this.props.editMode){
            const getQuizUrl: string =  quizzesUrl + '/' + this.props.quizId; 
            this.httpService.getWithToken(getQuizUrl)
            .then((response: any) => {
                const imageUrl: string = response.data.pictureUrl;
                const titleValue: string = response.data.title;
                this.getImageBlobFromURL(imageUrl, titleValue);
            })
            .catch((error: any) => console.log(error));
        }
    }

    public changeTitleHandler = (event: any) => {
        const currentTitle: string = event.target.value
        this.isTitleValid(currentTitle);
        this.setState({
            title: event.target.value
        });
    }

    public focusTitleHandler = () => {
        if(this.state.title === initialTitle){
            this.setState({
                title: ''
            })
            this.isTitleValid('');
        }
    }

    public successfulUploadHandler = (file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.setState({
                imageSource: e.target.result
            });
        }
        
        reader.readAsDataURL(file);
        this.setState({
            imageError: '',
            selectedFile: file
        });
        this.removeInvalidClassFromUpload();
    }

    public errorUploadHandler = () => {
        this.setState({
            imageError: this.imageValidator.getErrorMessage(),
            imageSource: null,
            selectedFile: null
        });
        this.addInvalidClassToUpload();
    }

    public uploadPhotoHandler = () => {
        this.fileInputRef.current.click();
    }

    public saveQuizHandler = () => {
        const formData = new FormData();

        if(!this.isQuizValid()){
            return;
        }
        
        formData.append('files', this.state.selectedFile);
        formData.append('title', this.state.title.toUpperCase());

        let url: string = quizzesUrl;
        if(this.props.editMode){
            url = url + '/' + this.props.quizId;
        }

        this.saveQuizRequest(url, formData);
    }

    public saveQuizRequest = (url: string, body: any) => {
        this.httpService.postWithToken(url, body)
        .then((response: any) => {
            this.successfulSaveHandler(response);
        })
        .catch((error: any) => {
            this.errorHandler(error);
        });
    }

    public render() {
        return ( 
            <div className = "start-quiz row">
                <div id="title" className="col-md-5 col-xs-12" >
                    <FormInput InputId="quiz-title" InputType="text" name="quizTitle" value={this.state.title} changed={this.changeTitleHandler} focus={this.focusTitleHandler} readonly={this.state.saved}/>
                    <div className="error-message">{this.state.titleError}</div>
                </div>
                <div id="upload" className="col-md-5 col-xs-9">
                    <span id="label-photo-txt"> { this.props.editMode ? 'change quiz photo' : this.state.selectedFile ? "edit quiz photo" : "upload quiz photo"}</span>
                    <UploadComponent disabled={this.state.saved} upload={this.successfulUploadHandler} imageValidator={this.imageValidator} error={this.errorUploadHandler} classes={[]}/>
                    <PreviewImageComponent image={this.state.imageSource} />
                    <div className="error-message">{this.state.imageError}</div>
                </div>
                <div className="success-btn col-md-2 col-xs-3">
                    <SubmitButton click={this.saveQuizHandler}/>
                </div>
                <SnackbarComponent data={this.state.snackbarData} show={this.state.showSnackbar} />
            </div>
        )
    }

    private isTitleValid = (currentTitle: string): boolean => {

        if(currentTitle === initialTitle || !currentTitle){
            this.setState({
                titleError: 'Please add a title'
            });
            this.addInvalidClassToTitle();
            return false;
        }
        this.setState({
            titleError: ''
        });
        this.removeInvalidClassFromTitle();
        return true;
    }

    private isQuizValid = (): boolean => {
        let validity: boolean = true;
        if(!this.isTitleValid(this.state.title))
        {
            validity = false;
        }
        if(!this.imageValidator.isImageValid(this.state.selectedFile)){
            this.setState({
                imageError: this.imageValidator.getErrorMessage()
            })
            this.addInvalidClassToUpload();
            validity = false;
        }

        this.setState({
            isValid: validity
        })
        return validity;
    }

    private successfulSaveHandler(response: any){
        const snackbar: ISnackbarData = successSnackbar;
        snackbar.message = "Quiz created";
        this.showSnackbarHandler(snackbar);
        const id: number = response.data.id;
        const successButtonElement: any = document.querySelector(".success-btn");
        successButtonElement.classList.add('hidden');
        this.setState({
            saved: true
        })
        this.props.save(id);
    }

    private errorHandler(error: any){
        const snackbar: ISnackbarData = errorSnackbar;
        snackbar.message = "Cannot create quiz, please try again";
        this.showSnackbarHandler(snackbar);
    }

    private addInvalidClassToUpload = () => {
        const errorClassName: string = "error-border";
        const uploadElement: any = document.querySelector(".upload-component");
        uploadElement.classList.add(errorClassName);
        setTimeout(()=>{
            this.setState({
                imageError: ''
            })
        }, 10000);
    }

    private removeInvalidClassFromUpload = () => {
        const errorClassName: string = "error-border";
        const uploadElement: any = document.querySelector(".upload-component");
        uploadElement.classList.remove(errorClassName);
    }

    private addInvalidClassToTitle = () => {
        const errorClassName: string = "error-border";
        const titleElement: any = document.querySelector("#title");
        titleElement.classList.add(errorClassName);
        setTimeout(()=>{
            this.setState({
                titleError: ''
            })
        }, 10000);
    }

    private removeInvalidClassFromTitle = () => {
        const errorClassName: string = "error-border";
        const titleElement: any = document.querySelector("#title");
        titleElement.classList.remove(errorClassName);
    }

    private getImageBlobFromURL = (imageUrl: any, titleValue: any) => {
        this.httpService.get(imageUrl, { responseType:"blob" })
                .then((res: any) =>{
                    this.setState({
                        selectedFile: res.data,
                        title: titleValue
                    });
                    const reader = new FileReader();
        
                    reader.onload = (e: any) => {
                        this.setState({
                            imageSource: e.target.result
                        }) 
                     }
        
                    reader.readAsDataURL(res.data);
                })
                .catch((error: any)=>console.log(error.data))
    }

}

export default StartQuizComponent;
