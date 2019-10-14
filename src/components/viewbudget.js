import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadmyclientsbudget, clientupdatebudget } from '../actions/api';
import "./viewbudget.css"
import _ from 'lodash';
class ViewBudget extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allmybudgets: [],
      projectid: '',
      message: ''
    }
    this.updateauthorization = this.updateauthorization.bind(this);
  }

  componentDidMount() {
    this.loadclientbudget()
  }

  async loadclientbudget() {
    var clientid = this.props.match.params.clientid
    let allmybudgets = await loadmyclientsbudget(clientid);
    console.log(allmybudgets)
    this.setState({ allmybudgets });

  }
  async updateauthorization() {
    var clientid = this.props.match.params.clientid;
    var projectid = this.state.projectid;
    let updatedbudget = await clientupdatebudget(clientid, projectid);

    if (this.state.allmybudgets.mybudget.length > 0) {

      for (var i = 0; i < this.state.allmybudgets.mybudget.length; i++) {

        if (this.state.allmybudgets.mybudget[i].projectid === updatedbudget.projectid) {
          this.state.allmybudgets.mybudget[i].authorized = "Project Last Authorized " + updatedbudget.authorized;
        }

      }
    }
    else {
      this.state.allmybudgets.mybudget.authorized = updatedbudget.authorized;
    }
    this.setState({ authorized: "Project Last Authorized " + updatedbudget.authorized, message: updatedbudget.message })
  }

  loadprojectids() {
    var myprojectbudget = {};
    var returned = false;
    return _.map(this.state.allmybudgets.mybudget, (mybudget, i) => {
      if (i >= 0) {

        myprojectbudget = mybudget;
        return (<option value={myprojectbudget.projectid}> {myprojectbudget.projectnumber} - {myprojectbudget.title} </option>)


      }
      else {
        myprojectbudget = this.state.allmybudgets.mybudget;

        if (!returned) {
          returned = true;

          return (<option value={myprojectbudget.projectid}> {myprojectbudget.projectnumber} - {myprojectbudget.title} </option>)


        }
      }

    })
  }

  findbudget() {
    var projectid = this.state.projectid;
    var myclientbudget = {};
    var returned = false;
    if (projectid > 0) {
      _.map(this.state.allmybudgets.mybudget, (mybudget, i) => {

        if (i >= 0) {
          //array
          myclientbudget = mybudget;
          if (myclientbudget.projectid === projectid) {

            this.setState({

              authorized: "Project Last Authorized " + myclientbudget.authorized,
              updated: "Project Last Updated " + myclientbudget.updated,
              sincerely: 'Sincerely Yours,',
              actualspent: myclientbudget.actual,
              totalamount: myclientbudget.totalamount,
              sow: myclientbudget.sow,
              dearcontact: "Dear " + myclientbudget.firstname + " " + myclientbudget.lastname + ":",
              firstnameengineer: myclientbudget.firstnameengineer,
              lastnameengineer: myclientbudget.lastnameengineer,
              company: myclientbudget.company,
              engineeraddress: myclientbudget.engineeraddress,
              engineercity: myclientbudget.engineercity,
              engineerstate: myclientbudget.engineerstate,
              engineerzipcode: myclientbudget.engineerzipcode,
              projectnumber: myclientbudget.projectnumber,
              projectstring: "Project Number: " + myclientbudget.projectnumber,
              datereport: myclientbudget.datereport,
              firstname: myclientbudget.firstname,
              lastname: myclientbudget.lastname,
              contactcompany: myclientbudget.contactcompany,
              contactaddress: myclientbudget.contactaddress,
              contactcity: myclientbudget.contactcity,
              contactzipcode: myclientbudget.contactzipcode,
              reporttitle: myclientbudget.reporttitle,
              title: myclientbudget.title,
              projectaddress: myclientbudget.projectaddress,
              projectcity: myclientbudget.projectcity,
              projectstate: myclientbudget.projectstate,
              subject: "Subject"

            })
          }


        }
        else {
          //object
          myclientbudget = this.state.allmybudgets.mybudget;
          if (!returned) {
            returned = true;
            this.setState({

              authorized: "Project Last Authorized " + myclientbudget.authorized,
              updated: "Project Last Updated " + myclientbudget.updated,
              sincerely: 'Sincerely Yours,',
              actualspent: myclientbudget.actual,
              totalamount: myclientbudget.totalamount,
              sow: myclientbudget.sow,
              dearcontact: "Dear " + myclientbudget.firstname + " " + myclientbudget.lastname + ":",
              firstnameengineer: myclientbudget.firstnameengineer,
              lastnameengineer: myclientbudget.lastnameengineer,
              company: myclientbudget.company,
              engineeraddress: myclientbudget.engineeraddress,
              engineercity: myclientbudget.engineercity,
              engineerstate: myclientbudget.engineerstate,
              engineerzipcode: myclientbudget.engineerzipcode,
              projectnumber: myclientbudget.projectnumber,
              projectstring: "Project Number: " + myclientbudget.projectnumber,
              datereport: myclientbudget.datereport,
              firstname: myclientbudget.firstname,
              lastname: myclientbudget.lastname,
              contactcompany: myclientbudget.contactcompany,
              contactaddress: myclientbudget.contactaddress,
              contactcity: myclientbudget.contactcity,
              contactzipcode: myclientbudget.contactzipcode,
              reporttitle: myclientbudget.reporttitle,
              title: myclientbudget.title,
              projectaddress: myclientbudget.projectaddress,
              projectcity: myclientbudget.projectcity,
              projectstate: myclientbudget.projectstate,
              subject: "Subject"

            })



          }


        }



      })

    }
    else {
      this.clearstate();
    }
  }
  clearstate() {
    this.setState({

      authorized: "",
      updated: "",
      sincerely: "",
      actualspent: "",
      totalamount: "",
      sow: "",
      dearcontact: "",
      firstnameengineer: "",
      lastnameengineer: "",
      company: "",
      engineeraddress: "",
      engineercity: "",
      engineerstate: "",
      engineerzipcode: "",
      projectnumber: "",
      projectstring: "",
      datereport: "",
      firstname: "",
      lastname: "",
      contactcompany: "",
      contactaddress: "",
      contactcity: "",
      contactzipcode: "",
      reporttitle: "",
      title: "",
      projectaddress: "",
      projectcity: "",
      projectstate: "",
      subject: "",

    })
  }
  nameblock(firstname, lastname, company, address, city, contactstate, zipcode) {
    var engineeringblock = [];
    var citystring = "";
    engineeringblock.push(<span>{firstname} {lastname} </span>)
    if (company) {
      engineeringblock.push(<span> <br/> { company.toUpperCase() } </span>)
    }
    if (address) {
      engineeringblock.push(<span> <br/> { address} </span>);
    }
    if (city) {
      citystring = city;
      if (contactstate) {
        citystring += ", " + contactstate
      }
      if (zipcode) {
        citystring += " " + zipcode;
      }
      engineeringblock.push(<span><br/> { citystring } </span>)


    }
    return (engineeringblock)
  }

  datereport() {
    return (<span>{this.state.datereport} </span>)
  }
  projectblock(reporttitle, title, projectaddress, projectcity, projectstate) {
    if (reporttitle) {
      reporttitle = reporttitle.toUpperCase();
    }
    var citystring = "";
    var projectblock = [];
    projectblock.push(<span><b>{reporttitle} </b> </span>);
    projectblock.push(<span><br/>{title}</span>)
    if (projectaddress) {
      projectblock.push(<span><br/>{projectaddress}</span>)
    }
    if (projectcity) {
      citystring = projectcity;
      if (projectstate) {
        citystring += ", " + projectstate
      }
      projectblock.push(<span><br/>{citystring}</span>)
    }

    return (projectblock);
  }

  getbudgetrows() {
    var myclientbudget = {};
    var myworkitems = {};
    var returned_2 = false;
    if (this.state.projectid > 0) {

      return _.map(this.state.allmybudgets.mybudget, (mybudget, i) => {

        if (i >= 0) {
          myclientbudget = mybudget;
          if (myclientbudget.projectid === this.state.projectid) {

            return _.map(myclientbudget.workitems, (workitem, i) => {

              if (i >= 0) {
                //array
                return (<tr>
              <td>{workitem.dateinv}</td>
              <td>{workitem.description}</td>
              <td>{workitem.hoursinv}</td>
              <td>{workitem.rate}</td>
              <td>{workitem.amount}</td>
              </tr>)

              }
              else {
                //object
                myworkitems = myclientbudget.workitems;
                if (!returned_2) {
                  returned_2 = true;
                  return (<tr>
              <td>{myworkitems.dateinv}</td>
              <td>{myworkitems.description}</td>
              <td>{myworkitems.hoursinv}</td>
              <td>{myworkitems.rate}</td>
              <td>{myworkitems.amount}</td>
              </tr>)
                }
              }

            })


          }
        }
        else {
          myclientbudget = this.state.allmybudgets.mybudget

          return _.map(myclientbudget.workitems, (workitem, i) => {

            if (i >= 0) {
              //array
              return (<tr>
              <td>{workitem.dateinv}</td>
              <td>{workitem.description}</td>
              <td>{workitem.hoursinv}</td>
              <td>{workitem.rate}</td>
              <td>{workitem.amount}</td>
              </tr>)

            }
            else {
              //object
              myworkitems = myclientbudget.workitems;
              if (!returned_2) {
                returned_2 = true;
                return (<tr>
              <td>{myworkitems.dateinv}</td>
              <td>{myworkitems.description}</td>
              <td>{myworkitems.hoursinv}</td>
              <td>{myworkitems.rate}</td>
              <td>{myworkitems.amount}</td>
              </tr>)
              }
            }

          })


        }

      })

    }
    else {
      return (<span> </span>)
    }
  }
  showauthorized() {
    if (this.state.projectid > 0) {

      return (<input type="button" value="Authorize" className="btnauthorize"  onClick={() => { if (window.confirm('Are you sure you wish to Authorize the Project?')) this.updateauthorization() } } />);
    }
    else {
      return (<div>&nbsp; </div>);
    }
  }

  showcosttable() {
    if (this.state.projectid > 0) {
      return (<table width="100%" id="planningtable" border="1" cellPadding="2">
    <tbody>
  <tr>
    <th height="25" colSpan="5" className="cell-no-border">Cost Proposal Breakdown</th>
    </tr>
  <tr>
    <th width="33" height="25"><u>Date</u></th>
    <th width="135"><u>Item Description </u></th>
    <th width="60"><u>Quantity</u> </th>
    <th width="65"><u>Rate/Unit</u></th>
    <th width="60"><u>Amount </u></th>
  </tr>
  {this.getbudgetrows()}
      <tr>
    <td colSpan="2" className="cell-no-border">&nbsp;</td>
    <th className="cell-no-border">Proposed</th>
    <td colSpan="2" className="budget-align-center"><b><u><div id="totalamount">{this.state.totalamount}</div>
	</u></b></td>
    </tr>
  <tr>
    <td colSpan="2" className="cell-no-border">&nbsp;</td>
    <th className="cell-no-border">Actual</th>
    <td colSpan="2"  className="budget-align-center"><div id="actualspent">{this.state.actualspent} </div></td>
  </tr>
  </tbody>
    </table>)
    }
    else {
      return (<span>&nbsp; </span>)
    }
  }
  showmessage() {
    if (this.state.message) {
      return (<span>{this.state.message} </span>)
    }
    else {
      return (<span> </span>)
    }
  }
  render() {


    return (<table width="95%" border="0" cellSpacing="0" cellPadding="5">
        <tbody>
  <tr>
    <th colSpan="4" scope="col"><div id="header"> &nbsp;</div></th>
  </tr>
    <tr>
    <th colSpan="4" scope="col"><div id="message"> {this.showmessage()}</div></th>
  </tr>
    <tr>
    <th colSpan="4" scope="col">
    <select id="budgetprojectid"
    value={this.state.projectid}     
    onChange={event => this.setState({projectid: event.target.value}, () => {
    this.findbudget();
    })
    }
    > <option value="">Select Project to View Budget </option>{this.loadprojectids()}</select></th>
  </tr>
  <tr>
    <td height="24" colSpan="2"><div id="engineerblock">{this.nameblock(this.state.firstnameengineer,this.state.lastnameengineer,
    this.state.company,this.state.engineeraddress,this.state.engineercity,
    this.state.engineerstate, this.state.engineerzipcode)} </div></td>
    <td width="44%" height="24" className="budget-vert-top">&nbsp;</td>
  </tr>
  <tr>
    <td height="24" colSpan="2" className="budget-vert-top">&nbsp;</td>
    <td className="budget-vert-top"><div id="projectstring">{this.state.projectstring}</div></td>
  </tr>
  <tr>
    <td height="24" colSpan="2" className="budget-vert-top"></td>
    <td className="budget-vert-top"><div id="datereport">{this.datereport()} </div></td>
  </tr>
  <tr>
    <td height="21" colSpan="2" className="budget-vert-top"><div id="contactblock">{this.nameblock(this.state.firstname,this.state.lastname,this.state.contactcompany,
    this.state.contactaddress,this.state.contactcity,this.state.contactstate, this.state.contactzipcode)} </div></td>
    <td height="21" colSpan="2" className="budget-vert-top">&nbsp;</td>
  </tr>
  <tr>
    <td width="15%" height="25" className="budget-vert-top budget-align-right"><u><div id="subject">{this.state.subject}</div></u></td>
    <td colSpan="3" className="budget-vert-top"><div id="projectblock"> {this.projectblock(this.state.reporttitle,this.state.title,this.state.projectaddress,this.state.projectcity,this.state.projectstate)}</div></td>
  </tr>
  <tr>
    <td height="37" colSpan="4"><div id="dearcontact">{this.state.dearcontact} </div></td>
  </tr>
  <tr>
    <td height="29" colSpan="4"><div id="sow">{this.state.sow}</div></td>
  </tr>
  <tr>
    <td colSpan="4">
    <div id="planningmenu">
   {this.showcosttable()}
    </div>
    </td>
  </tr>
  <tr>
    <td colSpan="2" rowSpan="2" className="budget-align-center"><div id="auth">&nbsp; </div></td>
    <td height="25" colSpan="2"><div id="yours"> {this.state.sincerely}</div></td>
  </tr>
  <tr>
    <td height="25" colSpan="2"><div id="company">{this.state.company}</div></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td width="35%">&nbsp;</td>
    <td height="42" colSpan="2">&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td width="35%">&nbsp;</td>
    <td height="25" colSpan="2"><div id="engineer">{this.state.firstnameengineer} {this.state.lastnameengineer} </div></td>
  </tr>
  <tr>
    <td height="25" colSpan="4"><div id="copies">&nbsp; </div></td>
  </tr>
    <tr> 
    <th height="25" colSpan="4">{this.showauthorized() }</th>
    </tr>
  <tr> 
    <td height="25" colSpan="2"><div id="authorized">{this.state.authorized}</div></td>
    <td height="25" colSpan="2"><div id="updated">{this.state.updated} </div></td>
  </tr>
  </tbody>
</table>)

  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ViewBudget);
