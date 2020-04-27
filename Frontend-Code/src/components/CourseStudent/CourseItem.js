import React, { Component } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CourseRegister from './CourseRegister';
import EnrolledStudent from '../CourseFaculty/CourseEnrolledStudent';
import WaitlistStudent from '../CourseFaculty/CourseWaitlistStudent';
import Announcement from '../CourseFaculty/CourseAnnouncement';
import Assignment from '../CourseFaculty/CourseAssignment';
import Quiz from '../CourseFaculty/CourseQuiz';
import Lecture from '../CourseFaculty/CourseLecture';

class CourseItem extends Component {
    state = {
        test: '1',
        enrolledlist: []
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getenrolledstudents', {
            params: {
                courseid: this.props.courseItem.courseid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ enrolledlist: response.data });
            });
    }

    

    render() {
        const courseitem = this.props.courseitem;
        return (
            <div>
                <h2>Details for Class: {this.props.courseItem.title}</h2>
                <React.Fragment>
                    <Link to={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courseannouncement`}>Announcements</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courselecture`}>Lecture Notes</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courseassignment`}>Assignments</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/coursequiz`}>Quiz</Link>

                    <br/>
                </React.Fragment>
                <React.Fragment>
                    <Route path={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courseannouncement`} render={ (props) => 
                        <Announcement {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courselecture`} render={ (props) => 
                        <Lecture {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courseliststudent/courseitemstudent/${this.props.courseItem.courseid}/courseassignment`} render={ (props) => 
                        <Assignment {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courseliststudent/courseitemstudent  /${this.props.courseItem.courseid}/coursequiz`} render={ (props) => 
                        <Quiz {...props} courseId={this.props.courseItem.courseid} />
                    }/>

                    <br/>
                </React.Fragment>
                <h3>Enrolled Students</h3>
                {this.state.enrolledlist.map((t) => (
                    <p key={t.userid}>Name: {t.name}</p>
                ))}
            </div>
        )
    }
}

export default CourseItem
