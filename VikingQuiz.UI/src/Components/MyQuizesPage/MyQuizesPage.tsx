import * as React from 'react';
import './MyQuizesPage.css';

import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import MyQuizzesComponent from '../MyQuizzesComponent/MyQuizzesComponent';


const MyQuizesPage: any = (props: any) => {
        return (
            <div className="quiz-page-container">
                <LogOutButton />
                <div className="my-quizzes-page-container">                     
                    <MyQuizzesComponent />
                </div>
            </div>
        );
}

export default MyQuizesPage;