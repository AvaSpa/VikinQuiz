import * as React from 'react';
import axios from 'node_modules/axios';
import HomeButton from 'src/Components/Buttons/HomeButton/HomeButton';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import InputData from 'src/entities/InputData';
import './SendEmailComponent.css';

class SendEmailComponent extends React.Component<any, any>
{
    constructor(props: any) {
        super(props);

        
        this.state = {
            showStatusMessage: false,
            statusClass: '',
            statusMessage: '' // the message to show after we call the server to send resend link
            // basically: 'email was sent' / 'this email is not registered with us'
        }
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
                        url='http://localhost:60151/api/email'
                        buttonName=''
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

        const self: any = this;
        console.log(formData);
        const body: any = { email: formData.Email };

        self.setState({ showStatusMessage: true });
        axios.post(url, body)
            .then(() => {
                self.setState({
                    statusClass: 'success-message',
                    statusMessage: 'Email was sent!'
                });
            })
            .catch((error) => {
                self.setState({ statusClass: 'error-message' });
                if (error.response === undefined) {
                    self.setState({ statusMessage: 'Could not connect to server. Please try again later' });
                }
                else {
                    self.setState({ statusMessage: 'This email is not registered with us' });
                }
            });
    }
}

export default SendEmailComponent;