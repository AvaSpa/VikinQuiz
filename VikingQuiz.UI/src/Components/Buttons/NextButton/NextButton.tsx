import * as React from 'react';
import '../LoginSignUpButtons/Buttons.css';

const nextButton = (props: any) =>  {
        return (
            <button className="switch-button" onClick={props.clicked}> NEXT </button>
        );
}

export default nextButton;