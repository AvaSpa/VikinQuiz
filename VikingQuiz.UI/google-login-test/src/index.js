import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import GoogleLogin from 'react-google-login';
import registerServiceWorker from './registerServiceWorker';

class App extends React.Component {

   responseGoogle = function(res) {
      console.log(res);
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

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
