import * as React from 'react';
import './MainRankingPage.css'
import HttpService from '../../services/HttpService';
import WinningPlayerItem from './WinningPlayerItem/WinningPlayerItem';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import { apiUrl } from "../../constants";
import * as SignalR from '@aspnet/signalr';
import { Link } from '../../../node_modules/@types/react-router-dom';



class MainRankingPage extends React.Component <any, any> {
   public httpService : HttpService = new HttpService();
   public playersApiAdress = apiUrl + "api/player"; 
   // public photoStorageUrlEndpoint = apiUrl + "api/storage";
   public hubConnection: SignalR.HubConnection;

   
   // public winningPhotoUrlBase : string; 
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

   public playersIdsArrayToObject = () => {
      this.playersList = this.playersList.map((playerId: number) => {
         return ({ playerId });
      });
   }

   public getPlayersData = () => {
      const playersDataRequests: any[] = new Array();
      this.playersList.forEach((player, index) => {
         const playerRequest = this.httpService.get(this.playersApiAdress + "/" + player.playerId);

         playerRequest.then((playerData: any) => {
            this.playersList[index].playerPhoto = playerData.data.pictureUrl
            this.playersList[index].playerName = playerData.data.name
         });

         playersDataRequests.push(playerRequest);
      });
      return playersDataRequests;
   }

   public getPlayersDataAndAddThemToThePlayerList = () => {
      
      

      this.hubConnection.invoke('/getRankings').then(succesfulResponse => {
         this.playersList = succesfulResponse.data; // the response data

         this.playersIdsArrayToObject();
         this.addRankingsToPlayerList();
         this.reverseFirstTwoMembersOfThePlayersList();

         const playersDataRequest = this.getPlayersData();

         Promise.all(  
            playersDataRequest 
         )
         .then(() => {
            this.winners = this.constructWinners();
            this.setState(this.playersList);
         });

      }).catch(errorResponse => {
         // 
      });

   }

   public componentWillMount() {
      this.hubConnection = new SignalR.HubConnectionBuilder().withUrl('apiUrl').build();

      this.hubConnection.start()
         .then(() => {
            this.getPlayersDataAndAddThemToThePlayerList();
         })
         .catch(() => console.log('SignalR failed to connect'));
   }


   // WORKS THE SAME
   public constructWinners() {
      return (
         <>
            {
               this.playersList.map( (winner, index) => {
                  return (
                     <WinningPlayerItem
                        key={winner.playerId}
                        winningPhotoUrl={this.pictureSuffixMap[winner.ranking].pictureUrl}
                        winningPositionNumber={winner.ranking + 1}
                        positionSuffix={this.pictureSuffixMap[winner.ranking].suffix}
                        playerPhoto={winner.pictureUrl}
                        playerName={winner.playerName}
                     />
                  );
               })
            }
         </>

      );
   }



   public render() {
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
