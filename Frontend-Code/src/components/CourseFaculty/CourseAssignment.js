import React, { Component } from 'react';
import axios from 'axios';
import CourseAssignmentItem from './CourseAssignmentItem';
import CreateAssignment from './CourseAssignmentCreate';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

class CourseAssignment extends Component {

    state = {
        assignmentlist: [
            { assignmentid: '1', title: 'title1', detail: 'detail1' },
            { assignmentid: '2', title: 'title2', detail: 'detail2' }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getassignment', {
            params: {
                courseid: this.props.courseId
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ assignmentlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courseassignment/create`}>Create Assignment</Link>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courseassignment/create`} render={ (props) => 
                        <CreateAssignment {...props} courseId={this.props.courseId} />
                    }/>
                    <br/>
                </React.Fragment>
            {this.state.assignmentlist.map((e) => (
                <React.Fragment key={e.assignmentid}>
                    <Link to={`/courseassignment/courseassignmentitem`}>{e.title}</Link>
                    <Route path="/courseassignment/courseassignmentitem" render={ (props) => 
                        <CourseAssignmentItem {...props} courseAssignmentItem={e} />
                    }/>
                    <p>_______________</p>
                </React.Fragment>
            ))}
            </div>
        )
    }
}

export default CourseAssignment
