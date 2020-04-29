import React, { Component } from 'react';
import axios from 'axios';

class Signup extends Component {

    state = {
        email: '',
        password: '',
        //authorization: 'student',
        acctType: 'host',
        fname: '',
        lname: '',
        gender: '',
        status: 0
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    submitSignup = (e) => {
        const data = {
            email: this.state.username,
            password: this.state.password,
            //authorization: this.state.authorization,
            acctType: this.state.acctType,
            fname: this.state.fname,
            lname: this.state.lname,
            phone: this.state.phone,
            gender: this.state.gender
        }
        axios.post('http://localhost:3001/signup', data)
            .then(response => {
                console.log(response);
                if(response.status === 200) {
                    console.log("Inside success status");
                    this.setState({ status: 1 });
                } else {
                    this.setState({ status: -1 });
                }
            })
    }

    render() {
        let status;
        if (this.state.status === 0) {
            status = '';
        } else if (this.state.status === 1) {
            status = 'Signup Successful!';
        } else {
            status = 'Error: Signup Unsuccessful!';
        }

        return (
            <div className="container">
                
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>User Signup</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="text" className="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="text" className="form-control" name="fname" placeholder="First Name"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="text" className="form-control" name="lname" placeholder="Last Name"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="text" className="form-control" name="phone" placeholder="Phone"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.onChangeInput} type="text" className="form-control" name="gender" placeholder="Gender"/>
                            </div>
                            <div className="form-group">
                                <select onChange = {this.onChangeInput} name="acctType" defaultValue="host">
                                    <option value="host">Host</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>
                            <button onClick = {this.submitSignup} className="btn btn-primary">Submit</button>
                            {status}                 
                    </div>
                </div>
            </div>
        )
    }
}

export default Signup
