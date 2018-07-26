import * as React from 'react';
import './Buttons.css';

class SubmitButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="submitButton" onClick={this.handleClick} />
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default SubmitButton;