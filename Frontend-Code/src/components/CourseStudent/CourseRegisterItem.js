import React, { Component } from 'react'
import axios from 'axios';

class CourseRegisterItem extends Component {

    state = {
        enrollstatus: 0,
        waitlistnumber: '',
        enrollnum: 0,
        authflag: false
    }
    componentDidMount() {
        axios.get('http://localhost:3001/isregistered', {
            params: {
                courseid: this.props.courseRegisterItem.courseid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ enrollstatus: response.data[0].count });
            })
        axios.get('http://localhost:3001/getenrollnum', {
            params: {
                courseid: this.props.courseRegisterItem.courseid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ enrollnum: response.data[0].count });
            });
        
    }

    onRegisterSubmit = (e) => {
        const data = { courseid: this.props.courseRegisterItem.courseid };
        axios.post('http://localhost:3001/registercourse', data)
            .then((response) => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
                this.setState({ enrollnum: this.state.enrollnum+1 });
            });
      }

      onDropSubmit = (courseid) => {
        const data = { courseid: this.props.courseRegisterItem.courseid };
        axios.post('http://localhost:3001/dropcourse', data)
        .then((response) => {
            console.log("Status Code : ",response.status);
            response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            this.setState({ enrollnum: this.state.enrollnum-1 });
        });
      }
    
      onWaitlistSubmit = (courseid) => {
        const data = { courseid: this.props.courseRegisterItem.courseid };
        axios.post('http://localhost:3001/waitlistcourse', data)
            .then((response) => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
      }

  render() {

    let courseId = this.props.courseRegisterItem.courseid;
    let courseName = this.props.courseRegisterItem.title;
    let courseDesc = this.props.courseRegisterItem.description;
    let numEnrolled = this.state.enrollnum;
    let courseCapacity = this.props.courseRegisterItem.capacity;

    let submitBtn;
    let text;
    if (this.state.enrollstatus) {
        submitBtn = this.onDropSubmit
        text = "Drop"
    } else if (numEnrolled >= courseCapacity) {
        //waitlist
        submitBtn = this.onWaitlistSubmit
        text = "Req. PerNo."
    } else {
        //register
        submitBtn = this.onRegisterSubmit
        text = "Register"
    }

    let submitstatus = this.state.authflag ? 'Successful!' : '';

    return (
        <div >
            <p>
                CourseId: {courseId} | Course: {courseName} | Course Description: {courseDesc} | Enrollment: {this.state.enrollnum} / {courseCapacity}
                <button onClick={submitBtn} type="submit">{text}</button>
                {submitstatus}
            </p>
        </div>
    )
  }
}


export default CourseRegisterItem
