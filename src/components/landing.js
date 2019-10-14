import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../actions';
import Login from './login';
import { CheckClientLogin } from '../actions/api';
import { UserModel } from './functions';
import './register.css';
class Landing extends Component {
  componentDidMount() {
    if (!this.props.myusermodel) {

      this.checkclientlogin();

    }
  }
  async checkclientlogin() {
    let response = await CheckClientLogin();
    console.log(response)
    if (response.hasOwnProperty("clientid")) {
      let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
      this.props.reduxUser(myusermodel)
      if (response.hasOwnProperty("projects")) {
        this.props.reduxProjects(response.projects.project)
        if (response.projects.project.hasOwnProperty("length")) {
          let projectlength = response.projects.project.length;
          let activeprojectid = response.projects.project[projectlength - 1].projectid;
          this.props.reduxProjectID(activeprojectid);
        }

      }
      this.setState({ render: 'render' })

    }
  }
  showprofile(myusermodel) {

    let sex = "";
    if (myusermodel.gender === "male") {
      sex = "Mr. ";
    }
    else if (myusermodel.gender === "female") {
      sex = "Ms. ";
    }
    return (<div class="register-container">
    <div className="register-full profilelanding">{`${sex} ${myusermodel.firstname} ${myusermodel.lastname}`}</div>
    <div className="register-full profilelanding">{myusermodel.company}</div>
    <div className="register-full profilelanding">{`${myusermodel.address}`}</div>
    <div className="register-full profilelanding">{`${myusermodel.city} ${myusermodel.contactstate} ${myusermodel.zipcode}`}</div>
    <div className="register-full profilelanding"><a className="project-link" href={`mailTo:${myusermodel.email}`}>{myusermodel.email} </a></div>
    <div className="register-full profilelanding"><a className="project-link" href={`tel:+1 ${myusermodel.phone}`}>{myusermodel.phone} </a></div>
    </div>)
  }
  handleLanding() {

    if (!this.props.myusermodel) {
      return (<Login/>)

    }
    else if (!this.props.myusermodel.hasOwnProperty("clientid")) {
      return (<Login/>)

    }
    else {

      return (this.showprofile(this.props.myusermodel))
    }


  }

  render() {
    return (this.handleLanding())
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    activeprojectid: state.activeprojectid
  }
}
export default connect(mapStateToProps, actions)(Landing)
