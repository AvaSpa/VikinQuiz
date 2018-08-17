import * as React from 'react';
import './Footer.css';


import BottomLogo from 'src/Components/BottomLogo/BottomLogo';

class Footer extends React.Component<{}, {}> {
   public footerRef: any;

   constructor(props: any) {
      super(props);
      this.footerRef = React.createRef();
   }

   public setClassBasedOnWindowHeight = () => {
      if (document.body.offsetHeight + this.footerRef.current.offsetHeight > window.innerHeight) {
         this.footerRef.current.classList.remove("bigger-than-window");
         this.footerRef.current.classList.add("smaller-than-window");
      } else {
         this.footerRef.current.classList.add("bigger-than-window");
         this.footerRef.current.classList.remove("smaller-than-window");
      }
   }


   public componentWillUnmount() {
      window.removeEventListener("resize", this.setClassBasedOnWindowHeight);
   }

   public componentDidMount() {
      this.setClassBasedOnWindowHeight();
      window.addEventListener("resize", this.setClassBasedOnWindowHeight);
   }

   public render() {
      return (
            <footer id="footer" ref={this.footerRef}>
               <BottomLogo />
            </footer>
      );
   }
}

export default Footer;