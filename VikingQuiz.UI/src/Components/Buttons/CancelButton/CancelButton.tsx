import * as React from 'react';
import './CancelButton.css';

class CancelButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        const message = "cancel game"
        return (
            <button className="cancel-button" onClick={this.handleClick} > {message} </button>
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default CancelButton;
