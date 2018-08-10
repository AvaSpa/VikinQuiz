import * as React from 'react';
import './StartButton.css';

class StartButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="start-button" onClick={this.handleClick} />
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default StartButton;
