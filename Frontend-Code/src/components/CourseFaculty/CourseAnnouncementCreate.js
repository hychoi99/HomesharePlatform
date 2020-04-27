import React, { Component } from 'react';
import axios from 'axios';

class CourseAnnouncementCreate extends Component {

    state = {
        title: '',
        description: '',
        authflag: false
    }

    onSubmitAnnouncement = (e) => {
        e.preventDefault();
        //http call to updateprofile
        const data = {
            title : this.state.title,
            description : this.state.description,
            courseid: this.props.courseId
        }
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post('http://localhost:3001/createannouncement',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        let submitstatus = this.state.authflag ? 'Announcement Created!' : '';
        return (
            <div>
                <br/>
                <div className="container">
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="title" placeholder="title" />
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="description" placeholder="description" />
                    </div>
                    <br/>
                    <div style={{width: '30%'}}>
                        <button onClick = {this.onSubmitAnnouncement}  className="btn btn-success" type="submit">Create</button>
                        {submitstatus}
                    </div> 
                </div>
            </div>
        )
    }
}

export default CourseAnnouncementCreate
