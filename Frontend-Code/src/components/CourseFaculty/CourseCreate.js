import React, { Component } from 'react'
import axios from 'axios';

class CourseCreate extends Component {

    state = {
        courseid: '',
        coursename: '',
        coursedept: '',
        coursedesc: '',
        courseroom: '',
        coursecapacity: '',
        coursewaitlistcapacity: '',
        courseterm: '',
        authflag: false
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    submitCreate = (e) => {
        e.preventDefault();
        const data = {
            title: this.state.coursename,
            department: this.state.coursedept,
            description: this.state.coursedesc,
            room: this.state.courseroom,
            capacity: this.state.coursecapacity,
            waitlistcapacity: this.state.coursewaitlistcapacity,
            term: this.state.courseterm
        }
        axios.post('http://localhost:3001/createcourse', data)
            .then(response => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
    }

    // TODO: form completetion check!
    render() {
        let submitstatus = this.state.authflag ? 'Course Created!' : '';
        return (
                <div>
                    <h3>Create Course</h3>
                    <div className="container">
                        <div style={{width: '30%'}} className="form-group">
                            <p>title</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="coursename" placeholder="title"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>department</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="coursedept" placeholder="department"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>description</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="coursedesc" placeholder="description"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>room</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="courseroom" placeholder="room"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>capacity</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="coursecapacity" placeholder="capacity"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>waitlist capacity</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="coursewaitlistcapacity" placeholder="waitlist capacity"/>
                        </div>
                        <div style={{width: '30%'}} className="form-group">
                            <p>term</p>
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="courseterm" placeholder="term"/>
                        </div>
                        <br/>
                        <div style={{width: '30%'}}>
                            <button onClick = {this.submitCreate}  className="btn btn-success" type="submit">Create</button>
                            {submitstatus}
                        </div> 
                    </div>
                </div>
        )
    }
}

export default CourseCreate
