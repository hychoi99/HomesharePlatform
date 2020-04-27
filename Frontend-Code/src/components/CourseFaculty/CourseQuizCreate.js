import React, { Component } from 'react';
import axios from 'axios';

class CourseQuizCreate extends Component {

    state = {
        title: '',
        details: '',
        authflag: false
    }

    onSubmitQuiz = (e) => {
        e.preventDefault();
        //http call to updateprofile
        const data = {
            title : this.state.title,
            description : this.state.description,
            courseid: this.props.courseId
        }
        axios.defaults.withCredentials = true;
        console.log(data);
        axios.post('http://localhost:3001/createquiz',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    render() {
        let submitstatus = this.state.submitstatus ? 'Quiz Created' : '';
        return (
            <div>
                <br/>
                <div className="container">
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="title" placeholder="title" />
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                            <input  onChange = {this.onChangeInput} type="text" className="form-control" name="details" placeholder="details" />
                    </div>
                    <br/>
                    <div style={{width: '30%'}}>
                        <button onClick = {this.onSubmitQuiz}  className="btn btn-success" type="submit">Create</button>
                        {submitstatus}
                    </div> 
                </div>
            </div>
        )
    }
}

export default CourseQuizCreate
