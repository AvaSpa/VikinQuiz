import * as React from 'react';
import './MyQuizesPage.css';
import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import MyQuizzesComponent from '../MyQuizzesComponent/MyQuizzesComponent';
import DisplayPlayedGamesComponent from './DisplayPlayedGamesComponent/DisplayPlayedGamesComponent';


class MyQuizesPage extends React.Component<any, any> {
    
    private playedGameComponent: React.RefObject<DisplayPlayedGamesComponent>;
    private myQuizzesComponent: React.RefObject<MyQuizzesComponent>;
        
    constructor(props: any) {
        super(props);

        this.playedGameComponent = React.createRef();
        this.myQuizzesComponent = React.createRef();

        this.handleQuizDelete = this.handleQuizDelete.bind(this);      
     }

     public handleQuizDelete()
     {   
         this.myQuizzesComponent.current!.componentWillMount()
         this.playedGameComponent.current!.updatePlayedGamesListOnQuizDelete()           
     }
    
    public render(){
        return (
            <div className="quiz-page-container container">
                <LogOutButton />
                <div className="my-quizzes-page-container">                     
                    <MyQuizzesComponent handleQuizDelete={this.handleQuizDelete} ref={this.myQuizzesComponent}/>
                </div>
                <div className="played-games-container">
                    <DisplayPlayedGamesComponent ref={this.playedGameComponent} />
                </div>
            </div>
        );
    }
}

export default MyQuizesPage;