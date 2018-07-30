import * as React from 'react';
import './NotFoundComponent.css';

const redirectComponent: any = (props: any) => {
    return (
       <div className="not-found">
        <p>404 Not Found!</p>
      </div>
    )
}

export default redirectComponent;