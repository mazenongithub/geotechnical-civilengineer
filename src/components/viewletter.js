import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadmyletters } from '../actions/api'
import './viewletter.css'
import _ from 'lodash';
class ViewLetter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allmyletters: [],
      letterid: '',
      firstnameengineer: '',
      lastnameengineer: '',
      company: '',
      engineeraddress: '',
      engineercity: '',
      engineerstate: '',
      engineerzipcode: '',
      projectnumber: '',
      datereport: '',
      firstname: '',
      lastname: '',
      contactcompany: '',
      contactaddress: '',
      contactcity: '',
      contactzipcode: '',
      projectaddress: '',
      projectcity: '',
      projectstate: '',
      title: '',
      reporttitle: '',
      copies: '',
      sincerely: '',
      dearcontact: '',
      projectstring: ''



    }
    this.loadclientletters = this.loadclientletters.bind(this);
  }

  componentDidMount() {
    this.loadclientletters();
  }

  async loadclientletters() {
    var clientid = this.props.match.params.clientid
    let allmyletters = await loadmyletters(clientid);
    this.setState({ allmyletters });
    console.log(this.state.allmyletters)

  }

  clearletter() {

    this.setState({
      firstnameengineer: "",
      lastnameengineer: "",
      company: "",
      engineeraddress: "",
      engineercity: "",
      engineerstate: "",
      engineerzipcode: "",
      projectnumber: "",
      datereport: "",
      firstname: "",
      lastname: "",
      contactcompany: "",
      contactaddress: "",
      contactcity: "",
      contactzipcode: "",
      projectaddress: "",
      projectcity: "",
      projectstate: "",
      title: "",
      reporttitle: "",
      copies: "",
      sincerely: "",
      dearcontact: "",
      projectstring: ""

    })
  }
  findletter() {
    var currentletter = this.state.letterid;

    if (currentletter > 0) {
      if (this.state.allmyletters.letter.length) {
        for (var i = 0; i < this.state.allmyletters.letter.length; i++) {
          var myletter = this.state.allmyletters.letter[i];
          if (currentletter === myletter.letterid) {


            this.setState({
              firstnameengineer: myletter.firstnameengineer,
              lastnameengineer: myletter.lastnameengineer,
              company: myletter.company,
              engineeraddress: myletter.engineeraddress,
              engineercity: myletter.engineercity,
              engineerstate: myletter.engineerstate,
              engineerzipcode: myletter.engineerzipcode,
              projectnumber: myletter.projectnumber,
              datereport: myletter.datereport,
              firstname: myletter.firstname,
              lastname: myletter.lastname,
              contactcompany: myletter.contactcompany,
              contactaddress: myletter.contactaddress,
              contactcity: myletter.contactcity,
              contactzipcode: myletter.contactzip,
              projectaddress: myletter.projectaddress,
              projectcity: myletter.projectcity,
              projectstate: myletter.projectstate,
              title: myletter.title,
              reporttitle: myletter.reporttitle,
              copies: "Copies: " + myletter.copies,
              sincerely: "Sincerely Yours,",
              dearcontact: "Dear " + myletter.firstname + " " + myletter.lastname + ":",
              projectstring: "Project Number : " + myletter.projectnumber

            })

          }

        } //end for

      }
      else {
        myletter = this.state.allmyletters.letter;
        this.setState({
          firstnameengineer: myletter.firstnameengineer,
          lastnameengineer: myletter.lastnameengineer,
          company: myletter.company,
          engineeraddress: myletter.engineeraddress,
          engineercity: myletter.engineercity,
          engineerstate: myletter.engineerstate,
          engineerzipcode: myletter.engineerzipcode,
          projectnumber: myletter.projectnumber,
          datereport: myletter.datereport,
          firstname: myletter.firstname,
          lastname: myletter.lastname,
          contactcompany: myletter.contactcompany,
          contactaddress: myletter.contactaddress,
          contactcity: myletter.contactcity,
          contactzipcode: myletter.contactzip,
          projectaddress: myletter.projectaddress,
          projectcity: myletter.projectcity,
          projectstate: myletter.projectstate,
          title: myletter.title,
          reporttitle: myletter.reporttitle,
          copies: "Copies: " + myletter.copies,
          sincerely: "Sincerely Yours,",
          dearcontact: "Dear " + myletter.firstname + " " + myletter.lastname + ":",
          projectstring: "Project Number : " + myletter.projectnumber

        })

      }

    }
    else {
      this.clearletter();
    }
  }
  clientblock() {
    var clientblock = [];
    clientblock.push(<span>{this.state.firstname} {this.state.lastname} </span>)
    return (clientblock)
  }

  dearcontact() {
    var dearcontact = "Dear " + this.state.firstname + " " + this.state.lastname + ":";
    this.setState({ dearcontact })
    return (dearcontact)
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

  projectstring() {
    var projectstring = "Project Number: " + this.state.projectnumber
    this.setState({ projectstring })
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

  datereport() {
    return (<span>{this.state.datereport} </span>)
  }

  getcontent(letterid) {
    let contentJSX = [];
    if (letterid > 0) {



      _.map(this.state.allmyletters.letter, (myletter, i) => {

        if (i >= 0) {
          console.log(myletter.letterid + " === " + letterid)
          if (myletter.letterid === letterid) {

            var newcontent = myletter.lettersection.content.split(/\n/g)
            newcontent.forEach(content => {
              if (Number(content.addgroupheader) === -1) {
                contentJSX.push(<span> {content.group}<br/> </span>)
              }

              contentJSX.push(<p> {content} </p>)

            })


          }



        }
        else {


          if (i === "lettersection") {

            newcontent = myletter.content.split(/\n/g)
            newcontent.forEach(content => {
              if (content.addgroupheader === "-1") {
                contentJSX.push(<span> {content.group}<br/> </span>)
              }

              contentJSX.push(<p> {content} </p>)

            })



          }


        }



      })


    }
    return (contentJSX)
  }

  showletterids() {
    switch (this.state.allmyletters.letter) {
      case null:
        return <option> </option>
      case false:
        return <option> </option>
      default:
        var letterid = "";
        var reporttitle = "";
        var datereport = "";
        var idcheck = "";
        var datecheck = "";
        var reportcheck = "";
        var singlereporttitle = "";
        var returnedval = "no"

        return (_.map(this.state.allmyletters.letter, (myletter, i) => {
            reporttitle = myletter.reporttitle
            if (reporttitle) {
              reporttitle = reporttitle.toString();
            }
            if (i >= 0) {
              if (myletter.letterid) {
                return (<option value={myletter.letterid}> {myletter.datereport} - {reporttitle} </option>)
              }

            }
            else {


              if (i === "letterid") {
                letterid = myletter
                idcheck = "yes"
              }
              if (i === "datereport") {
                datereport = myletter;
                datecheck = "yes"
              }

              if (i === "reporttitle") {
                reportcheck = "yes"
                singlereporttitle = myletter
                console.log(singlereporttitle)
              }

              if (idcheck === "yes" && datecheck === "yes" && reportcheck === "yes" && returnedval === "no") {
                returnedval = "yes"
                return (<option value={letterid}> {datereport} - {singlereporttitle} </option>)

              }

            }

          }) //END OF MAP


        ) // END OF RETURN


    } // END OF SWITCH

  } // END OF FUNCTION



  render() {

    return (<table border="0" cellpadding="4" className="tblletterviewer">
        <tbody>
  <tr>
    <th height="63" colSpan="4"><div id="header"> </div></th>
  </tr>
  <tr>
    <th height="27" colSpan="4" className="letter-align-center">
    <select name="letterid" id="letterid" 
    value={this.state.letterid}     
    onChange={event => this.setState({letterid: event.target.value}, () => {
    this.findletter();
    })
    }> <option>- Select Letter to View -  </option> {this.showletterids()} </select></th>
  </tr>
  <tr>
    <td height="27" colSpan="3"><div id="engineerblock"> 
    {this.nameblock(this.state.firstnameengineer,this.state.lastnameengineer,
    this.state.company,this.state.engineeraddress,this.state.engineercity,
    this.state.engineerstate, this.state.engineerzipcode)}  </div></td>
    <th height="27" scope="col">&nbsp;</th>
  </tr>
  <tr>
    <td colSpan="3" rowSpan="3"></td>
    <td width="195"><div id="projectstring"> {this.state.projectstring}</div></td>
  </tr>
  <tr>
    <td><div id="datereport"> {this.datereport()} </div> </td> 
  </tr>
  <tr>
    <td></td>
  </tr>
  <tr>
    <td height="23" colSpan="4"><div id="clientblock">{this.nameblock(this.state.firstname,this.state.lastname,this.state.contactcompany,
    this.state.contactaddress,this.state.contactcity,this.state.contactstate, this.state.contactzipcode)} </div>	
	</td>
  </tr>
  <tr>
    <td width="49" height="23"  classname="letter-vertical-top"><div id="subject">&nbsp; </div></td>
    <td colspan="2" class="top"><div id="projectblock">{this.projectblock(this.state.reporttitle,this.state.title,this.state.projectaddress,this.state.projectcity,this.state.projectstate)} </div>
    </td>
    <td class="top">&nbsp;</td>
  </tr>
  <tr>
    <td height="27" classname="letter-vertical-top">
    
	<div id="reflabel"> &nbsp;</div> </td>	
	
    <td height="27" colSpan="4" classname="letter-vertical-top"><div id="ref"> </div></td>
    
  </tr>
  <tr>
    <td height="23" colSpan="4"><div id="dearcontact">{this.state.dearcontact} </div></td>
  </tr>
  <tr>
    <td height="28" colSpan="4">
  <div id="content">{this.getcontent(this.state.letterid)} </div>   
    </td>
  </tr>
  <tr>
    <td colSpan="4">&nbsp;</td>
  </tr>
  <tr>
    <td colSpan="2">&nbsp;</td>
    <td colSpan="2"><div id="yours"> {this.state.sincerely}</div></td>
  </tr>
  <tr>
    <td colSpan="2">&nbsp;</td>
    <td colSpan="2">&nbsp;</td>
  </tr>
  <tr>
    <td colSpan="2">&nbsp;</td>
    <td colSpan="2"><div id="engineer">{this.state.firstnameengineer} {this.state.lastnameengineer} </div></td>
  </tr>
    <tr>
    <td colSpan="2">&nbsp;</td>
    <td colSpan="2"><div id="company">{this.state.company.toUpperCase()} </div> </td>
  </tr>
  <tr>
    <td colspan="4"><div id="copies">{this.state.copies} </div></td>
  </tr>
  <tr>
    <td colspan="4" className="letter-align-center">
	<div id="gradingtables">&nbsp; </div>
    </td>
      </tr>
      </tbody>
</table>);
  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ViewLetter);
