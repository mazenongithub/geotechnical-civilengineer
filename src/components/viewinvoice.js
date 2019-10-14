import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadmyinvoices, handleToken } from '../actions/api';
import StripeCheckout from 'react-stripe-checkout';
import './viewinvoice.css';
import _ from 'lodash'

class ViewInvoice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allmyinvoices: [],
      invoiceid: "",
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
      invoice: "",
      invoicestring: "",
      reporttitle: "",
      title: "",
      projectaddress: "",
      projectcity: "",
      projectstate: "",
      subject: "",
      totalamountstring: "",
      totalamount: ""

    }

  }

  componentDidMount() {
    this.loadclientinvoices()
  }

  async loadclientinvoices() {
    var clientid = this.props.match.params.clientid
    let allmyinvoices = await loadmyinvoices(clientid);
    console.log(allmyinvoices)
    this.setState({ allmyinvoices });


  }

  async processStripe(token, invoiceid, amount) {
    let updatedinvoice = await handleToken(token, invoiceid, amount);
    var updatedid = updatedinvoice.myinvoice.invoiceid;
    var totalamount = updatedinvoice.myinvoice.totalamount;
    var totalamountstring = updatedinvoice.myinvoice.totalamountstring;
    var allmyinvoices = [];
    if (this.state.allmyinvoices.myinvoice.length) {
      for (var i = 0; i < this.state.allmyinvoices.myinvoice.length; i++) {

        if (this.state.allmyinvoices.myinvoice[i].invoiceid === updatedid) {


          this.state.allmyinvoices.myinvoice[i] = updatedinvoice.myinvoice;
          allmyinvoices = this.state.allmyinvoices;



        }

      }

      //more than one invoice 
    }
    else {
      this.state.allmyinvoices = updatedinvoice;
      allmyinvoices = this.state.allmyinvoices;
      this.setState({ allmyinvoices, totalamount, totalamountstring })
    }
  }


  loadinvoicelist() {

    var returned = false;
    return (_.map(this.state.allmyinvoices.myinvoice, (myinvoice, i) => {

        if (i >= 0) {
          //array
          return (<option key={myinvoice.invoiceid} value={myinvoice.invoiceid}>Invoice: {myinvoice.invoice} - Proj: {myinvoice.projectnumber} - {myinvoice.title} </option>)

        }
        else {
          //object

          myinvoice = this.state.allmyinvoices.myinvoice
          if ((!returned)) {
            returned = true;
            return (<option key={myinvoice.invoiceid} value={myinvoice.invoiceid}>Invoice: {myinvoice.invoice} Project : {myinvoice.projectnumber} </option>)

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
    var myinvoice = "";
    var return_1 = false;
    var return_2 = false;

    return _.map(this.state.allmyinvoices.myinvoice, (inv, i) => {

      if (i >= 0) {
        //there are mulitple invoices
        if (inv.invoiceid === this.state.invoiceid) {
          myinvoice = inv.myinvoice



          return _.map(inv.invoicedetail, (invrow, i) => {

            if (i >= 0) {
              //there are multiple invoices and the invoice selected has multiple rows
              return (<tr key={i}> 
                   <td>{invrow.dateinv}</td>
                   <td>{invrow.description}</td>
                   <td>{invrow.hoursinv}</td>
                   <td>{invrow.rate}</td>
                   <td>{invrow.amount}</td>
                   </tr>)

            }
            else {
              //client has multiple invoices but this invoice only has one row
              invrow = inv.invoicedetail;

              if (!return_2) {
                return_2 = true;
                return (<tr> 
                   <td>{invrow.dateinv}</td>
                   <td>{invrow.description}</td>
                   <td>{invrow.hoursinv}</td>
                   <td>{invrow.rate}</td>
                   <td>{invrow.amount}</td>
                   </tr>)

              }


            }


          }) // End of second map
        } // invoice match
      }
      else {
        //object there is only one invoice

        myinvoice = this.state.allmyinvoices.myinvoice

        if (!return_1) {
          return_1 = true;

          return _.map(myinvoice.invoicedetail, (invrow, i) => {

            if (i >= 0) {
              //array there is only one invoice but it has mulitple rows
              return (<tr key={i}> 
                   <td>{invrow.dateinv}</td>
                   <td>{invrow.description}</td>
                   <td>{invrow.hoursinv}</td>
                   <td>{invrow.rate}</td>
                   <td>{invrow.amount}</td>
                   </tr>)

            }
            else {
              //object there is only one invoice row and there is only one invoice for the client
              invrow = myinvoice.invoicedetail;

              if (!return_2) {
                return_2 = true;
                return (<tr> 
                   <td>{invrow.dateinv}</td>
                   <td>{invrow.description}</td>
                   <td>{invrow.hoursinv}</td>
                   <td>{invrow.rate}</td>
                   <td>{invrow.amount}</td>
                   </tr>)

              }


            }


          }) // End of second map


        } //return_1 is false

      } // End of Else there is only one invoice

    }) // End of first map

  }

  getinvoicetable() {
    if (this.state.invoiceid > 0) {
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
    <td height="23" className="cell-right">&nbsp;</td>
    <th height="23" colSpan="3" className="cell-right">{this.stripeform(this.state.invoiceid,this.stripeamount())}</th>
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

  findinvoice() {
    if (this.state.invoiceid > 0) {
      var return_3 = false;
      _.map(this.state.allmyinvoices.myinvoice, (myinvoice, i) => {
        if (i >= 0) {

          if (this.state.invoiceid === myinvoice.invoiceid) {

            this.setState({
              firstnameengineer: myinvoice.firstnameengineer,
              lastnameengineer: myinvoice.lastnameengineer,
              company: myinvoice.company,
              engineeraddress: myinvoice.engineeraddress,
              engineercity: myinvoice.engineercity,
              engineerstate: myinvoice.engineerstate,
              engineerzipcode: myinvoice.engineerzipcode,
              projectnumber: myinvoice.projectnumber,
              projectstring: "Project Number: " + myinvoice.projectnumber,
              datereport: myinvoice.datereport,
              firstname: myinvoice.firstname,
              lastname: myinvoice.lastname,
              contactcompany: myinvoice.contactcompany,
              contactaddress: myinvoice.contactaddress,
              contactcity: myinvoice.contactcity,
              contactzipcode: myinvoice.contactzipcode,
              invoice: myinvoice.invoice,
              invoicestring: "Invoice: " + myinvoice.invoice,
              reporttitle: myinvoice.reporttitle,
              title: myinvoice.title,
              projectaddress: myinvoice.projectaddress,
              projectcity: myinvoice.projectcity,
              projectstate: myinvoice.projectstate,
              subject: "Subject:",
              totalamountstring: myinvoice.totalamountstring,
              totalamount: myinvoice.totalamount

            })



          }
          //array 
        }
        else {
          //object
          myinvoice = this.state.allmyinvoices.myinvoice;
          if (!return_3) {
            return_3 = true;
            this.setState({
              firstnameengineer: myinvoice.firstnameengineer,
              lastnameengineer: myinvoice.lastnameengineer,
              company: myinvoice.company,
              engineeraddress: myinvoice.engineeraddress,
              engineercity: myinvoice.engineercity,
              engineerstate: myinvoice.engineerstate,
              engineerzipcode: myinvoice.engineerzipcode,
              projectnumber: myinvoice.projectnumber,
              projectstring: "Project Number: " + myinvoice.projectnumber,
              datereport: myinvoice.datereport,
              firstname: myinvoice.firstname,
              lastname: myinvoice.lastname,
              contactcompany: myinvoice.contactcompany,
              contactaddress: myinvoice.contactaddress,
              contactcity: myinvoice.contactcity,
              contactzipcode: myinvoice.contactzipcode,
              invoice: myinvoice.invoice,
              invoicestring: "Invoice: " + myinvoice.invoice,
              reporttitle: myinvoice.reporttitle,
              title: myinvoice.title,
              projectaddress: myinvoice.projectaddress,
              projectcity: myinvoice.projectcity,
              projectstate: myinvoice.projectstate,
              subject: "Subject",
              totalamountstring: myinvoice.totalamountstring,
              totalamount: myinvoice.totalamount

            })

          }


        }

      })

    }
    else {
      this.clearinvoice();
    }

  }

  clearinvoice() {
    this.setState({
      invoiceid: "",
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
      invoice: "",
      invoicestring: "",
      reporttitle: "",
      title: "",
      projectaddress: "",
      projectcity: "",
      projectstate: "",
      subject: "",
      totalstring: ""

    })
  }

  stripedescription(invoiceid, amount) {
    amount = Number(amount);
    amount = amount / 100
    amount = amount.toFixed(2);

    return "Invoice ID: " + invoiceid + " for $" + amount
  }

  stripeamount() {
    var totalamount = Number(this.state.totalamount);
    var stripeamount = totalamount * 100
    return stripeamount

  }

  stripeform(invoiceid, amount) {

    return (
      <StripeCheckout 
            name="EGeotechnical"
            description={this.stripedescription(invoiceid,amount)}
            amount={amount}
            token={token => this.processStripe(token,invoiceid,amount)}
            stripeKey={process.env.REACT_APP_STRIPE_PUBLIC}
            />
    )
  }

  render() {

    return (<table width="95%" border="0" cellPadding="2">
    <tbody>
  <tr>
    <th height="63" colSpan="4" scope="col"><div id="header">View Invoice </div></th>
  </tr>
    <tr>
    <th colSpan="4" scope="col">
    <select id="invoiceid" name="invoiceid"
    value={this.state.invoiceid}     
    onChange={event => this.setState({[event.target.name]: event.target.value}, () => {
    this.findinvoice();
    })
    }
    
    > <option value=""> Select Invoice to View  </option> {this.loadinvoicelist() }</select></th>
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
    <td height="23" colSpan="2" className="cell-vert-top"><div id="invoice">{this.state.invoicestring}</div> </td>
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

export default connect(mapStateToProps)(ViewInvoice);
