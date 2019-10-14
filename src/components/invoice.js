import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClient, getProject, handleToken, getEngineer } from '../actions/api';
import StripeCheckout from 'react-stripe-checkout';
import { Link } from 'react-router-dom';
import "./viewbudget.css";
import * as actions from '../actions';

import {
  UserModel,
  formatTimefromDB,
  formatCurrency,
  formatTimeTest,
  calculateamount,
  sorttimes
}
from './functions';


class Invoice extends Component {
  constructor(props) {
    super(props);
    this.state = { amount: "initial", message: '' }

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



  async processStripe(token, invoiceid, projectid, amount, description) {
    let response = await handleToken(token, invoiceid, projectid, amount, description);
    console.log(response)
    if (response.hasOwnProperty("actualmaterials")) {
      if (this.props.projects) {
        if (this.props.projects.hasOwnProperty("length")) {
          // eslint-disable-next-line
          this.props.projects.map((myproject, i) => {
            if (myproject.projectid === projectid) {

              this.props.projects[i].actualmaterials = response.actualmaterials;
              let obj = this.props.projects;
              this.props.reduxProjects(obj);


            }
          })
        }
      }
    }
    if (response.hasOwnProperty("message")) {
      let message = response.message;
      this.setState({ message })
    }
  }

  stripedescription(invoiceid, amount) {
    amount = Number(amount);
    amount = amount / 100
    amount = amount.toFixed(2);

    return "Invoice ID: " + invoiceid + " for $" + amount
  }

  stripeamount(totalamount) {

    totalamount = Number(totalamount) * 100
    return totalamount;

  }
  getprojectfromid(projectid) {
    let project = {};
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            project = myproject;
          }
        })
      }
    }
    return project;
  }
  getstripeamount() {
    let stripeamount = 0;
    if (this.state.amount === "initial") {
      stripeamount = Math.round(Number(this.gettotalamount() * 100));
    }
    else {
      stripeamount = Math.round(Number(this.state.amount * 100))
    }
    return stripeamount;
  }

  showstripeCheckout() {
    let invoiceid = this.props.match.params.invoiceid;
    let project = this.getprojectfromid(this.props.match.params.projectid);
    let projectnumber = project.projectnumber;
    let projectid = project.projectid;
    let description = `Payment Made on Project Number ${projectnumber}`;
    let amount = this.getstripeamount();
    console.log(description)
    return (

      <StripeCheckout 
            name="EGeotechnical"
            description={description}
            amount={amount}
            token={token => this.processStripe(token,invoiceid,projectid,amount,description)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            />
    )
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
              actualtitle.push(<span>Invoice ID {this.props.match.params.invoiceid}</span>);

            }
          }
        })
      }
    }
    return actualtitle;
  }
  getactualitems() {

    let costitems = [];
    let actualitems = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        let invoiceid = this.props.match.params.invoiceid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {

            if (myproject.hasOwnProperty("actualitems")) {
              // eslint-disable-next-line
              myproject.actualitems.actualitem.map(item => {
                if (item.invoiceid === invoiceid) {
                  costitems.push(item)
                }
              })

              if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.actualmaterial.map(item => {
                  if (item.invoiceid === invoiceid) {
                    costitems.push(item);
                  }
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

        let invoiceid = this.props.match.params.invoiceid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {

            if (myproject.hasOwnProperty("actualitems")) {
              // eslint-disable-next-line
              myproject.actualitems.actualitem.map(item => {
                if (item.invoiceid === invoiceid) {
                  costitems.push(item)
                }
              })

              if (myproject.hasOwnProperty("actualmaterials")) {
                // eslint-disable-next-line
                myproject.actualmaterials.actualmaterial.map(item => {
                  if (item.invoiceid === invoiceid) {
                    costitems.push(item);
                  }
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

    return (`The Balance on this invoice is ${formatCurrency(totalamount)}`)

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
  updateamount(value) {
    this.setState({ amount: value })



  }
  getamountvalue() {
    let amount = 0;
    if (this.state.amount === "initial") {

      amount = Number(this.gettotalamount()).toFixed(2);
      amount = Number(amount);

    }
    else {
      amount = this.state.amount
    }
    return amount;
  }
  handleInvoice() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.hasOwnProperty("clientid")) {
        return (<div className="schedule-container"> 
     <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
    <div className="schedule-title-row"> {this.getactualtitle()}</div>
    {this.getactualitems()}
    <div className="schedule-title-row align-right">{this.handlegettotalamount()} </div>
    <div className="payment-container"> Please Enter the Payment Amount </div> 
    <div className="payment-container"><input type="text" className="project-field" value={this.getamountvalue()} onChange={event=>{this.updateamount(event.target.value)}} /> </div>
     <div className="schedule-title-row"> {this.state.message}</div>
    <div className="schedule-title-row"> {this.showstripeCheckout()}</div>
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

    return (this.handleInvoice())
  }

}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    engineers: state.engineers
  }
}

export default connect(mapStateToProps, actions)(Invoice);
