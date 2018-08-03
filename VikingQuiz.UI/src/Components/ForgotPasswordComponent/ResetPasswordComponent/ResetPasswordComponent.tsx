import * as React from 'react';
import { Redirect } from 'react-router-dom';
import HomeButton from 'src/Components/Buttons/HomeButton/HomeButton';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import './ResetPasswordComponent.css';
import { changePasswordValidator } from 'src/entities/Validation/validators';
import { changeRule } from 'src/entities/Validation/rules';
import HttpService from 'src/services/HttpService';
import StorageService from 'src/services/StorageService';

class ResetPasswordComponent extends React.Component<any, any>
{
    private readonly apiAddress: string = '/email';
    private httpService: HttpService = new HttpService();
    private storageService: StorageService = new StorageService();

    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false,
            showStatusMessage: false,
            statusClass: '',
            statusMessage: ''
        };

        const resetToken: string = this.props.match.params.token;
        this.storageService.saveItem('token', resetToken);
    }

    public render() {
        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }
        return (
            <div className='my-container'>
                <HomeButton />
                <div className='yellow-bg-message'>Update password</div>
                <div className='form-container'>
                    <FormComponent className='signupForm' inputs={
                        [
                       { id: 'password', type: 'password', label: 'new password', errorMessage:'', name:'password', value:''},
                       { id: 'confirm-password', type: 'password', label: 'confirm password', errorMessage: '', name: 'confirm-password', value:''}
                        ]}
                        url={this.apiAddress}
                        buttonName=''
                        onSubmit={this.onClickHandler}
                        validator={changePasswordValidator}
                        validationRules={changeRule}
                    />
                    {this.state.showStatusMessage ? (<div className={`message ${this.state.statusClass}`}>{this.state.statusMessage}</div>) : null}
                </div>
            </div>
        );
    }

    private onClickHandler = (url: string, formData: any) => {
        if (!url || !formData) {
            return;
        }

        const axiosBody: any = { 'password': formData.password };
        this.setState({ showStatusMessage: true });
        this.httpService.putWithToken(url, axiosBody)
            .then(() => this.resetPasswordSuccess())
            .catch((error: any) => this.resetPasswordError(error));
    }

    private resetPasswordSuccess = () => {
        this.setState({
            statusClass: 'success-message',
            statusMessage: 'Password changed, redirecting to Log In...'
        });
        setTimeout(
            () => this.setState({ redirect: true }),
            3500
        );
    };

    private resetPasswordError = (error: any) => {
        this.setState({ statusClass: 'error-message' });
        if (error.response === undefined) {
            this.setState({ statusMessage: 'Could not connect to server. Please try again later.' });
        }
        else {
            // token is invalid (either expired or fake)
            if (error.response.status === 401) {
                this.setState({ statusMessage: 'This reset link is invalid or has expired.' });
            }
            else {
                this.setState({ statusMessage: error.response.data });
            }
        }
    };
}

export default ResetPasswordComponent;