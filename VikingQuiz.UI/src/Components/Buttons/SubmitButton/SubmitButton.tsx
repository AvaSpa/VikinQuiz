import * as React from 'react';
import './SubmitButton.css';

class SubmitButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="submit-button" onClick={this.handleClick} />
        );
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default SubmitButton;
