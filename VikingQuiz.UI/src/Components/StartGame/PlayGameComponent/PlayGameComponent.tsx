import * as React from 'react';
import './PlayGameComponent.css';
import IInputData from 'src/entities/IInputData';
import ImageValidator from 'src/entities/Validation/imageValidator';
import FormInput from '../../FormComponent/FormInput/FormInput';
import UploadComponent from '../../UploadComponent/UploadComponent';
import PreviewImageComponent from '../../PreviewImageComponent/PreviewImageComponent';

class PlayGameComponent extends React.Component<any, any> {

    private imageValidator: any = new ImageValidator();

    constructor(props: any) {
        super(props);

        this.state = {
            inputs: this.props.inputs,
            url: this.props.url,
            isValid: false,
            imageSource: null,
            selectedFile: '',
            imageError: '',
        }
    }


    public changeValueHandler(id: string, event: any) {
        const inputsCopy: IInputData[] = this.state.inputs.slice();
        const index: number = inputsCopy.findIndex((input) => input.id === id);
        inputsCopy[index].value = event.target.value;
        this.setState({
            inputs: inputsCopy
        })
    }

    public getFormData(): any {
        const data: any = {};
        this.state.inputs.forEach((input: IInputData) => {
            data[input.name] = input.value;
        });
        return data;
    }

    public submitDataHandler = () => {
        const url: string = this.state.url;
        const formData: any = this.getFormData();
        const validity = this.getValidityState(false);

        if(!this.imageValidator.isImageValid(this.state.selectedFile)){
            this.setState({
                imageError: this.imageValidator.getErrorMessage()
            })
            this.addInvalidClassToUpload();
            return;
        }
        
        if (this.getValidityState(true)){
            this.props.onSubmit(url, formData);
        }

        if (validity !== this.state.isValid) {
            this.setState({
                isValid: validity
            });
        }

        
    }

    public getItemById(id: string, inputs: any) {
        const inputsCopy: IInputData[] = inputs.slice();
        const index: number = inputsCopy.findIndex((input) => input.id === id);
        return {
            index,
            item: inputsCopy[index]
        };
    }

    public getCopyOfInputs(inputs: any) {
        return inputs.slice();
    }

    public checkValidityOfAll() {
        if (this.props.validator) {
            for (const input of this.state.inputs) {
                this.props.validator(
                    this.state.inputs,
                    this.props.validationRules,
                    input.id,
                    {
                        getCopyOfInputs: this.getCopyOfInputs,
                        getItemById: this.getItemById,
                        changeErrorMessageOf: this.changeErrorMessageOf
                    }
                );
            }
        }
    }




    public renderInput(input: IInputData) {
        return (
            <FormInput key={input.id}
                InputId={input.id}
                InputType={input.type}
                InputLabel={input.label}
                value={input.value}
                ErrorMessage={input.errorMessage}
                changed={this.changeHandler.bind(this, input)}
            />
        )
    }


    public changeErrorMessageOf = (id: string, errorMessage: string) => {

        const inputsData = this.getItemById(id, this.state.inputs);
        if (this.state.inputs[inputsData.index].errorMessage !== errorMessage) {
            const inputsCopy = this.getCopyOfInputs(this.state.inputs);
            inputsCopy[inputsData.index].errorMessage = errorMessage;
            this.setState({
                inputs: inputsCopy
            });
        }

    }

    public changeHandler = (input: any, event: any) => {
        this.changeValueHandler(input.id, event);
        this.resetError(input);
        this.reverseValidity();
    }

    public resetError(input: any) {
        if (this.props.validator) {
            this.props.validator(
                this.state.inputs,
                this.props.validationRules,
                input.id,
                {
                    getCopyOfInputs: this.getCopyOfInputs,
                    getItemById: this.getItemById,
                    changeErrorMessageOf: this.changeErrorMessageOf
                }
            );
        }
    }

    public reverseValidity() {
        const validity = this.getValidityState(false);
        if (validity !== this.state.isValid) {
            this.setState({
                isValid: validity
            });
        }
    }
    public getValidityState(checkAll: boolean) {
        if (this.props.validator) {
            if (checkAll) {
                this.checkValidityOfAll()
            }
            for (const input of this.state.inputs) {
                if (input.errorMessage !== '') {
                    return false;
                }
            }
        }
        return true;
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


    public render() {
        return (
            <div className="play-game-form form-body container-fluid">
                {this.state.inputs.map((input: IInputData) => this.renderInput(input))}
                <div id="upload">
                    <div id="label-photo-txt"> {this.props.editMode ? 'change quiz photo' : this.state.selectedFile ? "edit quiz photo" : "upload quiz photo"}</div>
                    <UploadComponent disabled={this.state.saved} upload={this.successfulUploadHandler} imageValidator={this.imageValidator} error={this.errorUploadHandler} classes={[]} />
                    <PreviewImageComponent image={this.state.imageSource} />
                    <div className="error-message">{this.state.imageError}</div>
                </div>
                <button disabled={!this.state.isValid} className="join-button" onClick={this.submitDataHandler}>{this.props.buttonName}</button>
            </div>
        );
    }

    private addInvalidClassToUpload = () => {
        const errorClassName: string = "error-border";
        const uploadElement: any = document.querySelector(".upload-component");
        uploadElement.classList.add(errorClassName);
        setTimeout(() => {
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
}

export default PlayGameComponent;
