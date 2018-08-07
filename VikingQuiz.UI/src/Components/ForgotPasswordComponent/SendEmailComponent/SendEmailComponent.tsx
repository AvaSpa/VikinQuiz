import * as React from 'react';
import axios from 'node_modules/axios';
import HomeButton from 'src/Components/Buttons/HomeButton/HomeButton';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import InputData from 'src/entities/InputData';
import './SendEmailComponent.css';

class SendEmailComponent extends React.Component<any, any>
{
    private apiAddress: string;

    constructor(props: any) {
        super(props);
        
        this.state = {
            showStatusMessage: false,
            statusClass: '',
            statusMessage: ''
        }

        this.apiAddress = 'http://localhost:60151/api/email';
    }

    public render() {
        return (
            <div className='my-container'>
                <HomeButton />
                <div className='yellow-bg-message'>forgot password</div>
                <div className='form-container'>
                    <FormComponent className='signupForm' inputs={
                        [
                            new InputData('email', 'email', 'Email', '', 'Email', '')
                        ]}
                        url={this.apiAddress}
                        onSubmit={this.onClickHandler}
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

        const body: any = { email: formData.Email };

        this.setState({ showStatusMessage: true });
        axios.post(url, body)
            .then(() => this.sendEmailSuccess())
            .catch((error) => this.sendEmailError(error));
    }

    private sendEmailSuccess = () => {
        this.setState({
            statusClass: 'success-message',
            statusMessage: 'Email was sent!'
        });
    };

    private sendEmailError = (error: any) => {
        this.setState({ statusClass: 'error-message' });
        if (error.response === undefined) {
            this.setState({ statusMessage: 'Could not connect to server. Please try again later' });
        }
        else {
            this.setState({ statusMessage: 'This email is not registered with us' });
        }
    };
}

export default SendEmailComponent;