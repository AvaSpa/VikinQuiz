import * as React from 'react';
import './MyQuizzesComponent.css';
import QuizItem from '../QuizItem/QuizItem';
import axios from '../../../node_modules/axios';
import NewQuizButton from '../Buttons/NewQuizButton/NewQuizButton';


class MyQuizzesComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            redirect: false,
            quiz: [],
            displayAllQuizzes: false
        }

        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.handleLessClick = this.handleLessClick.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    public componentWillMount() {

        axios.get('http:///localhost:60151/api/quizzes')
            .then(response => {
                console.log(response.data)
                this.setState({ quiz: response.data })
            })
            .catch(err => console.log(err))
    }


    public handleMoreClick() {
        this.setState({ displayAllQuizzes: true })
    }


    public handleLessClick() {
        this.setState({ displayAllQuizzes: false })
    }


    public render() {

        const numberOfExistingQuizzes = this.state.quiz.length
        let addButtonForExistingQuizzes
        let addButtonForZeroQuizzes

        if (!numberOfExistingQuizzes) {
            addButtonForExistingQuizzes = null
            addButtonForZeroQuizzes = <NewQuizButton />
        }
        else {
            addButtonForZeroQuizzes = null
            addButtonForExistingQuizzes = <NewQuizButton />
        }

        return (
            <>
                {addButtonForExistingQuizzes}
                <div className="display_Quizzes_Container">
                    <div className="row">
                        <div className=" my_Quizzes_Header">
                            <div className="my_Quizzes_Msg">
                                MY QUIZZES
                        </div>
                        </div>
                        <div className="quiz_Container">
                            {!this.state.quiz.length ?
                                (<div className="no_Quizzes_Container">
                                    <div className="no_Quiz_Message">
                                        CREATE YOUR FIRST QUIZ
                                </div>
                                    <div className="new_Quiz_Button_Container">
                                        {addButtonForZeroQuizzes}
                                    </div>
                                </div>)
                                : (numberOfExistingQuizzes <6 ?
                                    (
                                        this.state.quiz.map((p: any) =>
                                            <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />
                                    ))
                                    : (!this.state.displayAllQuizzes ?
                                        <>
                                            {this.state.quiz.slice(0, 5).map((p: any) =>
                                                <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />)}
                                            <div className="more_Less_Button"><button className="more_Quizzes_Button" onClick={this.handleMoreClick}>SHOW ALL</button></div></>

                                        :
                                        (<>
                                            {this.state.quiz.map((p: any) =>
                                                <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />)}
                                            <div className="more_Less_Button"><button className="more_Quizzes_Button" onClick={this.handleLessClick}>SHOW LESS</button></div></>
                                        )
                                    )
                                )
                            }
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MyQuizzesComponent;