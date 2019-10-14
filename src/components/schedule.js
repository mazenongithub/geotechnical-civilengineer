import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import "./viewbudget.css"
import { Link } from 'react-router-dom';
import { getClient, ClientUpdateBudget, getProject, getEngineer } from '../actions/api';
import { authorizeBudget } from './svg';
import {
  UserModel,
  formatTimefromDB,
  formatCurrency,
  formatTimefromDBFull,
  formatTimeTest,
  calculateamount
}
from './functions';

class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };

  }

  componentDidMount() {

    let projectid = this.props.match.params.projectid;
    let clientid = this.props.match.params.clientid;

    this.props.reduxProjectID(projectid)
    if (!this.props.projects) {

      if (clientid !== "gus") {
        this.getclient(clientid)
      }
      else {
        this.getproject(clientid, projectid)
      }


    }
    else {
      this.setState({ render: 'render' })
    }
    if (!this.props.engineers) {
      this.getengineers();
    }
    else if (!this.props.engineers.engineer.hasOwnProperty("length")) {
      this.getengineers();
    }

  }
  async getengineers() {
    let response = await getEngineer();
    console.log(response);
    if (response.hasOwnProperty("engineers")) {
      this.props.reduxEngineers(response.engineers);

    }
  }
  async getclient(clientid) {
    let response = await getClient(clientid);
    console.log(response)
    let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
    this.props.reduxUser(myusermodel)


    if (response.hasOwnProperty("projects")) {

      this.props.reduxProjects(response.projects.project)
    }
  }
  async getproject(clientid, projectid) {
    let response = await getProject(clientid, projectid);
    console.log(response)
    let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
    this.props.reduxUser(myusermodel)

    if (response.hasOwnProperty("projects")) {
      this.props.reduxProjects(response.projects.project)
    }
  }
  getscheduletitle() {
    let scheduletitle = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {
              scheduletitle.push(<span>{`Project Number ${myproject.projectnumber} ${myproject.title}`} <br/></span>);
              scheduletitle.push(<span>{`${myproject.projectaddress} ${myproject.projectcity}`} <br/></span>);
              scheduletitle.push(<span>Project Schedule</span>);

            }
          }
        })
      }
    }
    return scheduletitle;
  }
  getscheduleitems() {
    let scheduleitems = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              myproject.scheduleitems.scheduleitem.map(item => {

                scheduleitems.push(this.showitem(item))
              })
            }
          }
        })
      }
    }
    return scheduleitems;
  }
  gettotalamount() {
    let totalamount = 0;
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              myproject.scheduleitems.scheduleitem.map(item => {
                totalamount += calculateamount(item.timein, item.timeout, item.rate);
              })

            }
          }
        })
      }
    }
    return `Total Proposed Budget ${formatCurrency(totalamount)}`
  }
  showitem(item) {
    let showitem = [];
    showitem.push(<div className="item-a"> {item.engineer}</div>)
    showitem.push(<div className="item-a"> {`${formatTimeTest(item.timein)} ${formatTimefromDB(item.timein)} to ${formatTimefromDB(item.timeout)}`}</div>)
    showitem.push(<div className="item-b">{item.description}</div>)
    showitem.push(<div className="item-b align-right"> <span className="span-amount">{formatCurrency(calculateamount(item.timein,item.timeout,item.rate))} </span></div>)
    return showitem;
  }
  getlinktoprojects() {
    let clientid = this.props.match.params.clientid;
    let projectid = this.props.match.params.projectid;
    return (`/${clientid}/projects/${projectid}`)
  }
  getlastauthorized() {
    let authorized = ""
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {

              if (myproject.scheduleitems.authorized !== "0000-00-00 00:00:00" && myproject.scheduleitems.authorized) {
                authorized = `Project Last Authorized ${formatTimefromDBFull(myproject.scheduleitems.authorized)}`
              }

            }
          }
        })
      }
    }
    if (authorized) {
      return (authorized)
    }
    else {
      return (<span>&nbsp; </span>)
    }
  }

  getlastupdated() {
    let updated = ""
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {

              if (myproject.scheduleitems.updated !== "0000-00-00 00:00:00" && myproject.scheduleitems.updated) {
                updated = `Project Last Updated ${formatTimefromDBFull(myproject.scheduleitems.updated )}`
              }

            }
          }
        })
      }
    }
    if (updated) {
      return (updated)
    }
    else {
      return (<span>&nbsp; </span>)
    }
  }
  async updateclientbudget() {
    let clientid = this.props.match.params.clientid;
    let projectid = this.props.match.params.projectid;;
    let response = await ClientUpdateBudget(clientid, projectid);
    console.log(response)
    if (response.hasOwnProperty("authorized")) {

      if (this.props.projects) {
        if (this.props.projects.hasOwnProperty("length")) {
          let projectid = this.props.match.params.projectid;
          // eslint-disable-next-line
          this.props.projects.map((myproject, i) => {
            if (myproject.projectid === projectid) {
              if (myproject.hasOwnProperty("scheduleitems")) {

                this.props.projects[i].scheduleitems.authorized = response.authorized;
                let obj = this.props.projects;
                this.props.reduxProjects(obj);
                this.setState({ message: response.message })
              }

            }
          })
        }
      }
    }

  }
  handleSchedule() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.clientid) {
        return (<div className="schedule-container"> 
     <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
    <div className="schedule-title-row"> {this.getscheduletitle()}</div>
    {this.getscheduleitems()}
    <div className="schedule-title-row align-right">{this.gettotalamount()} </div>
    <div className="schedule-title-row"> <button className="btnauthorizebudget" onClick={event=>{this.updateclientbudget()}}> {authorizeBudget()} </button></div>
    <div className="schedule-title-row"> {this.getlastauthorized()}</div>
    <div className="schedule-title-row"> {this.getlastupdated()}</div>
    <div className="schedule-title-row"> {this.state.message}</div>
    </div>)
      }
      else {
        return (<span>&nbsp; </span>)
      }
    }
    else {
      return (<span>&nbsp; </span>)
    }
  }
  render() {


    return (this.handleSchedule())

  }

}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    activeprojectid: state.activeprojectid
  }
}

export default connect(mapStateToProps, actions)(Schedule);
