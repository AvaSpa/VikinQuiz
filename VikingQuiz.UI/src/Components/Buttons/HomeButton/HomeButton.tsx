import * as React from 'react';
import './HomeButton.css';

class HomeButton extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
    }

    public render() {
        return (
            <button className="home-button" onClick={this.handleClick} />
        );
    }

    public handleClick() {
        //
    }
}

export default HomeButton;
