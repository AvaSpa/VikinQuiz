import * as React from 'react';
import './BottomLogo.css'
import logo from 'src/media/logo.png';

class BottomLogo extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }


  public render() {
    return (
        <img src={logo} className="logo-img"/>
    );
  }
}

export default BottomLogo;