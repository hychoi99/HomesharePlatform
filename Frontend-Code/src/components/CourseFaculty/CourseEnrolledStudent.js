import React, { Component } from 'react'

class CourseEnrolledStudent extends Component {

    state = {
        authflag: false
    }

    render() {
        let submitstatus = this.state.authflag ? 'Student Dropped!' : '';
        return (
            <div>
				<p>
                    {this.props.enrolledStudent.name}
					<button onClick={this.props.onSubmitDropStudent.bind(this, this.props.enrolledStudent.userid, this.props.courseId)}> Drop Student </button>
                    {submitstatus}
				</p>
            </div>
        )
    }
}

export default CourseEnrolledStudent
