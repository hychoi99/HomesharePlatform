import React, { Component } from 'react';
import axios from 'axios';
import CreateLecture from './CourseLectureCreate';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';

class CourseLecture extends Component {

    state = {
        lecturelist: [{
            lectureid: '',
            title: '',
            file: '' //downloadable
        }]
    }

    componentDidMount() {
        axios.get('http://localhost:3001/getlecture', {
            params: {
                courseid: this.props.courseId
            }
        })
            .then((response) => {
                console.log(response);
                this.setState({ lecturelist: response.data });
            });
    }

    //
    onClickFileDownload = (e) => {
        
    }
    downloadFile = (blob, fileName) => {
        var file = new File([blob], "dek_iv.txt");
        var link = document.createElement("a");
        link.download =file.name;
        link.href = file;
        link.click();
      };

    render() {
        const fileReader = new FileReader();
        let formData = new FormData();

        return (
            <div>
                <React.Fragment>
                    <Link to={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courselecture/create`}>Create Lecture</Link>
                    <Route path={`/courselistfaculty/courseitemfaculty/${this.props.courseId}/courselecture/create`} render={ (props) => 
                        <CreateLecture {...props} courseId={this.props.courseId} />
                    }/>
                    <br/>
                </React.Fragment>
                {this.state.lecturelist.map((e) => (
                    <React.Fragment key={e.lectureid}>
                        <p>{e.title}</p>
                        <p>_______________</p>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

export default CourseLecture
