import * as React from 'react';
import './PlayerAnswerPage.css';
import Answer from './Answer/Answer';
import MyProfileComponent from '../MyProfileComponent/MyProfileComponent';


class PlayerAnswerPage extends React.Component<any, any>{

    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            answers: [],
            correctAnswer: '',
            falseAnswerr: '',
            chosenAnswer: ''
        }
    }

    public render(): any {
        return(
            <div className='player-answer-page-container'>
                <div className='profile-details-container'>
                    <div className='participant-container'>
                        PARTICIPANT
                    </div>
                    <MyProfileComponent />
                </div>
                <div className='answer-container'>
                    <Answer />
                </div>
            </div>
        )
    }
}

export default PlayerAnswerPage;