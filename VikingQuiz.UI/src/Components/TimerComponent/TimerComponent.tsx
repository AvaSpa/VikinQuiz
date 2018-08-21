import * as React from 'react'
import timeicon from 'src/media/timeicon.png'
import './TimerComponent.css'

interface ITimerProps {
    seconds: number;
}

const TimerComponent = (props: ITimerProps) => {
    return (
        <div id="clock">
            <img src={timeicon} alt="timer" />
            <span className="clock-hand" style={{ animation: `rotate ${props.seconds}s 1 linear` }} />
        </div>
    );
}

export default TimerComponent;
