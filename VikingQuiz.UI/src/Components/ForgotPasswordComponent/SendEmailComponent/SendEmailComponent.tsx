import * as React from 'react';
import HomeButton from 'src/Components/Buttons/HomeButton/HomeButton';
import FormComponent from 'src/Components/FormComponent/FormComponent';
import './SendEmailComponent.css';
import HttpService from 'src/services/HttpService';

class SendEmailComponent extends React.Component<any, any>
{
    private readonly apiAddress: string = '/email';
    private httpService: HttpService = new HttpService();

    constructor(props: any) {
        super(props);
        
        this.state = {
            showStatusMessage: false,
            statusClass: '',
            statusMessage: ''
        }
    }

    public render() {
        return (
            <div className='my-container'>
                <HomeButton />
                <div className='yellow-bg-message'>Forgot password</div>
                <div className='form-container'>
                    <FormComponent inputs={
                        [
                            {id:'email', type:'email', label:'Email', errorMessage:'', name:'Email', value:''}
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
        this.httpService.post(url, body)
            .then(() => this.sendEmailSuccess())
            .catch((error: any) => this.sendEmailError(error));
    }

    private sendEmailSuccess = () => {
        this.setState({
            statusClass: 'success-message',
            statusMessage: 'Email was sent!'
        });
    };

    private sendEmailError = (error: any) => {
        this.setState({ statusClass: 'error-message' });
        console.log(error.response);
        if (error.response === undefined) {
            this.setState({ statusMessage: 'Could not connect to server. Please try again later.' });
        }
        else {
            if (error.response.status === 404) {
                this.setState({ statusMessage: 'This email is not registered with us.' });
            }
            else {
                this.setState({ statusMessage: error.response.data });
            }
        }
    };
}

export default SendEmailComponent;