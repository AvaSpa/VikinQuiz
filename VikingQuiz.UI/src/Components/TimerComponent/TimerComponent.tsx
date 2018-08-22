import * as React from 'react'
import timeicon from 'src/media/time-icon.png';
import './TimerComponent.css'

interface ITimerProps {
    seconds: number;
}

const TimerComponent = (props: ITimerProps) => {
    return (
        <div id="clock">
            <img src={timeicon} alt="timer" />
            {/* <span className="clock-hand" /> */}
        </div>
    );
}

export default TimerComponent;
