//SJSU CMPE 226 Spring 2020 TEAM5
import React, { Component } from 'react';
//import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class HostReviews extends Component {

    state = {
        reviewlist: [
            {
                courseid: 1,
                title: 'CMPE-TEST'
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getreviewshost')
            .then((response) => {
                console.log(response);
                this.setState({ reviewlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Your Reviews</h3>
                <table>
                    <tr>
                        <th>Num</th>
                        <th>Text</th>
                        <th>Time</th>
                        <th>Guest</th>
                    </tr>
                {this.state.reviewlist.map((c) => (

                    <React.Fragment key={c.Re_Num}>
                      <tr>
                        <td>{c.Re_Num}</td>
                        <td>{c.Re_Text}</td>
                        <td>{c.Re_Time}</td>
                        <td>{c.G_email_addr}</td>
                      </tr>
                    </React.Fragment>
                ))}
                </table>
            </div>
        )
    }
}

export default HostReviews