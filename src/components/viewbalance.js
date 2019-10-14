import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadprojectbalance, handleTokenProject } from '../actions/api';
import StripeCheckout from 'react-stripe-checkout';
import './viewinvoice.css';
import _ from 'lodash'

class ViewBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allmyprojects: [],
      projectid: "",
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
      totalamount: "",
      totalamountstring: "",

    }

  }

  componentDidMount() {
    this.loadmyprojectsbalance()
  }

  async loadmyprojectsbalance() {
    var clientid = this.props.match.params.clientid
    let allmyprojects = await loadprojectbalance(clientid);
    console.log(allmyprojects)
    this.setState({ allmyprojects });


  }

  async processStripe(token, projectid, amount) {
    let updatedproject = await handleTokenProject(token, projectid, amount);
    var updatedid = updatedproject.myproject.projectid;
    var totalamount = updatedproject.myproject.totalamount;
    var totalamountstring = updatedproject.myproject.totalamountstring;
    var allmyprojects = [];
    if (this.state.allmyprojects.myproject.length) {
      for (var i = 0; i < this.state.allmyprojects.myproject.length; i++) {

        if (this.state.allmyprojects.myproject[i].projectid === updatedid) {


          this.state.allmyprojects.myproject[i] = updatedproject.myproject;
          allmyprojects = this.state.allmyprojects;

          this.setState({ allmyprojects, totalamount, totalamountstring })

        }

      }

      //more than one invoice 
    }
    else {
      //one invoice 
      this.state.allmyprojects = updatedproject;
      allmyprojects = this.state.allmyprojects;
      this.setState({ allmyprojects, totalamount, totalamountstring })
    }
  }


  loadprojectlist() {

    var returned = false;
    return (_.map(this.state.allmyprojects.myproject, (myproject, i) => {

        if (i >= 0) {
          //array
          return (<option key={myproject.projectid} value={myproject.projectid}>Proj: {myproject.projectnumber} - {myproject.title} </option>)

        }
        else {
          //object

          myproject = this.state.allmyprojects.myproject
          if ((!returned)) {
            returned = true;
            return (<option key={myproject.projectid} value={myproject.projectid}> Project : {myproject.projectnumber} - {myproject.title} </option>)

          }


        } //end else


      }) //end map

    ) //end return
  } // end function

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

  getinvoicetablerows() {
    var myproject = "";
    var return_1 = false;
    var return_2 = false;

    return _.map(this.state.allmyprojects.myproject, (proj, i) => {

      if (i >= 0) {
        //there are mulitple invoices
        if (proj.projectid === this.state.projectid) {
          myproject = proj.myproject



          return _.map(proj.projectdetail, (projrow, i) => {

            if (i >= 0) {
              //there are multiple invoices and the invoice selected has multiple rows
              return (<tr key={i}> 
                   <td>{projrow.dateinv}</td>
                   <td>{projrow.description}</td>
                   <td>{projrow.hoursinv}</td>
                   <td>{projrow.rate}</td>
                   <td>{projrow.amount}</td>
                   </tr>)

            }
            else {
              //client has multiple invoices but this invoice only has one row
              projrow = proj.projectdetail;

              if (!return_2) {
                return_2 = true;
                return (<tr> 
                   <td>{projrow.dateinv}</td>
                   <td>{projrow.description}</td>
                   <td>{projrow.hoursinv}</td>
                   <td>{projrow.rate}</td>
                   <td>{projrow.amount}</td>
                   </tr>)

              }


            }


          }) // End of second map
        } // invoice match
      }
      else {
        //object there is only one invoice

        myproject = this.state.allmyprojects.myproject

        if (!return_1) {
          return_1 = true;

          return _.map(myproject.projectdetail, (projrow, i) => {

            if (i >= 0) {
              //array there is only one invoice but it has mulitple rows
              return (<tr key={i}> 
                   <td>{projrow.dateinv}</td>
                   <td>{projrow.description}</td>
                   <td>{projrow.hoursinv}</td>
                   <td>{projrow.rate}</td>
                   <td>{projrow.amount}</td>
                   </tr>)

            }
            else {
              //object there is only one invoice row and there is only one invoice for the client
              projrow = myproject.projectdetail;

              if (!return_2) {
                return_2 = true;
                return (<tr> 
                   <td>{projrow.dateinv}</td>
                   <td>{projrow.description}</td>
                   <td>{projrow.hoursinv}</td>
                   <td>{projrow.rate}</td>
                   <td>{projrow.amount}</td>
                   </tr>)

              }


            }


          }) // End of second map


        } //return_1 is false

      } // End of Else there is only one invoice

    }) // End of first map

  }

  getinvoicetable() {
    if (this.state.projectid > 0) {
      return (<table width="100%" border="0" cellPadding="2" id="invoicetbl">
      <tbody>
  <tr>
    <th width="63" height="25" scope="col"><u>Date </u></th>
    <th width="272" ><u>Item Description</u></th>
    <th width="64"><u>Quantity</u></th>
    <th width="52"><u>Rate/Unit</u></th>
    <th width="75"><u>Amount </u></th>
  </tr>
  {this.getinvoicetablerows()}
  <tr>
    <td height="2" colSpan="5"></td>
    </tr>

  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
    <th><u>TOTAL</u></th>
    <td colSpan="2" className="cell-center"><div id="total">{this.state.totalamountstring} </div></td>
    </tr>
      <tr>
    <td height="23" className="cell-right"></td>
    <td height="23" className="cell-right">Enter Dollar For Payment <i> format: (0.00) </i></td>
    <td height="23" colSpan="3" className="cell-right"><input type="text" name="amount" id="amount"  onChange={event => this.setState({[event.target.name]: event.target.value})}
     /></td>
  </tr>
  <tr>
    <td height="23" className="cell-right"></td>
    <td height="23" className="cell-right">&nbsp;</td>
    <th height="23" colSpan="3" className="cell-right">{this.stripeform(this.state.projectid,this.stripeamount())}</th>
  </tr>
  </tbody>
  </table>)
    }
    else {
      return (false)
    }

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

  findproject() {
    if (this.state.projectid > 0) {
      var return_3 = false;
      _.map(this.state.allmyprojects.myproject, (myproject, i) => {
        if (i >= 0) {

          if (this.state.projectid === myproject.projectid) {

            this.setState({
              firstnameengineer: myproject.firstnameengineer,
              lastnameengineer: myproject.lastnameengineer,
              company: myproject.company,
              engineeraddress: myproject.engineeraddress,
              engineercity: myproject.engineercity,
              engineerstate: myproject.engineerstate,
              engineerzipcode: myproject.engineerzipcode,
              projectnumber: myproject.projectnumber,
              projectstring: "Project Number: " + myproject.projectnumber,
              datereport: myproject.datereport,
              firstname: myproject.firstname,
              lastname: myproject.lastname,
              contactcompany: myproject.contactcompany,
              contactaddress: myproject.contactaddress,
              contactcity: myproject.contactcity,
              contactzipcode: myproject.contactzipcode,
              reporttitle: myproject.reporttitle,
              title: myproject.title,
              projectaddress: myproject.projectaddress,
              projectcity: myproject.projectcity,
              projectstate: myproject.projectstate,
              subject: "Subject:",
              totalamountstring: myproject.totalamountstring,
              totalamount: myproject.totalamount

            })



          }
          //array 
        }
        else {
          //object
          myproject = this.state.allmyprojects.myproject;
          if (!return_3) {
            return_3 = true;
            this.setState({
              firstnameengineer: myproject.firstnameengineer,
              lastnameengineer: myproject.lastnameengineer,
              company: myproject.company,
              engineeraddress: myproject.engineeraddress,
              engineercity: myproject.engineercity,
              engineerstate: myproject.engineerstate,
              engineerzipcode: myproject.engineerzipcode,
              projectnumber: myproject.projectnumber,
              projectstring: "Project Number: " + myproject.projectnumber,
              datereport: myproject.datereport,
              firstname: myproject.firstname,
              lastname: myproject.lastname,
              contactcompany: myproject.contactcompany,
              contactaddress: myproject.contactaddress,
              contactcity: myproject.contactcity,
              contactzipcode: myproject.contactzipcode,
              reporttitle: myproject.reporttitle,
              title: myproject.title,
              projectaddress: myproject.projectaddress,
              projectcity: myproject.projectcity,
              projectstate: myproject.projectstate,
              subject: "Subject:",
              totalamountstring: myproject.totalamountstring,
              totalamount: myproject.totalamount

            })


          }


        }

      })

    }
    else {
      this.clearproject();
    }

  }

  clearproject() {
    this.setState({
      projectid: "",
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
      totalstring: ""

    })
  }

  stripedescription(projectid, amount) {
    amount = Number(amount);
    amount = amount / 100
    amount = amount.toFixed(2);

    return "Payment ProjectID-" + projectid + " amount-$" + amount
  }

  stripeamount() {
    var totalamount = Number(this.state.amount);
    var stripeamount = totalamount * 100
    return stripeamount

  }
  stripeamountfield() {
    return (<input type="text" name="amount" id="amount" value={this.state.amount}
    onChange={event => this.setState({[event.target.name]: event.target.value}) }/>)
  }

  stripeform(projectid) {

    return (
      <StripeCheckout 
            name="EGeotechnical"
            description={this.stripedescription(projectid,this.stripeamount())}
            amount={this.stripeamount()}
            token={token => this.processStripe(token,projectid,this.stripeamount())}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            />
    )
  }

  render() {

    return (<table width="95%" border="0" cellPadding="2">
    <tbody>
  <tr>
    <th height="63" colSpan="4" scope="col"><div id="header">Select Project to View Balance </div></th>
  </tr>
    <tr>
    <th colSpan="4" scope="col">
    <select id="balanceprojectid" name="projectid"
    value={this.state.projectid}     
    onChange={event => this.setState({[event.target.name]: event.target.value}, () => {
    this.findproject();
    })
    }
    
    > <option value=""> Select a Project to View Balance </option> {this.loadprojectlist() }</select></th>
  </tr>
  <tr>
    <td height="23" colSpan="2" className="cell-vert-top"><div id="engineerblock">{this.nameblock(this.state.firstnameengineer,this.state.lastnameengineer,
    this.state.company,this.state.engineeraddress,this.state.engineercity,
    this.state.engineerstate, this.state.engineerzipcode)}  </div></td>
    <td colSpan="2" className="cell-right">&nbsp;</td>
  </tr>
  <tr>
    <td height="23" colSpan="2" className="cell-vert-top">&nbsp;</td>
    <td colSpan="2"><div id="projectstring"> {this.state.projectstring}</div></td>
  </tr>
  <tr>
    <td height="23" colSpan="2" className="cell-vert-top">&nbsp;</td>
    <td colSpan="2"><div id="datereport"> {this.datereport()} </div></td>
  </tr>
  <tr>
    <td height="23" colSpan="2" className="cell-vert-top"><div id="contactblock">{this.nameblock(this.state.firstname,this.state.lastname,this.state.contactcompany,
    this.state.contactaddress,this.state.contactcity,this.state.contactstate, this.state.contactzipcode)} </div>
    </td>
    <td colSpan="2"></td>
  </tr>
  <tr>
    <td height="23" colSpan="2" className="cell-vert-top"><div id="projectstring">{this.state.projectstring}</div> </td>
    <td width="9">&nbsp;</td>
    <td width="195"></td>
  </tr>
  <tr>
    <td colSpan="4">
    </td>
  </tr>
  <tr>
    <td colSpan="4">&nbsp;</td>
  </tr>
  <tr>
    <td width="73" height="74" className="cell-right cell-vert-top"><div className="subject" id="subject">{this.state.subject}</div></td>
    <td colSpan="3" className="cell-vert-top"><div className="projectblock" id="projectblock">{this.projectblock(this.state.reporttitle,this.state.title,this.state.projectaddress,this.state.projectcity,this.state.projectstate)} </div></td>
  </tr>
  <tr>
    <td colSpan="4">
    
    </td>
  </tr>
  <tr>
    <td height="39" colSpan="4"><div id="invoicetable"> {this.getinvoicetable()}</div></td>
  </tr>
  <tr>
    <td height="39" colSpan="4"><div id="copies"> &nbsp;</div></td>
  </tr>
  <tr>
    <td height="39" colSpan="4" className="cell-center"><div id="invoicefooter">&nbsp; </div></td>
  </tr>
  </tbody>
</table>);
  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ViewBalance);
