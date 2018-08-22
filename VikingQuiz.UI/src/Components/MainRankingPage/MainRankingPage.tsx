import * as React from 'react';
import './MainRankingPage.css'
import HttpService from '../../services/HttpService';

class MainRankingPage extends React.Component {
   public httpService : HttpService = new HttpService();

   public componentWillMount() {
      // used the httpService to recieve the page page
   }

   public render() {
      return (
         <div className="main-ranking-page">
            This is the main ranking page
         </div>       
      );
   }

}

export default MainRankingPage;
