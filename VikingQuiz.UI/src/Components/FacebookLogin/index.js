import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FacebookLogin from 'react-facebook-login';
import './bootstrap.min.css';
import './index.css';
import './fontello-embedded.css';

class FacebookMessage { // data format for sending the back-end data
   constructor(facebookResObj) {
      this.name = facebookResObj.name || null;
      this.email = facebookResObj.email || null;
      this.picturUrl = facebookResObj.picture.data.url || null;
   }
}

// wrapped for the GoogleLogin
class FacebookLoginButton extends React.Component {

   responseFacebook = (response) => {
      var ctx = this;

      if (response.hasOwnProperty("status") && response.status === "unknown") {
         this.props.onPopupClosed();
      } 

      
      else if(response.hasOwnProperty("userID") ) {
         let fbMessage = new FacebookMessage(response);
         for (let msg in fbMessage) {
            if(response[msg] === null) return null;
         }
         this.props.onResponseSuccesful();

         axios.post(
            ctx.props.postURL, 
            
         )
            .then(ctx.props.onPostSuccess) // post succesful
            .catch(ctx.props.onPostError); // post failure
      }
   }

   render() {
      return (
         <div className={this.props.containerClassName}>
            <FacebookLogin
               style={{}}
               appId={this.props.clientId}
               autoLoad={true}
               fields="name,email,picture"
               cssClass={this.props.btnClassName}
               onClick={this.componentClicked}
               callback={this.responseFacebook}
               textButton={this.props.btnText}
            />
         </div>
      );
   }
}

/* Example of using this component */
// ReactDOM.render(
//    (
//       <FacebookLoginButton
//          clientId="426789224472011"
//          onPopupClosed={ () => { console.log("popup closed"); } }
//          onResponseSuccesful={ () => { console.log("response succesful"); } }
//          onPostError={ () => { console.log("post request failed"); } }
//          onPostSuccess={ () => { console.log("post request successful"); } }
//          onPopupOpen={ () => { console.log("popup open"); } }

//          containerClassName="social-button google-button"
//          postURL={"http://localhost:8080/"}
//          btnClassName="btn btn-primary"
//          btnText="Login"
//       />
//    ),
//    document.getElementById('root')
// );
