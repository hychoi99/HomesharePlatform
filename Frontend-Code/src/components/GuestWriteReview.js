import React, {Component} from 'react';
import axios from 'axios';

class GuestWriteReview extends Component {

    state = {
        addr: '',
        hostemail: '',
        reviewtext: '',
        hostemail: '',
    }

    componentDidMount() {
        console.log("test",this.props.match.params.id);
        axios.get('http://localhost:3001/getroominfo', {
            params: {
                roomid: this.props.match.params.id
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ addr: response.data[0].R_Addr });
                this.setState({ hostemail: response.data[0].H_email_addr });
        });
    }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
        this.onCalculatePrice(e);
    }

    onSubmitProfile = (e) => {
        e.preventDefault();
        //http call to updateprofile
        const data = {
            reviewtext: this.state.reviewtext,
            hostemail: this.state.hostemail
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log(data);
        axios.post('http://localhost:3001/addreview',data)
            .then(response => {
                console.log("Status Code : ",response.status);
                response.status === 200 ? this.setState({ authflag: true }) : this.setState({ authflag: false });
            });
    }

    onCalculatePrice = (e) => {
        if (e.target.name == "todate") {
            var Difference_In_Time = new Date(e.target.value).getTime() - new Date(this.state.fromdate).getTime(); 
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24) + 1; 
            this.setState({ nights: Difference_In_Days });
            this.setState({ cost: Difference_In_Days * this.state.price})
        }
    }
    

    render() {
        let submitstatus = this.state.authflag ? 'Review Added!' : '';

        return(
            <div>
                <br/>
                <div className="container">
                    <h3>Your Review for: {this.state.addr}</h3>
                    <h3>Hosted by: {this.state.hostemail}</h3>
                    <br/>
                    
                    <div style={{width: '30%'}} className="form-group">
                        <p>Review Text: </p>
                        ​<textarea onChange={this.onChangeInput} name="reviewtext" />
                    </div>
                    <br />
                    <div style={{width: '60%'}}>
                        <button onClick = {this.onSubmitProfile}  className="btn btn-success" type="submit">Submit</button>
                        {submitstatus}
                    </div> 
                </div>
            </div>
        )
    }
}

export default GuestWriteReview;