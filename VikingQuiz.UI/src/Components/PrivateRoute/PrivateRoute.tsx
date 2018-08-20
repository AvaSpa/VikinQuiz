// import * as React from 'react';
// import {Route, Redirect} from "react-router-dom";
// import StorageService from '../../services/StorageService';


// /* tslint:disable */
// const storage = new StorageService();

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     return (<Route {...rest} render={(props) => {
//         storage.hasItem('token')
//         ? <Component {...props} />
//         : <Redirect to='/login'/>
//     }}/>)
// }

// export default PrivateRoute;