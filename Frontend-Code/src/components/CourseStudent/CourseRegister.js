import React, { Component } from 'react'
import axios from 'axios';
import CourseRegisterItem from './CourseRegisterItem';

class CourseRegister extends Component {

  state = {
    fullcourselist: [
      {
        courseid: 1,
        coursename: 'cmpe123',
        coursedesc: 'description'
      },
      {
        courseid: 2,
        coursename: 'cmpe124',
        coursedesc: 'description2'
      }
    ],
    search: ''
  }

  componentDidMount() {
    axios.get('http://localhost:3001/getfullcourselist')
      .then((response => {
        console.log(response.data);
        this.setState({ fullcourselist: response.data });
      }))
  }

    onChangeInput = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    onSubmitSearch = (e) => {
      axios.get('http://localhost:3001/getcourselistfilter', {
            params: {
                search: this.state.search
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ fullcourselist: response.data });
            });
    }

    render() {
      return (
        <div>
            <h3>Course Register</h3>
            <div style={{width: '30%'}} className="form-group">
                <input  onChange = {this.onChangeInput} type="text" className="form-control" name="search" placeholder="search by id or name" />
                <button onClick = {this.onSubmitSearch}  className="btn btn-success" type="submit">Search</button>
            </div>
            <br/>
          {this.state.fullcourselist.map((c) => (
            <CourseRegisterItem key={c.courseid} courseRegisterItem={c} />
          ))}
        </div>
      )
    }
}

export default CourseRegister
