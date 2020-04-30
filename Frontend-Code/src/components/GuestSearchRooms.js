import React, { Component } from 'react';
//import CourseItemFaculty from './CourseItemFaculty';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import axios from 'axios';

class GuestSearchRooms extends Component {

    state = {
        roomlist: [
            {
                courseid: 1,
                title: 'CMPE-TEST'
            }
        ],
        cities: [],
        states: [],
        countries: [],
        city: '',
        state: '',
        country: ''
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getroomsguest')
            .then((response) => {
                console.log(response);
                this.setState({ roomlist: response.data });
            });
        axios.get('http://localhost:3001/getlocations')
                .then((response) => {
                    console.log(response);
                    this.setState({ cities: response.data[0]});
                    this.setState({ states: response.data[1]});
                    this.setState({ countries: response.data[2]});
            });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
        this.onSearch(e);
    }

    onSearch = (e) => {
        let city = '';
        let state = '';
        let country = '';
        let parameters = "?";
        if (e.target.name == "city" && e.target.value != "") {
            parameters = parameters + "&city=" + e.target.value;
        } else if (e.target.name == "state" && e.target.value != "") {
            parameters = parameters + "&state=" + e.target.value;
        } else if (e.target.name == "country" && e.target.value != "") {
            parameters = parameters + "&country=" + e.target.value;
        }
        axios.get('http://localhost:3001/getroomsguest' + parameters)
            .then((response) => {
                console.log(response);
                this.setState({ roomlist: response.data });
            });
    }

    render() {
        return (
            <div>
                <h3>Search Rooms</h3>

                <div style={{width: '30%'}} className="form-group">
                    <p>City: </p>
                    <select onChange = {this.onChangeInput} name="city" defaultValue="">
                        <option value=""></option>
                        {this.state.cities.map((c) => (

                            <React.Fragment key={c.R_City}>
                              <option value={c.R_City}>{c.R_City}</option>
                            </React.Fragment>
                        ))}
                    </select>
                </div>
                <div style={{width: '30%'}} className="form-group">
                    <p>State: </p>
                    <select onChange = {this.onChangeInput} name="state" defaultValue="">
                        <option value=""></option>
                        {this.state.states.map((c) => (

                            <React.Fragment key={c.R_State}>
                              <option value={c.R_State}>{c.R_State}</option>
                            </React.Fragment>
                        ))}
                    </select>
                </div>
                <div style={{width: '30%'}} className="form-group">
                    <p>Country: </p>
                    <select onChange = {this.onChangeInput} name="country" defaultValue="">
                        <option value=""></option>
                        {this.state.countries.map((c) => (

                            <React.Fragment key={c.R_Country}>
                              <option value={c.R_Country}>{c.R_Country}</option>
                            </React.Fragment>
                        ))}
                    </select>
                </div>

                <table>
                    <tr>
                        <th>ID</th>
                        <th>Host Email</th>
                        <th>Price</th>
                        <th>Type</th>
                        <th>Max Guest</th>
                        <th>Address</th>
                        <th>City</th>
                        <th>State</th>
                        <th>Country</th>
                        <th>Status</th>
                    </tr>
                {this.state.roomlist.map((c) => (

                    <React.Fragment key={c.R_ID}>
                      <tr>
                        <td>{c.R_ID}</td>
                        <td>{c.H_email_addr}</td>
                        <td>{c.R_Price}</td>
                        <td>{c.R_Type}</td>
                        <td>{c.R_MaxGuest}</td>
                        <td>{c.R_Addr}</td>
                        <td>{c.R_City}</td>
                        <td>{c.R_State}</td>
                        <td>{c.R_Country}</td>
                        <td>{c.R_Status}</td>
                        <td>
                            <React.Fragment key={c.R_ID}>
                                <Link to={`/reserveroom/${c.R_ID}`}>Reserve</Link>
                            </React.Fragment>
                        </td>
                      </tr>
                    </React.Fragment>
                ))}
                </table>
            </div>
        )
    }
}

export default GuestSearchRooms
