import React from 'react';
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
import axios from 'axios';
import './bootstrap.min.css';
import './index.css';
import './fontello-embedded.css';

class GoogleMessage { // data format for sending the back-end data
   constructor(googleResObj) {
      this.name = googleResObj.w3.ig || null;
      this.email = googleResObj.w3.U3 || null;
      this.picturUrl = googleResObj.w3.Paa || null;
   }
}

// wrapped for the GoogleLogin
class GoogleLoginButton extends React.Component {

   responseGoogle = (response) => {
      var ctx = this;

      if( response.hasOwnProperty("error") && response.error === "popup_closed_by_user") {
         this.props.onPopupClosed();
      }

      for (let msg in fbMessage) {
         if (response[msg] === null) return null;
      }
      
      else if(response.hasOwnProperty("googleId") ) {
         this.props.onResponseSuccesful();

         axios.post(
            ctx.props.postURL, 
            new GoogleMessage(response)
         )
            .then(ctx.props.onPostSuccess) // post succesful
            .catch(ctx.props.onPostError); // post failure
      }
   }

   render() {
      return (
         <div className={this.props.containerClassName}>
            <GoogleLogin
               style={{}}
               className={this.props.btnClassName}
               clientId={this.props.clientId}
               buttonText={this.props.btnText}

               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
               onRequest={this.props.onPopupOpen}
            />
         </div>
      );
   }
}

export default GoogleLoginButton;

/* Example of using this component */
// ReactDOM.render(
//    (
//       <GoogleLoginButton
//          clientId="973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
//          onPopupClosed={ () => { console.log("popup closed"); } }
//          onResponseSuccesful={ () => { console.log("response succesful"); } }
//          onPostError={ () => { console.log("post request failed"); } }
//          onPostSuccess={ () => { console.log("post request successful"); } }
//          onPopupOpen={ () => { console.log("popup open"); } }

//          postURL={"http://localhost:8080/"}
//          btnClassName="btn btn-primary"
//          containerClassName="social-button google-button"
//       />
//    ),
//    document.getElementById('root')
// );