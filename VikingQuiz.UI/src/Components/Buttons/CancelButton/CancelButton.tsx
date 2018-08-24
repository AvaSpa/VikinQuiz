import * as React from 'react';
import './CancelButton.css';

class CancelButton extends React.Component<any, any> {
   constructor(props: any) {
      super(props);
   }

   public render() {
      const message = "cancel game"
      return (
         <button className="cancel-button" onClick={this.props.clicked}> {message} </button>
      );
   }
}

export default CancelButton;