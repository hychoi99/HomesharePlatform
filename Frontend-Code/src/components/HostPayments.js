import React, { Component } from 'react';
//import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class HostPayments extends Component {

    state = {
        paymentlist: [
            {
                courseid: 1,
                title: 'CMPE-TEST'
            }
        ]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getpaymentshost')
            .then((response) => {
                console.log(response);
                this.setState({ roomlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Your Payments</h3>
                <table>
                    <tr>
                        <th>Number</th>
                        <th>Time</th>
                        <th>Amount</th>
                        <th>Guest</th>
                        <th>Host</th>
                    </tr>
                {this.state.paymentlist.map((c) => (

                    <React.Fragment key={c.P_Num}>
                      <tr>
                        <td>{c.P_Num}</td>
                        <td>{c.P_Time}</td>
                        <td>{c.P_Amount}</td>
                        <td>{c.G_email_addr}</td>
                        <td>{c.H_email_addr}</td>
                      </tr>
                    </React.Fragment>
                ))}
                </table>
            </div>
        )
    }
}

export default HostPayments