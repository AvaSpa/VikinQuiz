import * as React from 'react';
import './Buttons.css';

class SubmitButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            //
        }
    }

    public render() {
        return (
            <button className="submitButton" onClick={this.handleClick} />
        );
    }

    public componentDidMount(){
        //
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default SubmitButton;