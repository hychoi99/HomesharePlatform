import React, { Component } from 'react'
import axios from 'axios';
import CourseItem from './CourseItem';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import PropTypes from 'prop-types';


class CourseList extends Component {

    state = {
        courselist: [
            {
                courseid: 1,
                coursename: 'CMPE-273'
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getcourseliststudent')
            .then((response) => {
                console.log(response);
                this.setState({ courselist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Your Courses</h3>
                {this.state.courselist.map((c) => (
                    <React.Fragment key={c.courseid}>
                        <Link to={`/courseliststudent/courseitemstudent/${c.courseid}`}>{c.title}</Link>
                        <br />
                    </React.Fragment>
                ))}
                {this.state.courselist.map((c) => (
                    <React.Fragment key={c.courseid}>
                        <Route path={`/courseliststudent/courseitemstudent/${c.courseid}`} render={ (props) => 
                            <CourseItem {...props} courseItem={c} />
                        }/>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default CourseList;
