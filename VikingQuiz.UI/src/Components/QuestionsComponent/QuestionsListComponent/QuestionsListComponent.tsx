import * as React from 'react';
import './QuestionsListComponent.css';

class QuestionsListComponent extends React.Component {

    public render(){
        return (
            <div className='questions-list'>
                <h3>Questions List</h3>
                <ul>
                    <li>question 1</li>
                    <li>question 2</li>
                    <li>question 3</li>
                </ul>
            </div>
        )
    }
}

export default QuestionsListComponent;