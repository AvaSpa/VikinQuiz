import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GoogleLogin from 'react-google-login';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {

   responseGoogle = function(res) {
       console.log(res);
      $.ajax({
         url: "http://localhost:60151/api/google", // url of the request
         type: "POST",
         dataType: "json",
         contentType: "application/json",
         data: JSON.stringify(new GoogleMessage(res.googleId,res.profileObj.email,
                                res.profileObj.imageUrl)), // request body
         beforeSent: function (res) {
            console.log(res);
         },
         success: function (res) { // runs only if the response is succesful
            console.log(res);
         },
         complete: function (res) {
            console.log(res);
         }
      });
   }

   render() {
      return (
         <div>
            <GoogleLogin
               clientId="973616639194-in3pvi0r75qp73f0d92m034r0nq71iqm.apps.googleusercontent.com"
               buttonText="Login"
               onSuccess={this.responseGoogle}
               onFailure={this.responseGoogle}
            />
         </div>
      );
   }
}

class GoogleMessage{
    constructor(id, email, pictureUrl){
          this.id = id;
          this.email = email;
          this.pictureUrl = pictureUrl;
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
