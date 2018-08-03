import * as React from 'react';
import './PlayButton.css';

class PlayButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="play-button" onClick={this.handleClick} />
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default PlayButton;
