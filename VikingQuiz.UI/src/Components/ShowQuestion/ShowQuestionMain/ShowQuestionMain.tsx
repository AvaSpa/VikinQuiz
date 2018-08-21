import * as React from 'react';
import './ShowQuestionMain.css'

class ShowQuestionMain extends React.Component{

    public render(){
        return (
            <div className='show-main'>
                <div className='question-text'><span className='number'>3.</span> Where is my precious?</div>
                <div className='answers'>
                    <div>Answer 1</div>
                    <div>Answer 2</div>
                    <div>Answer 3</div>
                    <div>Answer 4</div>
                </div>
            </div>
        )
    }
}

export default ShowQuestionMain;
