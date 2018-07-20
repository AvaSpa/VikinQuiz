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
            url: "", // url of the request
            type: "POST",
            contentType: "text/plain",
            data: JSON.stringify(response), // request body
            dataType: "json",
            crossDomain: true,
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
            appId="426789224472011"
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

export default Facebook;