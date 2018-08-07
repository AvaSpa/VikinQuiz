import * as React from 'react';
import axios from 'node_modules/axios';
import { Redirect } from 'react-router-dom';
import InputData from 'src/entities/InputData';
import HomeButton from 'src/Components/Buttons/HomeButton/HomeButton';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import './ResetPasswordComponent.css';
import { changePasswordValidator } from 'src/entities/Validation/validators';
import { changeRule } from 'src/entities/Validation/rules';

class ResetPasswordComponent extends React.Component<any, any>
{
    private apiAddress: string;

    constructor(props: any) {
        super(props);

        this.state = {
            redirect: false,
            showStatusMessage: false,
            statusClass: '',
            statusMessage: '',
            token: ''
        };

        this.apiAddress = 'http://localhost:60151/api/email/';
    }

    public componentDidMount() {
        this.setState({ token: this.props.match.params.token });
    }

    public render() {
        if (this.state.redirect) {
            return (<Redirect to='/login' />);
        }
        return (
            <div className='my-container'>
                <HomeButton />
                <div className='yellow-bg-message'>update password</div>
                <div className='form-container'>
                    <FormComponent className='signupForm' inputs={
                        [
                            new InputData('password', 'password', 'new password', '', 'password', ''),
                            new InputData('confirm-password', 'password', 'confirm password', '', 'confirm-password', '')
                        ]}
                        url={this.apiAddress + this.state.token}
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

    private onClickHandler = (url: any, formData: any) => {
        if (!url || !formData) {
            return;
        }

        const axiosBody: any = { 'password': formData.password };
        const axiosConfig: any = { headers: { 'Authorization': 'Bearer ' + this.state.token } }

        this.setState({ showStatusMessage: true });
        axios.put(url, axiosBody, axiosConfig)
            .then(() => this.resetPasswordSuccess())
            .catch((error) => this.resetPasswordError(error));
    }

    private resetPasswordSuccess = () => {
        this.setState({
            statusClass: 'success-message',
            statusMessage: 'Password changed, redirecting to Log In'
        });
        setTimeout(
            () => this.setState({ redirect: true }),
            3500
        );
    };

    private resetPasswordError = (error: any) => {
        this.setState({ statusClass: 'error-message' });
        if (error.response === undefined) {
            this.setState({ statusMessage: 'Could not connect to server. Please try again later' });
        }
        else {
            // token is invalid (either expired or fake)
            if (error.response.status === 401) {
                this.setState({ statusMessage: 'This reset link is invalid has expired' });
            }
            else {
                this.setState({ statusMessage: error.response.data });
            }
        }
    };
}

export default ResetPasswordComponent;