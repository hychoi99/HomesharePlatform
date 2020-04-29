import React, { Component } from 'react';
//import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class HostRooms extends Component {

    state = {
        roomlist: [
            {
                courseid: 1,
                title: 'CMPE-TEST'
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getroomshost')
            .then((response) => {
                console.log(response);
                this.setState({ roomlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Your Rooms</h3>
                <Link to={`/addroom`}>Add New Room</Link>
                <table>
                    <tr>
                        <th>ID</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Max Guest</th>
                        <th>Address</th>
                        <th>Status</th>
                    </tr>
                {this.state.roomlist.map((c) => (

                    <React.Fragment key={c.R_ID}>
                      <tr>
                        <td>{c.R_ID}</td>
                        <td>{c.R_Price}</td>
                        <td>{c.R_Type}</td>
                        <td>{c.R_MaxGuest}</td>
                        <td>{c.R_Addr}</td>
                        <td>{c.R_Status}</td>
                      </tr>
                    </React.Fragment>
                ))}
                </table>
            </div>
        )
    }
}

export default HostRooms
