import * as React from 'react';
import './MainRankingPage.css'
import HttpService from '../../services/HttpService';
import WinningPlayerItem from './WinningPlayerItem/WinningPlayerItem';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import { apiUrl } from "../../constants";
import { Link } from 'react-router-dom';
import SignalRSingleton from "src/hubSingleton";




class MainRankingPage extends React.Component <any, any> {
   public httpService : HttpService = new HttpService();
   public playersApiAdress = apiUrl + "api/player"; 
    public readonly code = this.props.match.params.code;
   // public photoStorageUrlEndpoint = apiUrl + "api/storage";
   public hubConnection : any;

   public winners : any = null;

   public playersList : any[] = new Array();
   
   public state = {
   };
   public pictureSuffixMap = [
      {
         suffix: "st",
         pictureUrl: "https://intershipwirtekblob.blob.core.windows.net/winning-pictures/1.png" 
       },
      {
         suffix: "nd",
         pictureUrl: "https://intershipwirtekblob.blob.core.windows.net/winning-pictures/2.png"
       },
      {
         suffix: "rd",
         pictureUrl: "https://intershipwirtekblob.blob.core.windows.net/winning-pictures/3.png"
       }
    ];
    
   constructor(props : any) {
       super(props);
        this.hubConnection = SignalRSingleton;

   }


   // public dummyData : any = [
   //    {
   //       name: "John",
   //       pictureUrl: "https://www.theloop.ca/wp-content/uploads/2017/08/IKEA-released-instructions-on-how-to-make-your-own-Jon-Snow-cape.jpg"
   //    },
   //    {
   //       name: "Tyrion",
   //       pictureUrl: "https://media.gq.com/photos/599eeb4460e09b56c787029d/master/pass/tyrion_tout-2.jpg"
   //    },
   //    {
   //       name: "Tywin",
   //       pictureUrl: "http://20.theladbiblegroup.com/s3/content/808x455/47bf5ac55a0b292e7c833f789d33b77f.png"
   //    },
   // ]
   
   // public winningPhotoUrlBase : string; 

   

   // WORK THE SAME
   public addRankingsToPlayerList = () => {
      this.playersList = this.playersList.map((player, index) => {
         player.ranking = index;
         return player;
      });
   }

   // WORKS THE SAME
   public reverseFirstTwoMembersOfThePlayersList = () => {
      const firstPlayer = this.playersList[0];
      this.playersList[0] = this.playersList[1];
      this.playersList[1] = firstPlayer;
   }



   public getPlayersDataAndAddThemToThePlayerList = () => {
      
      

      this.hubConnection.connection.invoke('GetWinners').then( (succesfulResponse : any) => {
         this.playersList = succesfulResponse.winners; // the response data

         this.addRankingsToPlayerList();
         this.reverseFirstTwoMembersOfThePlayersList();

         this.winners = this.constructWinners();
            this.setState(this.playersList);
         });


   }

   public componentWillMount() {
        this.getPlayersDataAndAddThemToThePlayerList();
   }


   // WORKS THE SAME
   public constructWinners() {
       console.log(this.state, this);
      return (
         <>
            {
               this.playersList.map( (winner : any, index : number) => {
                  return (
                     <WinningPlayerItem
                        key={winner.playerId}
                        winningPhotoUrl={this.pictureSuffixMap[winner.ranking].pictureUrl}
                        winningPositionNumber={winner.ranking + 1}
                        positionSuffix={this.pictureSuffixMap[winner.ranking].suffix}
                        playerPhoto={winner.pictureUrl}
                        playerName={winner.name}
                     />
                  );
               })
            }
         </>

      );
   }



   public render() {
       console.log(this.state, this);
      return (
         <div className="main-ranking-page-container">
            <LogOutButton /> 
            <Link to="/">
               <HomeButton />
            </Link>
            <div className="main-ranking-page">
               {this.winners}
            </div>       
         </div>
      );
   }

}

export default MainRankingPage;
