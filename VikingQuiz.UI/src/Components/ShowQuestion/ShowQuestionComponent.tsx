import * as React from 'react';
import './ShowQuestionComponent.css';
import ShowQuestionFooter from './ShowQuestionFooter/ShowQuestionFooter';
import ShowQuestionHeader from './ShowQuestionHeader/ShowQuestionHeader';
import ShowQuestionMain from './ShowQuestionMain/ShowQuestionMain';


class ShowQuestionComponent extends React.Component<any, any>{

    public render(){
        return (
            <div className='show-question'>
                <header className='header'>
                    <ShowQuestionHeader timer={20} />
                </header>
                <main className='main'>
                    <ShowQuestionMain />
                </main>
                <footer className='footer'>
                    <ShowQuestionFooter />
                </footer>
            </div>
        )
    }
}

export default ShowQuestionComponent;