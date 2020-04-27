import React, { Component } from 'react';
import axios from 'axios';

class CourseAnnouncement extends Component {

    state = {
        announcementlist = []
    }

    componentDidMount() {
        const data = { courseid: this.props.courseitem };
        axios.get('http://localhost:3001/getannouncements', {
            params: {
                courseid = this.props.courseid
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
                {this.state.announcementlist.map((e) => {
                    <div key={e.title}>
                        <p>{e.title}, {e.detail}</p>
                    </div>
                })}
            </div>
        )
    }
}

export default CourseAnnouncement
