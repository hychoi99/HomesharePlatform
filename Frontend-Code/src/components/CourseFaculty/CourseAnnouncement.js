import React, { Component } from 'react';
import axios from 'axios';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import CreateAnnouncement from './CourseAnnouncementCreate';

class CourseAnnouncement extends Component {

    state = {
        announcementlist: [
            { title: 'title1', detail: 'detail1' },
            { title: 'title2', detail: 'detail2' }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getannouncement', {
            params: {
                courseid: this.props.courseId
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ announcementlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <React.Fragment>
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courseannouncement/create`}>Create Announcement</Link>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courseannouncement/create`} render={ (props) => 
                        <CreateAnnouncement {...props} courseId={this.props.courseId} />
                    }/>
                    <br/>
                </React.Fragment>
                {this.state.announcementlist.map((e) => (
                    <div key={e.title}>
                        <p>{e.title}</p>
                        <p>{e.description}</p>
                        <p>_______________</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default CourseAnnouncement
