import React, { Component } from 'react';
import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CourseListFaculty extends Component {

    state = {
        courselist: [
            {
                courseid: 1,
                title: 'CMPE-TEST'
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getcourselistfaculty')
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
                        <Link to={`/courselistfaculty/courseitemfaculty/${c.courseid}`}>{c.title}</Link>
                        <br/>
                    </React.Fragment>
                ))}
                {this.state.courselist.map((c) => (
                    <Route path={`/courselistfaculty/courseitemfaculty/${c.courseid}`} render={ (props) => 
                        <CourseItemFaculty {...props} courseItem={c} />
                    }/>
                ))}
            </div>
        )
    }
}

export default CourseListFaculty
