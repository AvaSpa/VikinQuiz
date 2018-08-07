import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
 
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import './fonts/fontello-embedded.css';
import './fonts/fonts.css';

ReactDOM.render(
   (
       <App />
   ),
   document.getElementById('root'));
 
registerServiceWorker();
