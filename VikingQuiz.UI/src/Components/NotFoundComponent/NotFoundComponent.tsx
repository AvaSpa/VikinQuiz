import * as React from 'react';
import './NotFoundComponent.css';

const NotFoundComponent: any = (props: any) => {
    return (
       <div className="not-found">
          <div id="not-found-image" />
          <h1 className="very-large">grrr...</h1>
          <p className="large">we're angry too that this doesn't work</p>
          <p className="small">now let's get back to serious business'</p>
      </div>
    )
}

export default NotFoundComponent;