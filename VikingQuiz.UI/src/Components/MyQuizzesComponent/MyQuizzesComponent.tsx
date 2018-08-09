import * as React from 'react';
import './MyQuizzesComponent.css';
import QuizItem from '../QuizItem/QuizItem';
import axios from '../../../node_modules/axios';
import NewQuizButton from '../Buttons/NewQuizButton/NewQuizButton';
import ProfileAndHomeComponent from '../ProfileAndHomeComponent/ProfileAndHomeComponent';

class MyQuizzesComponent extends React.Component<any, any> {
    
    private readonly apiAddressForQuizzes = 'http:///localhost:60151/api/quizzes/'
    private readonly apiAddressForUsers = 'http://localhost:60151/api/users/3'
    
    constructor(props: any) {
        super(props);

        this.state = {
            serverMessage: '',
            showServerMessage: false,
            quizzes: [],
            displayAllQuizzes: false,
            username: '',
            profilePictureUrl: ''
        }

        this.SetupHandlers();
    }

    public SetupHandlers = () => {
        this.handleMoreClick = this.handleMoreClick.bind(this);
        this.handleLessClick = this.handleLessClick.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    public componentWillMount() {

        axios.get(this.apiAddressForQuizzes)
            .then(response => {
                this.setState({ quizzes: response.data })
            })
            .catch(error => this.onAxiosError(error))

        axios.get(this.apiAddressForUsers)
        .then(response => {
            this.setState({ username: response.data.username, profilePictureUrl: response.data.pictureUrl })
        })
        .catch(error => this.onAxiosError(error))
    }

    public onAxiosError = (error: any) => {
        this.setState({showServerMessage: true})
        if(error.response === undefined){
            this.setState({serverMessage : 'Could not connect to server.'})
        }
        else{
            this.setState({serverMessage : error.response.data})
        }
    }

    public handleMoreClick() {
        this.setState({ displayAllQuizzes: true })
    }

    public handleLessClick() {
        this.setState({ displayAllQuizzes: false })
    }

    public render() {

        const numberOfExistingQuizzes = this.state.quizzes.length
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
            <div className="my-quizzes-profile-container">
                    <ProfileAndHomeComponent profilePictureUrl ={this.state.profilePictureUrl} profileName={this.state.username}/>  
                    {addButtonForExistingQuizzes}
            </div>
                <div className="display-quizzes-container">
                    <div className="row">                   
                        <div className=" my-quizzes-header">
                            <div className="my-quizzes-msg">
                                    MY QUIZZES
                            </div>
                        </div>
                        <div className="quiz-container">
                            {!this.state.quizzes.length ?
                                (
                                <div className="no-quizzes-container">
                                    <div className="no-quiz-message">
                                        CREATE YOUR FIRST QUIZ
                                    </div>
                                    <div className="new-quiz-button-container">
                                        {addButtonForZeroQuizzes}
                                    </div>
                                </div>
                                )
                                :   (numberOfExistingQuizzes <6 ?
                                        (
                                        this.state.quizzes.map((p: any) =>
                                            <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />)
                                        )
                                        : 
                                        (!this.state.displayAllQuizzes ?
                                            <>
                                                {this.state.quizzes.slice(0, 5).map((p: any) =>
                                                    <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />
                                                )}
                                                <div className="more-less-button">
                                                    <button className="more-quizzes-button" onClick={this.handleMoreClick}>SHOW ALL</button>
                                                </div>
                                            </>
                                            :
                                            (
                                            <>
                                                {this.state.quizzes.map((p: any) =>
                                                    <QuizItem key={p.id} title={p.title} photo={p.pictureUrl} id={p.id} handleChildDelete={this.componentWillMount} />)}
                                                <div className="more-less-button">
                                                    <button className="more-quizzes-button" onClick={this.handleLessClick}>SHOW LESS</button>
                                                </div>
                                            </>
                                            )
                                        )
                                )
                            }
                        </div>
                        {this.state.showServerMessage ? 
                            <div className="server-message">{this.state.serverMessage}</div> 
                        :
                           null
                        }
                    </div>
                </div>
            </>
        );
    }
}

export default MyQuizzesComponent;