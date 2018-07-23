import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GoogleLogin from 'react-google-login';
import axios from 'axios';

class GoogleMessage {
   constructor(googleResObj) { // name, email, pictureUrl
      this.name = googleResObj.w3.ig;
      this.email = googleResObj.w3.U3;
      this.picturUrl = googleResObj.w3.Paa;
   }
}

class GoogleLoginButton extends React.Component {

   responseGoogle = (response) => {
      var ctx = this;
      if( response.hasOwnProperty("error") && response.error === "popup_closed_by_user") {
         this.props.onPopupClosed();
      } 
      else if(response.hasOwnProperty("googleId") ) {
         this.props.onResponseSuccesful();
         
         axios.post({
            method: "POST",
            url: this.props.postURL,
            data: new GoogleMessage(response)
         })
            .then(function(res) {
               ctx.props.onPostRequestRecieved(res);
            })
            .catch(function(error) {
               ctx.props.onPostRequestRecieved(error);
            });
      }
   }
   request = (response) => {
      this.props.onPopupOpen();
   }

   render() {
      return (
         <div>
            <GoogleLogin
               clientId="973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
               buttonText="Login"
               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
               onRequest={this.request}
            />
         </div>
      );
   }
}


ReactDOM.render(
   (
      // rendering the Google Login Button with different arguments
      <GoogleLoginButton
         onPopupClosed={() => { console.log("onPopupClosed"); }}// onPopupClosed()
         onResponseSuccesful={() => { console.log("onResponseSuccesful"); }}// onResponseSuccesful()
         onPostRequestRecieved={() => { console.log("onPostRequestRecieved (or failed)"); }}// onPostRequestRecieved()
         onPopupOpen={() => { console.log("onPopupOpen"); }}// onPopupOpen()

         postURL={"http://www.google.com/"}

      />
   ),
   document.getElementById('root'));