import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import "./viewbudget.css"
import { Link } from 'react-router-dom';
import { getClient, getProject, getEngineer } from '../actions/api';

import {
  UserModel,
  formatTimefromDB,
  formatCurrency,
  formatTimeTest,
  calculateamount,
  sorttimes
}
from './functions';

class Actual extends Component {
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
      console.log(response.projects.project)
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
  getactualtitle() {
    let actualtitle = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("actualitems")) {
              actualtitle.push(<span>{`Project Number ${myproject.projectnumber} ${myproject.title}`} <br/></span>);
              actualtitle.push(<span>{`${myproject.projectaddress} ${myproject.projectcity}`} <br/></span>);
              actualtitle.push(<span>Project Cost</span>);

            }
          }
        })
      }
    }
    return actualtitle;
  }
  getactualitems() {
    let actualitems = [];
    let costitems = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("actualitems")) {
              // eslint-disable-next-line
              myproject.actualitems.actualitem.map(item => {

                costitems.push(item)
              })

            }
            if (myproject.hasOwnProperty("actualmaterials")) {
              // eslint-disable-next-line
              myproject.actualmaterials.actualmaterial.map(item => {
                costitems.push(item);
              })
            }
          }
        })
      }
    }
    costitems = costitems.sort((a, b) => {
      return sorttimes(a.timein, b.timein)
    })

    // eslint-disable-next-line
    costitems.map(item => {
      if (item.hasOwnProperty("timeout")) {
        actualitems.push(this.showitem(item))
      }
      else {
        actualitems.push(this.showmaterial(item))
      }
    })
    return actualitems;
  }
  gettotalamount() {
    let totalamount = 0;
    let costitems = [];

    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {

            if (myproject.hasOwnProperty("actualitems")) {
              // eslint-disable-next-line
              myproject.actualitems.actualitem.map(item => {

                costitems.push(item)

              })

              if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.actualmaterial.map(item => {

                  costitems.push(item);

                })
              }
            }
          }
        })
      }
    }

    costitems = costitems.sort((a, b) => {
      return sorttimes(a.timein, b.timein)
    })


    if (costitems.hasOwnProperty("length")) {
      // eslint-disable-next-line
      costitems.map(item => {
        if (item.hasOwnProperty("timeout")) {
          totalamount += Number(calculateamount(item.timein, item.timeout, Number(item.rate)))

        }
        else {
          console.log(Number(item.quantity) * Number(item.unitcost))
          totalamount += Number(item.quantity) * Number(item.unitcost)


        }

      })

    }
    return totalamount;
  }
  handlegettotalamount() {
    let totalamount = Number(this.gettotalamount()).toFixed(2);
    totalamount = Number(totalamount);

    return (`The Balance on this Project is ${formatCurrency(totalamount)}`)

  }
  getengineerfromid(engineerid) {

    let myengineer = "";
    if (this.props.engineers) {
      if (this.props.engineers.engineer) {
        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {

          if (engineer.engineerid === engineerid) {

            myengineer = `${engineer.firstname} ${engineer.lastname}`
          }
        })

      }
    }
    return myengineer;
  }
  showmaterial(item) {
    let showmaterial = [];
    showmaterial.push(<div className="item-a"> {this.getengineerfromid(item.engineerid)}</div>)
    showmaterial.push(<div className="item-a"> {`${formatTimeTest(item.timein)} ${formatTimefromDB(item.timein)}`}</div>)
    showmaterial.push(<div className="item-a">{item.description}</div>)
    showmaterial.push(<div className="item-a align-right"> <span className="span-amount">{Number(item.quantity).toString()}  {item.unit.toString()} {formatCurrency(Number(item.unitcost))}/{item.unit}  = {formatCurrency(Number(item.unitcost) * Number(item.quantity))}</span></div>)


    return showmaterial;
  }
  showitem(item) {
    let showitem = [];
    showitem.push(<div className="item-a"> {this.getengineerfromid(item.engineerid)}</div>)
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

  handleActual() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.clientid) {
        return (<div className="schedule-container"> 
     <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
    <div className="schedule-title-row"> {this.getactualtitle()}</div>
    {this.getactualitems()}
    <div className="schedule-title-row align-right">{this.handlegettotalamount()} </div>
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


    return (this.handleActual())

  }

}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    activeprojectid: state.activeprojectid,
    engineers: state.engineers
  }
}

export default connect(mapStateToProps, actions)(Actual);
