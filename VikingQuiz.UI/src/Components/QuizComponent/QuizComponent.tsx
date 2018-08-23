import * as React from 'react';
import './QuizComponent.css';
import StartQuizComponent from './StartQuizComponent/StartQuizComponent';
import QuestionsComponent from '../QuestionsComponent/QuestionsComponent';
import LogOutButton from 'src/Components/Buttons/LogOutButton/LogOutButton';
import HttpService from '../../services/HttpService';
import ProfileAndHomeComponent from 'src/Components/ProfileAndHomeComponent/ProfileAndHomeComponent';
import {apiUrl} from 'src/constants';

interface IState {
    id: number,
    editMode: boolean
    showQuestions: boolean,
   profileName: string,
   profilePictureUrl: string
}


class QuizComponent extends React.Component<any, IState> {

    public readonly apiAddressForUsers = apiUrl + 'api/users/current';

   public httpService = new HttpService();

    public state = {
        id: this.props.location.state.id,
        editMode: this.props.location.state.editMode,
        // id: this.props.id,
        // editMode: this.props.editMode,
        showQuestions: false,
       profileName: "",
       profilePictureUrl: ""
    }

   public componentWillMount() {

     /* 
                <MyProfileComponent profilePictureUrl={props.profilePictureUrl} profileName={props.profileName}/>

     */

      this.httpService.getWithToken(this.apiAddressForUsers)
         .then((response: any) => {
            console.log(response.data.pictureUrl);
            this.setState({profileName: response.data.username, profilePictureUrl: response.data.pictureUrl })
         })
         .catch((error: any) => console.log(error))
   }

    public saveQuizHandler = (quizId: number) => {
        this.setState({
            id: quizId,
            showQuestions: true
        });
    }

    public render(){
        return (
            <div className="quiz container">
               <LogOutButton />
              <ProfileAndHomeComponent 
                 profileName={this.state.profileName}
                 profilePictureUrl={this.state.profilePictureUrl}
                 buttonIsDisabled={false}
               >
                  {
                     this.state.editMode ? 
                        <span className="profile-message">Edit Mode</span> :
                       <span className="profile-message">New Question Mode</span>
                  }
               </ProfileAndHomeComponent>
               <StartQuizComponent 
                  editMode={this.state.editMode}
                  quizId={this.state.id}
                  save={this.saveQuizHandler}/>
               {this.state.showQuestions ? 
                  <QuestionsComponent 
                  quizId={this.state.id} 
                  /> : null
               }
            </div>
            
        )
    }
}

export default QuizComponent;
