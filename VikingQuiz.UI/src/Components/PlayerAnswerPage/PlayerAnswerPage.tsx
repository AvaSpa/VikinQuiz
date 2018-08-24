import * as React from 'react';
import './PlayerAnswerPage.css';
import Answer from './Answer/Answer';
import MyProfileComponent from '../MyProfileComponent/MyProfileComponent';
import NotFoundPng from 'src/media/not-found.png';
import SignalRSingleton from "src/hubSingleton";
interface IPlayerDTO {
   name: string,
   pictureUrl: string
}

class PlayerAnswerPage extends React.Component<any, IPlayerDTO>{
   public hubConnection: any = SignalRSingleton;
   constructor(props: any) {
      super(props);

      this.state = {
         pictureUrl: NotFoundPng,
         name: "User"
      }
   }

   public componentDidMount() {
      console.log("ENTERED THE COMPONENT DID MOUNT")
      this.hubConnection.connection.invoke("GetPlayerDetails")
         .then( (response : any) => {
            console.log("PLAYER ANSWER PAGE RESPONSE FROM GETPLAYERDETAILS SIGNAR R", response);
            this.setState({ name: response.name, pictureUrl: response.pictureUrl })
         });
   }

   public render(): any {
      console.log("PLAYER ANSWER PAGE", this.state);
      return (
         <div className='player-answer-page-container'>
            <div className='profile-details-container'>
               <div className='participant-container'>
                  PARTICIPANT
                    </div>
               <MyProfileComponent profilePictureUrl={this.state.pictureUrl} profileName={this.state.name} children={null} />
            </div>
            <div className='answer-container'>
               <Answer />
            </div>
         </div>
      )
   }
}

export default PlayerAnswerPage;