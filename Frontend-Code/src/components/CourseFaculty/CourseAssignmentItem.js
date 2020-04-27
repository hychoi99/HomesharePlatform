import React, { Component } from 'react'
import axios from 'axios';

class CourseAssignmentItem extends Component {

    state = {
        assignmentsubmissions: [
            {
                assignmentid: '',
                studentid: '',
                studentname: '',
                submitted: '',
                submittedfile: ''
            }
        ],
        submitstatus: ''
    }

    //List students in class

    //Get students who submitted assignment

    componentDidMount() {
        axios.get('http://localhost:3001/getassignmentsubmissions', {
            params: {
                assignmentid: this.props.courseAssignmentItem.assignmentid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ assignmentsubmissions: response.data });
            });
    }

    //Download submitted assignment

    //Give grade to assignment
    onSubmitAssignmentGrade = (e) => {
        console.log(e.target.id);
        const data = {
            assignmentid: e.target.id,
            assignmentgrade: e.target.value //this a problem. Might need to create another sub component
        }
        axios.post('http://localhost:3001/submitassignmentgrade', data)
            .then((response) => {
                console.log(response);
                this.setState({ submitstatus: response.data });
            });
    }

    render() {
        return (
            <div>
                <p>each student, file download, grade submit</p>
            </div>
        )
    }
}

export default CourseAssignmentItem
