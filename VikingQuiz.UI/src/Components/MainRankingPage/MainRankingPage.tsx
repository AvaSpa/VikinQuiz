import * as React from 'react';
import './MainRankingPage.css'
import HttpService from '../../services/HttpService';
import WinningPlayerItem from './WinningPlayerItem/WinningPlayerItem';
import HomeButton from '../Buttons/HomeButton/HomeButton';
import LogOutButton from '../Buttons/LogOutButton/LogOutButton';
import { apiUrl } from "../../constants";


interface IMainRankingPageProps {
   gameId: number;
}

class MainRankingPage extends React.Component <IMainRankingPageProps, any> {
   public httpService : HttpService = new HttpService();
   public playersApiAdress = apiUrl + "api/player"; 
   public playGameApiAdress = apiUrl + "api/playergame";
   public photoStorageUrlEndpoint = apiUrl + "api/storage";
   public winningPhotoUrlBase : string; 
   public winners : any = null;
   public showWinners : boolean = false;

   public playersList : any[] = new Array();
   
   public state = {
   };
   /* 
   winningUrl : string;
   winningPosition: string;
   playerPhoto : string;
   playerName: string;
   */
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
   
   public addRankingsToPlayerList = () => {
      this.playersList = this.playersList.map((player, index) => {
         player.ranking = index;
         return player;
      });
   }

   public reverseFirstTwoMembersOfThePlayersList = () => {
      const firstPlayer = this.playersList[0];
      this.playersList[0] = this.playersList[1];
      this.playersList[1] = firstPlayer;
   }

   public getPlayersDataAndAddThemToThePlayerList = () => {
      this.httpService.get(this.playGameApiAdress + "/" + 1).then((succesfulResponse: any) => {

         this.playersList = succesfulResponse.data.slice(0, 3);
         this.addRankingsToPlayerList();
         this.reverseFirstTwoMembersOfThePlayersList();



         this.playersList.forEach((player, index) => {
            const playerRequest = this.httpService.get(this.playersApiAdress + "/" + player.playerId);
            playerRequest.then((playerData: any) => {
               this.playersList[index].playerPhoto = playerData.data.pictureUrl
               this.playersList[index].playerName = playerData.data.name
            });

            playersDataRequests.push(playerRequest);
         });

         Promise.all(
            playersDataRequests
         ).then(() => {
            this.showWinners = true;
            this.winners = this.constructWinners();
            this.setState(this.playersList);
         });
      });
   }

   public componentWillMount() {
      const playersDataRequests : any[] = new Array();
      
      

      

      
   }

   public constructWinners() {
      return (
         <>
            {
               this.playersList.map( (winner, index) => {
                  return (
                     <WinningPlayerItem
                        key={index}
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

   /* 
         public int PlayerId { get; set; }
         public int GameId { get; set; }
         public int? Score { get; set; }
         public int? AverageTime { get; set; }


         //HttpGet
   */
   public render() {
      console.log(this.state);
      return (
         <div className="main-ranking-page-container">
            <LogOutButton /> 
            <HomeButton />
            <div className="main-ranking-page">
               {this.winners}
            </div>       
         </div>
      );
   }

}

export default MainRankingPage;
