import * as React from 'react';
import './MyComponent.css';


interface IMyComponentState{
    color: string;
  }
  
  interface IMyComponentProps{
    color: string;
  }

class MyComponent extends React.Component<IMyComponentProps, IMyComponentState> {
  constructor(props: any) {
    super(props);
    this.state = {
        color: "pink"
    }
}


public componentDidMount(){
    if(this.props.color !== this.state.color){
        this.setState({color:this.props.color});
    }
}

public render() {
    return (
      <div className="myComponent">
        <p>Louisa</p>
        <p className={this.state.color}>{this.state.color}</p>
      </div>
    );
  }
}

export default MyComponent;
