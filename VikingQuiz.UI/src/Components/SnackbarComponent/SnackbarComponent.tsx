import * as React from 'react';
import './SnackbarComponent.css';

interface IProps{
    show: boolean;
    data: any;
}

interface IState{
    show: boolean;
}

class SnackbarComponent extends React.Component<IProps, IState>{

    constructor(props: any){
        super(props);

        this.state = {
            show: this.props.show
        }
    }

    public componentDidUpdate(prevProps: any){
        if(this.props.show !== prevProps.show) 
        {
           this.setState({
               show: this.props.show
           });
        }
    }
    

    public clickHandler = () => {
        this.setState({
            show: false
        });
        this.props.data.action.actionHandler();
    }

    public render(){
        const classes: any = ['snackbar' ,...this.props.data.classes];
        const actionClasses: any = ['action-btn', ...this.props.data.action.classes];

        return (
            <div className={classes.join(' ') + (this.state.show ? " showFunc" : '')}>
                <div className="message">{this.props.data.message}</div>
                <div className="actions">
                    <button className={actionClasses.join(' ')} onClick={this.clickHandler}>{this.props.data.action.actionName}</button>
                </div>
            </div>
        );


    }
}

export default SnackbarComponent;