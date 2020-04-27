import React, { Component } from 'react';

class CourseWaitlistStudent extends Component {

    state = {
        authflag: false
    }

    render() {
        let submitstatus = this.state.authflag ? 'Permission Code Sent!' : '';
        return (
            <div>
				<p>
                    {this.props.waitlistStudent.name}
					<button onClick={this.props.onSubmitPermissionCode.bind(this, this.props.waitlistStudent.userid, this.props.courseId)}> Send Code </button>
                    {submitstatus}
				</p>
            </div>
        )
    }
}

const btnStyle = {
	background: '#0055A2',
	color: '#fff',
	border: 'none',
	padding: '5px 10px',
	borderRadius: '50%',
	cursor: 'pointer',

}

export default CourseWaitlistStudent
