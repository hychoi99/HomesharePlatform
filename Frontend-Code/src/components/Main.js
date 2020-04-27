import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import axios from 'axios';
import Login from './Login/Login';
import Navbar from './LandingPage/Navbar';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import Signup from './Signup';
import CourseList from './CourseStudent/CourseList';
import CourseRegister from './CourseStudent/CourseRegister';
import CourseListFaculty from './CourseFaculty/CourseListFaculty';
import CourseCreate from './CourseFaculty/CourseCreate';

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
            this.setState({ authorization: response.data[0].authorization });
        });
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getauth')
        .then((response) => {
            console.log(response);
            this.setState({ authorization: response.data[0].authorization });
        });
    }

    render(){
        let home = null;
        if (this.state.authorization === 'faculty') {
            home = (<Route path="/home" component={CourseListFaculty}/>);
        } else if (this.state.authorization === 'student') {
            home = <Route path="/home" component={CourseList}/>
        } else {
            home = <Route path="/home" component={CourseList}/>
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
                <Route path="/updateprofile" render={ (props) => 
                    <UpdateProfile {...props} userId={this.state.userId} />
                }/>
                <Route path="/courseliststudent" component={CourseList} />
                <Route path="/courseregisterstudent" component={CourseRegister} />
                <Route path="/courselistfaculty" component={CourseListFaculty} />
                <Route path="/coursecreate" component={CourseCreate} />

            </div>
        )
    }
}
//Export The Main Component
export default Main;