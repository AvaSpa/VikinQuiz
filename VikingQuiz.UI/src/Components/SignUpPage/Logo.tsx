import * as React from 'react';
import './Buttons.css';

class Logo extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            //
        }
    }

    public render() {
        return (
            <button className="logo" />
        );
    }

    public componentDidMount(){
        //
    }
}

export default Logo;