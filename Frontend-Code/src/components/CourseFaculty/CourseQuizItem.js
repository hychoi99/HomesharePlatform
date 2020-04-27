import React, { Component } from 'react'
import axios from 'axios';

class CourseQuizItem extends Component {

    state = {
        quizsubmissions: [
            {
                quiz: '',
                studentid: '',
                studentname: '',
            }
        ],
        submitstatus: ''
    }

    //List students in class

    //Get students who submitted quiz

    componentDidMount() {
        axios.get('http://localhost:3001/getquizsubmissions', {
            params: {
                quizid: this.props.courseQuizItem.quizid
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ quizsubmissions: response.data });
            });
    }

    //Give grade to quiz
    onSubmitQuizGrade = (e) => {
        console.log(e.target.id);
        const data = {
            quizid: e.target.id,
            quizgrade: e.target.value //this a problem. Might need to create another sub component
        }
        axios.post('http://localhost:3001/submitquizgrade', data)
            .then((response) => {
                console.log(response);
                this.setState({ submitstatus: response.data });
            });
    }

    render() {
        return (
            <div>
                <p>each student, grade</p>
            </div>
        )
    }
}

export default CourseQuizItem
