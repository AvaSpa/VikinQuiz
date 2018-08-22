import * as React from 'react';
import './ShowQuestionHeader.css'
import MyProfileComponent from '../../MyProfileComponent/MyProfileComponent';
import TimerComponent from 'src/Components/TimerComponent/TimerComponent';

interface IProps {
    timer: number,
    timeout: any
}

const QUIZ_URL: string = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640';
const QUIZ_NAME: string = 'Quiz Title';

const secondsInMinute: any = 60;
class ShowQuestionHeader extends React.Component<IProps, any>{

    public constructor(props: any){
        super(props);

        this.state = {
            timer: this.props.timer       
        }
    }

    public componentDidMount(){
        const interval = setInterval(()=>{
            let timerCopy: number = this.state.timer;
            if(timerCopy === 6){
                this.changeColorOfTimer();
            }
            else if(timerCopy === 1){
                clearInterval(interval);
                this.timeExpired();
            }
            timerCopy = timerCopy - 1;
            this.setState({
                timer: timerCopy
            });
        }, 1000)
    }

    public timeExpired = () => {
        this.changeColorOfTimer();
        this.props.timeout();
    }

    public render(){
        return (
            <div className='show-header'>
                <div className='show-quiz'>
                    <MyProfileComponent profilePictureUrl={QUIZ_URL} profileName={QUIZ_NAME} />
                </div>
                <div className='show-timer'>
                    <div className='time-counter'>
                        <span className='minutes'>{this.getMinutesValue(this.state.timer)}</span>:<span className='seconds'>{this.getSecondsValue(this.state.timer)}</span>
                    </div>
                    <TimerComponent seconds={this.props.timer}/>
                </div>
            </div>
        )
    }

    private getMinutesValue = (seconds: any) => {
        const noOfMinutes: number = Math.floor(seconds / secondsInMinute);
        let minutesValue: string = noOfMinutes.toString();
        if(noOfMinutes < 10){
            minutesValue = '0' + minutesValue;
        }
        return minutesValue;
    }

    private getSecondsValue = (seconds: any) => {
        const noOfSeconds: number = seconds % secondsInMinute;
        let secondsValue: string = noOfSeconds.toString();
        if(noOfSeconds < 10){
            secondsValue = '0' + secondsValue;
        }
        return secondsValue;
    }

    private changeColorOfTimer = () =>{
        const element: any = document.querySelector('.time-counter');
        element.className += ' red';
    }
}

export default ShowQuestionHeader;