import * as React from 'react';
import './ShowQuestionHeader.css'
import MyProfileComponent from '../../MyProfileComponent/MyProfileComponent';
import TimerComponent from 'src/Components/TimerComponent/TimerComponent';

interface IProps {
    timer: number
}

const QUIZ_URL: string = 'https://vignette.wikia.nocookie.net/the-darkest-minds/images/4/47/Placeholder.png/revision/latest?cb=20160927044640';
const QUIZ_NAME: string = 'Quiz Title';

class ShowQuestionHeader extends React.Component<IProps, any>{
    
    public constructor(props: any){
        super(props);

        this.state = {
            
        }
    }

    public render(){
        return (
            <div className='show-header'>
                <div className='show-quiz'>
                    <MyProfileComponent profilePictureUrl={QUIZ_URL} profileName={QUIZ_NAME} />
                </div>
                <div className='show-timer'>
                    <div className='time-counter'>
                        <span className='minutes'>00</span>:<span className='seconds'>00</span>
                    </div>
                    <TimerComponent seconds={this.props.timer}/>
                </div>
            </div>
        )
    }
}

export default ShowQuestionHeader;