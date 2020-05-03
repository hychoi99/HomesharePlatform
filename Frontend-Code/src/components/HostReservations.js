import React, { Component } from 'react';
//import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class HostReservations extends Component {

    state = {
        reservlist: [
            {
                courseid: 1,
                title: 'CMPE-TEST',
                From_date: '',
                To_date: ''
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getreservationshost')
            .then((response) => {
                console.log(response);
                this.setState({ reservlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Your Reservations</h3>
                <table>
                    <tr>
                        <th>From date</th>
                        <th>To date</th>
                        <th>Room ID</th>
                        <th>Guest Email</th>
                        <th>Room Addr</th>
                    </tr>
                {this.state.reservlist.map((c) => (

                    <React.Fragment key={c.From_date}>
                      <tr>
                        <td>{c.From_date.substring(0, 10)}</td>
                        <td>{c.To_date.substring(0, 10)}</td>
                        <td>{c.R_ID}</td>
                        <td>{c.G_email_addr}</td>
                        <td>{c.R_Addr}</td>
                      </tr>
                    </React.Fragment>
                ))}
                </table>
            </div>
        )
    }
}

export default HostReservations