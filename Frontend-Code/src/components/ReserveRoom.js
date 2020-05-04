//SJSU CMPE 226 Spring 2020 TEAM5
import React, {Component} from 'react';
import axios from 'axios';

class ReserveRoom extends Component {

    state = {
        addr: '',
        price: '',
        fromdate: '',
        todate: '',
        hostemail: '',
        cost: '',
        nights: '',
        amenitylist: []
    }

    componentDidMount() {
        console.log("test",this.props.match.params.id);
        axios.get('http://localhost:3001/getroominfo', {
            params: {
                roomid: this.props.match.params.id,
                hostemail: this.props.match.params.hostemail
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ addr: response.data[0].R_Addr });
                this.setState({ price: response.data[0].R_Price });
                this.setState({ hostemail: response.data[0].H_email_addr });
        });
        axios.get('http://localhost:3001/getroomamenities', {
            params: {
                roomid: this.props.match.params.id,
                hostemail: this.props.match.params.hostemail
            }
        })
            .then((response2) => {
                console.log(response2);
                this.setState({ amenitylist: response2.data });
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
            fromdate: this.state.fromdate,
            todate: this.state.todate,
            hostemail: this.state.hostemail,
            rid: this.props.match.params.id,
            cost: this.state.cost
        }
        //set the with credentials to true
        axios.defaults.withCredentials = true;
        //make a post request with the user data
        console.log(data);
        axios.post('http://localhost:3001/addreservation',data)
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
        let submitstatus = this.state.authflag ? 'Reservation Added!' : '';
        let showcost = '';
        let numnights = '';
        if (this.state.cost != '') {
            showcost = (<p> Total cost: ${this.state.cost} </p>);
            numnights= (<p> Number of Nights: {this.state.nights} </p>);
        }
        return(
            <div>
                <br/>
                <div className="container">
                    <h3>Reservation for: {this.state.addr}</h3>
                    <h3>Hosted by: {this.state.hostemail}</h3>
                    <h3>Price per night: ${this.state.price}</h3>
                    <div style={{width: '90%'}} className="form-group">
                        <h5>Amenities Offered:</h5>
                        {this.state.amenitylist.map((c) => (
                            <React.Fragment key={c.A_Name}>
                              {c.A_Name},
                            </React.Fragment>
                        ))}
                    </div>
                    <br/>
                    <div style={{width: '30%'}} className="form-group">
                        <p>From Date: </p>
                        <input  onChange = {this.onChangeInput} type="date" className="form-control" name="fromdate" />
                    </div>
                    <div style={{width: '30%'}} className="form-group">
                        <p>To Date: </p>
                        <input  onChange = {this.onChangeInput} type="date" className="form-control" name="todate" />
                    </div>
                    <br/>
                    {showcost}
                    {numnights}
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

export default ReserveRoom;