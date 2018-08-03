import * as React from 'react';
import './StartQuizComponent.css';
import FormInput from '../../FormComponent/FormInput/FormInput';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import UploadButton from '../../Buttons/UploadButton/UploadButton'
import HttpService from '../../../services/HttpService';

interface IState {
    title: string,
    selectedFile: any,
    imageError: string,
    titleError: string,
    isValid: boolean
}

interface IProps{
    quizId: number,
    save: any,
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
        imageError: '',
        titleError: '',
        isValid: false
    }

    public componentWillMount(){
        if(this.props.editMode){
            const getQuizUrl: string = 'http://localhost:60151/api/quizzes/' + this.props.quizId; 
            this.httpService.getWithToken(getQuizUrl)
            .then((response: any) => {
                // this part gets the photo at the specified url
                const imageUrl: string = response.data.pictureUrl;
                const titleValue: string = response.data.title;

                console.log(imageUrl, titleValue);
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

    public fileSelectHandler = (event: any) => {

        const file = event.target.files[0];
        if(!this.isImageValid(file)){
            return;
        }
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

        if(!this.allValid()){
            return;
        }
        
        const fd = new FormData();
        fd.append('files', this.state.selectedFile);
        fd.append('title', this.state.title.toUpperCase());

        let url: string = '';
        if(this.props.editMode){
            url = 'http://localhost:60151/api/quizzes/' + this.props.quizId;
        }else{
            url = 'http://localhost:60151/api/quizzes';
        }

        this.httpService.postWithToken(url, fd)
        .then((response: any) => {
            const id: number = response.data.id;
            this.props.save(id);
        })
        .catch((error: any) => console.log(error));
    }

    public render() {
        return ( 
            <div className = "start-quiz row">
                <div id="title" className="col-md-5 col-xs-12">
                    <FormInput InputId="quizTitle" InputType="text" name="quizTitle" value={this.state.title} changed={this.changeTitleHandler} focus={this.focusTitleHandler}/>
                    <div className="error-message">{this.state.titleError}</div>
                </div>
                <div id="upload" className="col-md-5 col-xs-9">
                    <input id="file-uploader" type="file" onChange={this.fileSelectHandler} ref={this.fileInputRef} />
                    <span id="label-photo-txt"> { this.state.selectedFile ? "edit quiz photo" : "upload quiz photo"}</span>
                    <UploadButton click={this.uploadPhotoHandler} />
                    {this.state.selectedFile ? <img id="preview-image" src={require("./../../../media/home.png")} alt="picture" ref={this.previewImageRef} /> : null}
                    <div className="error-message">{this.state.imageError}</div>
                </div>
                <div className="success-btn col-md-2 col-xs-3">
                    <SubmitButton click={this.saveQuizHandler}/>
                </div>
            </div>
        )
    }

    public isTitleValid = (currentTitle: string): boolean => {

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

    private allValid = (): boolean => {
        let validity: boolean = true;
        if(!this.isTitleValid(this.state.title))
        {
            validity = false;
        }
        if(!this.isImageValid(this.state.selectedFile)){
            validity = false;
        }

        this.setState({
            isValid: validity
        })
        return validity;
    }

    private isImageValid = (fileObject: any): boolean => {
        const acceptedFormats: any = ['png','jpeg', 'gif'].map((type: string) => 'image/' + type);
        const megabyteSize: number = 1024;
        const kilobyteSize: number = 1024;
        const numberOfMegabytes: number = 5;

        if(!fileObject){
            this.setState({
                imageError: 'File doesn\'t exist',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
           
        }

        if(!acceptedFormats.includes(fileObject.type))
        {
            this.setState({
                imageError: 'The only supported fomats are: png, jpeg, gif',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
        }

        if(fileObject.size / kilobyteSize > megabyteSize*numberOfMegabytes){
            this.setState({
                imageError: 'The size is larger than ' + numberOfMegabytes + ' MBs',
                selectedFile: ''
            });
            this.addInvalidClassToUpload();
            return false;
        }
        this.setState({
            imageError: ''
        });
        this.removeInvalidClassFromUpload();
        return true;
    }

    private addInvalidClassToUpload = () => {
        const errorClassName: string = "error-border";
        const uploadElement: any = document.querySelector("#upload");
        uploadElement.classList.add(errorClassName);
        setTimeout(()=>{
            this.setState({
                imageError: ''
            })
        }, 10000);
    }

    private removeInvalidClassFromUpload = () => {
        const errorClassName: string = "error-border";
        const uploadElement: any = document.querySelector("#upload");
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
                    console.log(res);
                    this.setState({
                        selectedFile: res.data,
                        title: titleValue
                    });
                    const reader = new FileReader();
        
                    reader.onload = (e: any) => {
                        this.previewImageRef.current.src = e.target.result;
                     }
        
                    reader.readAsDataURL(res.data);
                })
                .catch((error: any)=>console.log(error.data))
    }

}

export default StartQuizComponent;