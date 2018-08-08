import * as React from 'react';
import './MyQuizesPage.css';

import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import MyQuizzesComponent from '../MyQuizzesComponent/MyQuizzesComponent';



class MyQuizesPage extends React.Component<any, any> {
    constructor(props: any) {
      super(props);

      this.state = {
          serverMessage: '',
          redirect: false
      }
    }

    public render() {
        return (
            <div className="quiz_Page_Container">
                <LogOutButton />
            <div className="my_Quizzes_Page_Container">
                    <HomeButton />          

                     <MyQuizzesComponent />
            </div>
            </div>
        );
    }
}

export default MyQuizesPage;