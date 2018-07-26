import * as React from 'react';
import './Buttons.css';

class HomeButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            //
        }
    }

    public render() {
        return (
            <button className="homeButton" onClick={this.handleClick} />
        );
    }

    public componentDidMount(){
        //
    }

    public handleClick() {
        alert("Button Clicked");
    }
}

export default HomeButton;