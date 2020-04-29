import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import axios from 'axios';

//create the Navbar Component
class Navbar extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    state = {
        authorization: 'student'
    }
    //handle logout to destroy the cookie
    handleLogout = () => {
        cookie.remove('cookie', { path: '/' });
        axios.get('http://localhost:3001/logout');
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getauth')
            .then((response) => {
                console.log(response);
                this.setState({ authorization: response.data[0].authorization });
            });
    }

    // componentDidUpdate() {
    //     axios.get('http://localhost:3001/getauth')
    //         .then((response) => {
    //             console.log(response);
    //             this.setState({ authorization: response.data[0].authorization });
    //         });
    // }

    render(){
        //if Cookie is set render Logout Button
        let navLogin = null;
        if(cookie.load('cookie')){
            console.log("Able to read cookie");
            console.log("Authorization: ",this.props.authorization);
            if (this.props.authorization === 'faculty') {
                navLogin = (
                    <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/updateprofile">Update Profile</Link></li>
                            <li><Link to="/courselistfaculty">Your Courses</Link></li>
                            <li><Link to="/coursecreate">Create a Course</Link></li>
                            <br />
                            <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                );
            } else if (this.props.authorization === 'student') {
                navLogin = (
                    <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/updateprofile">Update Profile</Link></li>
                            <li><Link to="/courseliststudent">Your Courses</Link></li>
                            <li><Link to="/courseregisterstudent">Register for Course</Link></li>
                            <br />
                            <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                );
            } else if (this.props.authorization === 'host') {
                navLogin = (
                    <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/home">Home</Link></li>
                            <li><Link to="/updateprofile">My Rooms</Link></li>
                            <li><Link to="/courseliststudent">My Payments</Link></li>
                            <li><Link to="/courseregisterstudent">My Reviews</Link></li>
                            <br />
                            <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                );
            } else {
                navLogin = (
                    <ul className="nav navbar-nav navbar-right">
                            <li className="active"><Link to="/">ERROR: Account Authorization Invalid</Link></li>
                            <li><Link to="/" onClick = {this.handleLogout}><span className="glyphicon glyphicon-user"></span>Logout</Link></li>
                    </ul>
                );
            }
        }else{
            //Else display login button
            console.log("Not Able to read cookie");
            navLogin = (
                <ul className="nav navbar-nav navbar-right">
                        <li><Link to="/login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                </ul>
            )
        }
        let redirectVar = null;
        if(cookie.load('cookie')){
            //redirectVar = <Redirect to="/home"/>
        }
        return(
            <div>
                {redirectVar}
            <nav className="navbar navbar-inverse" style={navStyle}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/home">Home Share App</Link>
                    </div>
                    <ul className="nav navbar-nav">
                        {navLogin}
                    </ul>
                    
                </div>
            </nav>
        </div>
        )
    }
}



const navStyle = {
	background: '#0055A8',
	color: '#f4f4f4',
	border: 'none',
	padding: '5px 10px',
    
	cursor: 'pointer',
    float: 'left',
    height: '2000px'
}

export default Navbar;