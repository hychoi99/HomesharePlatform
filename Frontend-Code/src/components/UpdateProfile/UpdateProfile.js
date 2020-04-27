import React, {Component} from 'react';
import '../../App.css';
import axios from 'axios';

class UpdateProfile extends Component {

    state = {
        name: '',
        email: '',
        phone: '',
        aboutme: '',
        city: '',
        country: '',
        school: '',
        company: '',
        hometown: '',
        languages: '',
        gender: '',
        image: '',
        authflag: false,
        existingProfile: [{}]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getprofile')
                .then((response) => {
                    console.log(response);
                    this.setState({ existingProfile: response.data });
                    this.setState({ image: this.state.existingProfile[0].image });
                    //update state
                //update the state with the response data
                // this.setState({
                //     books : this.state.books.concat(response.data) 
                // });
            });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmitProfile = (e) => {
        e.preventDefault();
        //http call to updateprofile
        const data = {
            email : this.state.email,
            name : this.state.name,
            phone: this.state.phone,
            aboutme: this.state.aboutme,
            city: this.state.city,
            country: this.state.country,
            school: this.state.school,
            company: this.state.company,
            hometown: this.state.hometown,
            language: this.state.language,
            gender: this.state.gender,
            image: this.state.image
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log(data);
        axios.post('http://localhost:3001/updateprofile',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
    }

    getBase64(file, cb) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

    fileChangedHandler = (e) => {

        let idCardBase64 = '';
        this.getBase64(e.target.files[0], (result) => {
             idCardBase64 = result;
        });

        const file    = e.target.files[0]
        const reader  = new FileReader();
    
        reader.onloadend = () => {
            this.setState({
                image: idCardBase64
            })
        }
        if (file) {
            reader.readAsDataURL(file);
            this.setState({
                image :idCardBase64
            })
        } 
        else {
            this.setState({
                image: ""
            })
        }
    }
      
    uploadHandler = () => { 
        console.log(this.state.image) 
    }

    render() {
        let submitstatus = this.state.authflag ? 'Profile Updated!' : '';
        return(
            <div>
                <br/>
                <div className="container">
                    <h3>Profile Image</h3>
                    <img src={this.state.image}/>
                    <br/>
                    <input type="file" onChange={this.fileChangedHandler} />
                    
                    <div style={{width: '30%'}} className="form-group">
                        <p>Name: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="name" placeholder="name" defaultValue={this.state.existingProfile[0].name}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Email: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="email" placeholder="email" defaultValue={this.state.existingProfile[0].email}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Phone number: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="phone" placeholder="phone" defaultValue={this.state.existingProfile[0].phone}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>About me: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="aboutme" placeholder="aboutme" defaultValue={this.state.existingProfile[0].aboutme}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>City: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="city" placeholder="city" defaultValue={this.state.existingProfile[0].city}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Country: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="country" placeholder="country" defaultValue={this.state.existingProfile[0].country}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>School: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="school" placeholder="school" defaultValue={this.state.existingProfile[0].school}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Company: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="company" placeholder="company" defaultValue={this.state.existingProfile[0].company}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Hometown: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="hometown" placeholder="hometown" defaultValue={this.state.existingProfile[0].hometown}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Language: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="language" placeholder="language" defaultValue={this.state.existingProfile[0].language}/>
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>Gender: </p>
                        <input  onChange = {this.onChangeInput} type="text" className="form-control" name="gender" placeholder="gender" defaultValue={this.state.existingProfile[0].gender}/>
                    </div>
                    <br/>
                    <div style={{width: '30%'}}>
                        <button onClick = {this.onSubmitProfile}  className="btn btn-success" type="submit">Update</button>
                        {submitstatus}
                    </div> 
                </div>
            </div>
        )
    }
}

export default UpdateProfile;