import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CourseQuizItem from './CourseQuizItem';
import CreateQuiz from './CourseQuizCreate';

class CourseQuiz extends Component {

    state = {
        quizlist: [
            { quizid: '1', title: 'title1', detail: 'detail1' },
            { quizid: '2', title: 'title2', detail: 'detail2' }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getquiz', {
            params: {
                courseid: this.props.courseId
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ quizlist: response.data });
            });
    }


    render() {
        return (
            <div>
                <React.Fragment>
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/coursequiz/create`}>Create Quiz</Link>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/coursequiz/create`} render={ (props) => 
                        <CreateQuiz {...props} courseId={this.props.courseId} />
                    }/>
                    <br/>
                </React.Fragment>
            {this.state.quizlist.map((e) => (
                <React.Fragment key={e.quizid}>
                    <Link to={`/courseassignment/coursequizitem`}>{e.title}</Link>
                    <Route path="/courseassignment/coursequizitem" render={ (props) => 
                        <CourseQuizItem {...props} courseQuizItem={e} />
                    }/>
                    <p>_______________</p>
                </React.Fragment>
            ))}
            </div>
        )
    }
}

export default CourseQuiz
