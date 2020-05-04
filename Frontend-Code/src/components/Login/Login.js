//SJSU CMPE 226 Spring 2020 TEAM5
import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';
//SJSU CMPE 226 Spring 2020 TEAM5
import cookie from 'react-cookies';
import {Redirect} from 'react-router';

//Define a Login Component
class Login extends Component{
    //call the constructor method
    constructor(props){
        //Call the constructor of Super class i.e The Component
        super(props);
        //maintain the state required for this component
        this.state = {
            username : "",
            password : "",
            acctType : "host",
            authFlag : false
        }
        //Bind the handlers to this class
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this);
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
        this.acctTypeChangeHandler = this.acctTypeChangeHandler.bind(this);
        this.submitLogin = this.submitLogin.bind(this);
    }
    //Call the Will Mount to set the auth Flag to false
    componentWillMount(){
        this.setState({
            authFlag : false
        })
    }
    //username change handler to update state variable with the text entered by the user
    usernameChangeHandler = (e) => {
        this.setState({
            username : e.target.value
        })
    }
    //password change handler to update state variable with the text entered by the user
    passwordChangeHandler = (e) => {
        this.setState({
            password : e.target.value
        })
    }
    acctTypeChangeHandler = (e) => {
        this.setState({
            acctType : e.target.value
        })
    }
    //submit Login handler to send a request to the node backend
    submitLogin = (e) => {
        var headers = new Headers();
        //prevent page from refresh
        e.preventDefault();
        const data = {
            username : this.state.username,
            password : this.state.password,
            acctType : this.state.acctType
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log(data);
        axios.post('http://localhost:3001/login',data)
            .then(response => {
                window.location.reload();
                console.log("Status Code : ",response.status);
                console.log("Response Data : ", response.data.userid);
                if(response.status === 200){
                    this.setState({
                        authFlag : true
                    })
                }else{
                    this.setState({
                        authFlag : false
                    })
                }
            });
        
    }

    render(){
        //redirect based on successful login
        let redirectVar = null;
        if(cookie.load('cookie')){
            redirectVar = <Redirect to= "/home"/>
        }
        let submitstatus = this.state.authflag ? 'User not Found!' : '';
        return(

            <div className="container">
                {redirectVar}
                <div className="login-form">
                    <div className="main-div">
                        <div className="panel">
                            <h2>Login</h2>
                            <p>Please enter your username and password</p>
                        </div>
                        
                            <div className="form-group">
                                <input onChange = {this.usernameChangeHandler} type="text" className="form-control" name="username" placeholder="Username"/>
                            </div>
                            <div className="form-group">
                                <input onChange = {this.passwordChangeHandler} type="password" className="form-control" name="password" placeholder="Password"/>
                            </div>
                            <div className="form-group">
                                <select onChange = {this.acctTypeChangeHandler} name="acctType" defaultValue="host">
                                    <option value="host">Host</option>
                                    <option value="guest">Guest</option>
                                </select>
                            </div>
                            <button onClick = {this.submitLogin} className="btn btn-primary">Login</button>      
                                       
                    </div>
                </div>
            </div>

        )
    }
}
//export Login Component
export default Login;