import React, { Component } from 'react';
import axios from 'axios';

class CourseListCreate extends Component {

    state = {
        title: '',
        description: '',
        file: '',
        submitstatus: '',
        authflag: false
    }

    onSubmitLecture = (e) => {
        e.preventDefault();
        //http call to updateprofile
        const data = {
            title : this.state.title,
            description : this.state.description,
            courseid: this.props.courseId,
            file: this.state.file
        }
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post('http://localhost:3001/createlecture',data)
            .then((response) => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
        axios.post('http://localhost:3001/upload', this.state.file)
        .then((response) => {
            console.log("Status Code : ",response.status);
            response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
        });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    fileChangedHandler = (e) => {
        this.setState({ file: e.target.files[0] });
    }

    render() {
        let submitstatus = this.state.authflag ? 'Announcement Created' : '';
        return (
            <div>
                <div className="container">
                    <input type="file" name="filename" onChange={this.fileChangedHandler} />
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="title" placeholder="title" />
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="description" placeholder="description" />
                    </div>
                    <br/>
                    <div style={{width: '30%'}}>
                        <button onClick = {this.onSubmitLecture}  className="btn btn-success" type="submit">Create</button>
                        {submitstatus}
                    </div> 
                </div>
            </div>
        )
    }
}

export default CourseListCreate
