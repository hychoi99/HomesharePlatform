//SJSU CMPE 226 Spring 2020 TEAM5
import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import Signup from './Signup';

import HostRooms from './HostRooms';
import HostPayments from './HostPayments';
import HostReviews from './HostReviews';
import HostAddRoom from './HostAddRoom';
import HostReservations from './HostReservations';

import GuestReservations from './GuestReservations';
import GuestPayments from './GuestPayments';
import GuestReviews from './GuestReviews';
import GuestSearchRooms from './GuestSearchRooms';
import ReserveRoom from './ReserveRoom';
import GuestWriteReview from './GuestWriteReview';

//Create a Main Component
class Main extends Component {
    state = {
        userId: 0,
        authorization: 'stduent'
    };

    saveUserIdState = () => {
        axios.get('http://localhost:3001/getauth')
        .then((response) => {
            console.log(response);
            this.setState({ authorization: response.data });
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getauth')
        .then((response) => {
            console.log(response);
            this.setState({ authorization: response.data });
        });
    }

    render(){
        let home = null;

        if (this.state.authorization === 'host') {
            home = (<Route path="/home" component={HostRooms}/>);
        } else if (this.state.authorization === 'guest') {
            home = <Route path="/home" component={GuestReservations}/>
        } else {
            home = <Route path="/home" component={HostRooms}/>
        }

        return(
            <div>
                {/*Render Different Component based on Route*/}
                <Route path="/" render={ (props) => 
                    <Navbar {...props} authorization={this.state.authorization} />
                }/>
                <Route path="/login" render={ (props) => 
                    <Login {...props} saveUserIdState={this.saveUserIdState} />
                }/>
                <Route path="/signup" component={Signup} />
                {home}
                {/*<Route path="/updateprofile" component={UpdateProfile}/>*/}

                <Route path="/hostreviews" component={HostReviews} />
                <Route path="/hostpayments" component={HostPayments} />
                <Route path="/hostreservations" component={HostReservations} />
                <Route path="/addroom" component={HostAddRoom} />
                <Route path="/guestreviews" component={GuestReviews} />
                <Route path="/guestpayments" component={GuestPayments} />
                <Route path="/guestreservations" component={GuestReservations} />
                <Route path="/guestsearchrooms" component={GuestSearchRooms} />
                <Route path="/reserveroom/:id/:hostemail" component={ReserveRoom} />
                <Route path="/writereview/:id/:hostemail" component={GuestWriteReview} />
            </div>
        )
    }
}
//Export The Main Component
export default Main;