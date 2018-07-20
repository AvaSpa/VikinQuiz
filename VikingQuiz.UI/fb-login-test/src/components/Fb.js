import React, { Component } from 'react';
import $ from 'jquery';
import FacebookLogin from 'react-facebook-login';

class Facebook extends React.Component {
   state = {
      loggedIn: false,
      userId: '',
      name: '',
      email: '',
      picture: ''
   };

   componentClicked = () => {console.log("Clicked")};

   responseFacebook = (response) => { // response --> fb login data
      if (response.status !== "unknown") {
         $.ajax({
            url: "http://localhost:60151/api/facebook", // url of the request
            type: "POST",
            dataType : "json",
            contentType: "application/json",
            data: JSON.stringify(new FacebookMessage(response.email, response.name, response.picture.data.url)), // request body
            beforeSent: function(res) {
            },
            success: function (res) { // runs only if the response is succesful
            },
            complete: function (res) {
               console.log(response);
            }


         });
      }
   };


   render() {
      let fbContent;

      if (this.state.loggedIn) {
         fbContent = null;
      } else {
         fbContent = (<FacebookLogin
            appId="1691716487610141"
            autoLoad={true}
            fields="name,email,picture"
            onClick={this.componentClicked}
            callback={this.responseFacebook} />);
      }

      return (
         <div>
            {fbContent}
         </div>

      );
   }
}

class FacebookMessage{
      constructor(email, name, pictureUrl){
            this.email = email;
            this.name = name;
            this.pictureUrl = pictureUrl;
      };
}

export default Facebook;