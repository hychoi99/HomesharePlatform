import React, { Component } from 'react'
import axios from 'axios';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import EnrolledStudent from './CourseEnrolledStudent';
import WaitlistStudent from './CourseWaitlistStudent';
import Announcement from './CourseAnnouncement';
import Assignment from './CourseAssignment';
import Quiz from './CourseQuiz';
import Lecture from './CourseLecture';

class CourseItemFaculty extends Component {
    state = {
        enrolledlist: [{ userid: '123', name: 'choi' }], // test data
        waitlist: [{ userid: '124', name: 'yul' }],
        authflag: false
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
        axios.get('http://localhost:3001/getwaitliststudents', {
            params: {
                courseid: this.props.courseItem.courseid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ waitlist: response.data });
            });
    }

    onSubmitDropStudent = (userid, courseid) => {
        const data = { userid: userid, courseid: courseid };
        axios.post('http://localhost:3001/dropstudent', data)
            .then((response) => {
                console.log(response);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
                this.setState({ enrolledlist: [...this.state.enrolledlist
                    .filter(e => e.userid !== userid)]})
            });
    }

    onSubmitPermissionCode = (userid, courseid) => {
        const data = { userid: userid, courseid: courseid };
        axios.post('http://localhost:3001/submitpermissioncode', data)
            .then((response) => {
                console.log(response);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
                this.setState({ waitlist: [...this.state.waitlist
                    .filter(e => e.courseid !== courseid)]})
            });
    }

    render() {
        return (
            <div>
                <h2>Details for Class: {this.props.courseItem.title}</h2>
                <React.Fragment>
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courseannouncement`}>Announcements</Link> &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courselecture`}>Lecture Notes</Link> &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courseassignment`}>Assignments</Link> &nbsp;&nbsp;|&nbsp;&nbsp;
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/coursequiz`}>Quiz</Link>

                    <br/><br/>
                </React.Fragment>
                <React.Fragment>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courseannouncement`} render={ (props) => 
                        <Announcement {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courseassignment`} render={ (props) => 
                        <Assignment {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/coursequiz`} render={ (props) => 
                        <Quiz {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseItem.courseid}/courselecture`} render={ (props) => 
                        <Lecture {...props} courseId={this.props.courseItem.courseid} />
                    }/>
                    <br/>
                </React.Fragment>
                <h3>Enrolled Students</h3>
                {this.state.enrolledlist.map((t) => (
                    <EnrolledStudent key={t.userid} enrolledStudent={t} courseId={this.props.courseItem.courseid} onSubmitDropStudent={this.onSubmitDropStudent}/>
                ))}
                <h3>Waitlist Students</h3>
                {this.state.waitlist.map((t) => (
                    <WaitlistStudent key={t.userid} waitlistStudent={t} courseId={this.props.courseItem.courseid} onSubmitPermissionCode={this.onSubmitPermissionCode}/>
                ))}
            </div>
        )
    }
}

export default CourseItemFaculty
