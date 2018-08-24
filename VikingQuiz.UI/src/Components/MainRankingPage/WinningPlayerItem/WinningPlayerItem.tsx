import * as React from 'react';
import './WinningPlayerItem.css'

interface IWinningPlayerItemProps {
   winningPhotoUrl: string;
   winningPositionNumber: number;
   playerPhoto: string;
   playerName: string;
   positionSuffix: string;
}

const WinningPlayerItem = function (props: IWinningPlayerItemProps) {
   return (
      <div className="winning-player-item">
         <img className="winning-image" src={props.winningPhotoUrl} />
         <div className="image-container">
            <img className="player-photo" src={props.playerPhoto} />
            <span className="winning-position">
               {props.winningPositionNumber}
               
               <sup>{props.positionSuffix}</sup> 
            </span>
         </div>
         <span className="player-name">{props.playerName}</span>
      </div>
   );
}

export default WinningPlayerItem;
