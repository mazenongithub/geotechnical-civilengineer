import React, { Component } from 'react';
import './servicerequest.css';
import { connect } from 'react-redux';
import { findmyservicerequest, insertmyservicerequest, deletemyservicerequest } from '../actions/api';
import _ from 'lodash';
import USstates from '../resources/statearray'

class ShowServiceRequest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allmyservicerequests: [],
      daterequest: "",
      projectcity: "",
      projectstate: "",
      projectcounty: "",
      projectapn: "",
      proposed: "",
      proposedproject: "",
      title: "",
      siteaccess: "",
      datesitevisit: "",
      timesitevisit: "",
      makefinal: "",
      message: "",
      servicerequest: ""
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteservicerequest = this.deleteservicerequest.bind(this);
  }
  componentDidMount() {
    this.loadservicerequest()
  }



  async loadservicerequest() {
    var servicerequest = this.props.match.params.servicerequest
    let getmyservicerequest = await findmyservicerequest(servicerequest);
    console.log(getmyservicerequest)
    var myservicerequests = getmyservicerequest.myservicerequest
    this.setState({
      myservicerequest: myservicerequests,
      servicerequest: myservicerequests.servicerequest,
      daterequest: myservicerequests.daterequest,
      projectaddress: myservicerequests.projectaddress,
      projectcity: myservicerequests.projectcity,
      projectstate: myservicerequests.projectstate,
      projectcounty: myservicerequests.projectcounty,
      projectapn: myservicerequests.projectapn,
      title: myservicerequests.title,
      proposedproject: myservicerequests.proposedproject,
      datesitevisit: myservicerequests.datesitevisit,
      timesitevisit: myservicerequests.timesitevisit,
      proposed: Number(myservicerequests.proposed),
      siteaccess: Number(myservicerequests.siteaccess)

    })


  }
  async deleteservicerequest() {
    var clientid = this.props.myusermodel.clientid;
    var servicerequest = this.state.servicerequest;
    var values = { clientid, servicerequest }
    let deletedservicerequest = await deletemyservicerequest(values);
    var myservicerequest = deletedservicerequest.myservicerequest;
    var message = deletedservicerequest.message;

    var daterequest = deletedservicerequest.myservicerequest.daterequest;
    var projectaddress = deletedservicerequest.myservicerequest.projectaddress;
    var projectcity = deletedservicerequest.myservicerequest.projectcity;
    var projectstate = deletedservicerequest.myservicerequest.projectstate;
    var projectcounty = deletedservicerequest.myservicerequest.projectcounty;
    var projectapn = deletedservicerequest.myservicerequest.projectapn;
    var title = deletedservicerequest.myservicerequest.title;
    var proposedproject = deletedservicerequest.myservicerequest.proposedproject;
    var datesitevisit = deletedservicerequest.myservicerequest.datesitevisit;
    var timesitevisit = deletedservicerequest.myservicerequest.timesitevisit;
    var proposed = Number(deletedservicerequest.myservicerequest.proposed);
    var siteaccess = Number(deletedservicerequest.myservicerequest.siteaccess);
    servicerequest = Number(deletedservicerequest.myservicerequest.servicerequest);
    this.setState({
      myservicerequest,
      message,
      daterequest,
      projectaddress,
      projectcity,
      projectstate,
      projectcounty,
      projectapn,
      title,
      proposedproject,
      datesitevisit,
      timesitevisit,
      proposed,
      siteaccess,
      servicerequest
    })



  }




  async insertservicerequest(values) {
    let updatedrequest = await insertmyservicerequest(values);
    if (updatedrequest.updaterequest) {
      var myservicerequest = updatedrequest.myservicerequest;
      var message = updatedrequest.message;
      var daterequest = updatedrequest.myservicerequest.daterequest;
      var projectaddress = updatedrequest.myservicerequest.projectaddress;
      var projectcity = updatedrequest.myservicerequest.projectcity;
      var projectstate = updatedrequest.myservicerequest.projectstate;
      var projectcounty = updatedrequest.myservicerequest.projectcounty;
      var projectapn = updatedrequest.myservicerequest.projectapn;
      var title = updatedrequest.myservicerequest.title;
      var proposedproject = updatedrequest.myservicerequest.proposedproject;
      var datesitevisit = updatedrequest.myservicerequest.datesitevisit;
      var timesitevisit = updatedrequest.myservicerequest.timesitevisit;
      var proposed = Number(updatedrequest.myservicerequest.proposed);
      var siteaccess = Number(updatedrequest.myservicerequest.siteaccess);
      var servicerequest = Number(updatedrequest.myservicerequest.servicerequest);
      this.setState({
        myservicerequest,
        message,
        daterequest,
        projectaddress,
        projectcity,
        projectstate,
        projectcounty,
        projectapn,
        title,
        proposedproject,
        datesitevisit,
        timesitevisit,
        proposed,
        siteaccess,
        servicerequest
      })
      //end edit
    }
    else if (updatedrequest.insertrequest) {

      myservicerequest = updatedrequest.myservicerequest;
      message = updatedrequest.message;
      daterequest = updatedrequest.myservicerequest.daterequest;
      projectaddress = updatedrequest.myservicerequest.projectaddress;
      projectcity = updatedrequest.myservicerequest.projectcity;
      projectstate = updatedrequest.myservicerequest.projectstate;
      projectcounty = updatedrequest.myservicerequest.projectcounty;
      projectapn = updatedrequest.myservicerequest.projectapn;
      title = updatedrequest.myservicerequest.title;
      proposedproject = updatedrequest.myservicerequest.proposedproject;
      datesitevisit = updatedrequest.myservicerequest.datesitevisit;
      timesitevisit = updatedrequest.myservicerequest.timesitevisit;
      proposed = Number(updatedrequest.myservicerequest.proposed);
      siteaccess = Number(updatedrequest.myservicerequest.siteaccess);
      servicerequest = Number(updatedrequest.myservicerequest.servicerequest);
      this.setState({
        myservicerequest,
        message,
        daterequest,
        projectaddress,
        projectcity,
        projectstate,
        projectcounty,
        projectapn,
        title,
        proposedproject,
        datesitevisit,
        timesitevisit,
        proposed,
        siteaccess,
        servicerequest
      })

    }

  }



  makefinal(event) {
    var makefinal = 0;
    if (event.target.checked) {
      makefinal = 1;
    }
    this.setState({ makefinal })
  }
  handleScope(event) {
    var proposed = event.currentTarget.value;
    proposed = Number(proposed)
    this.setState({ proposed });
  }
  siteAccess(event) {
    var siteaccess = event.currentTarget.value;
    siteaccess = Number(siteaccess)
    this.setState({ siteaccess });
  }

  handleSubmit(event) {
    event.preventDefault();
    var clientid = this.props.myusermodel.clientid;
    var servicerequest = this.state.servicerequest;
    var projectaddress = this.state.projectaddress;
    var projectcity = this.state.projectcity;
    var projectstate = this.state.projectstate;
    var projectcounty = this.state.projectcounty;
    var projectapn = this.state.projectapn;
    var proposed = this.state.proposed;
    var proposedproject = this.state.proposedproject;
    var title = this.state.title;
    var siteaccess = this.state.siteaccess;
    var datesitevisit = this.state.datesitevisit;
    var timesitevisit = this.state.timesitevisit;
    var makefinal = this.state.makefinal;

    var values = { clientid, servicerequest, projectaddress, projectcity, projectstate, projectcounty, projectapn, proposed, proposedproject, title, siteaccess, datesitevisit, timesitevisit, makefinal }

    if (makefinal === 1) {
      if (window.confirm('Are you sure you want to send the Service Request?')) {
        this.insertservicerequest(values);
      }
    }
    else {

      this.insertservicerequest(values);
    }

  }
  renderstates() {
    return _.map(USstates, (state) => {
      return (<option value={state.abbreviation}>{state.name} </option>)
    })
  }
  render() {
    return (<form method="post" onSubmit={this.handleSubmit}>
        <table width="100%" border="0" cellPadding="2">
  <tbody>
  <tr>
    <td height="26"><div id="requestdate">{this.state.daterequest} </div></td>
    <td height="26" colSpan="3"><div id="requestmessage">{this.state.message} </div></td>
  </tr>
  <tr>
    <td height="26"><u>Project Location </u></td>
    <td height="26" colSpan="3">&nbsp;</td>
  </tr>
  <tr>
    <td width="119">Project Address</td>
    <td colSpan="3"><input type="text" name="projectaddress" id="projectaddress" value={this.state.projectaddress}  onChange={event => this.setState({[event.target.name]: event.target.value})} className="fullWidth"/></td>
  </tr>
  <tr>
    <td>Project City</td>
    <td colSpan="3"><input type="text" name="projectcity" id="projectcity" className="fullWidth" value={this.state.projectcity}  onChange={event => this.setState({[event.target.name]: event.target.value})}/></td>
  </tr>
  <tr>
    <td>Project State</td>
    <td colSpan="3"><select name="projectstate" id="projectstate" value={this.state.projectstate}  onChange={event => this.setState({[event.target.name]: event.target.value})} className="partialWidth"><option value="">- Enter Your State -</option>
    {this.renderstates()}</select></td>
  </tr>
  <tr>
    <td height="31">Project County</td>
    <td colSpan="3"><input type="projectcounty" className="partialWidth" id="projectcounty"  value={this.state.projectcounty}  onChange={event => this.setState({[event.target.name]: event.target.value})} />  </td>  
  </tr>
  <tr>
    <td>Parcel APN #</td>
    <td colSpan="3"><input type="text" name="projectapn" id="projectapn" className="fullWidth" value={this.state.projectapn} onChange={event => this.setState({[event.target.name]: event.target.value})} /></td>
  </tr>
  <tr>
    <td height="23" colSpan="4"><u>Scope of Work </u></td>
  </tr>
  <tr>
    <td colSpan="4"> <input type="radio" name="scope" value="1" className="radiob" id="scopeone" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===1}/>Multi-family Residences
      <input type="radio" name="scope" value="2" className="radiob" id="scopetwo" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===2} />Commercial Buildings
      <input type="radio" name="scope" value="6" className="radiob" id="scopesix" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===6} />Outdoor Improvements <br/><br/>
      <input type="radio" name="scope" value="5" className="radiob" id="scopefive" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===5} />
      Addition to Existing Residence<input type="radio" name="scope" value="3" className="radiob" id="scopethree" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===3} />
      Multiple Lot Sub-Division <input type="radio" name="scope" value="4" className="radiob" id="scopefour" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===4} />
    Single Family Residence  </td>
  </tr>
  <tr>
    <td colSpan="4">Project Title: <input type="text" name="title" id="title" className="fullWidth" value={this.state.title} onChange={event => this.setState({[event.target.name]: event.target.value})} /></td>
  </tr>
  <tr>
    <td height="32" colSpan="4">Proposed Project Description</td>
  </tr>
  <tr>
    <td height="105" colSpan="4" className="serv-align-top"><textarea name="proposedproject" id="proposedproject" value={this.state.proposedproject} onChange={event => this.setState({[event.target.name]: event.target.value})} /> </td>
  </tr>
  <tr>
    <td>Initial Site  Access</td>
    <td colSpan="3"><input type="radio" name="access" id="truck" value="1" onChange={event=> {this.siteAccess(event)}} checked={this.state.siteaccess===1} />
      Open Access for Trucks 
        <input type="radio" name="access" id="portable" value="2"  onChange={event=> {this.siteAccess(event)}} checked={this.state.siteaccess===2} />
        No Access for Trucks</td>
  </tr>
  <tr>
    <td colSpan="4">&nbsp;</td>
  </tr>
  <tr>
    <td height="33" colSpan="4"><u> Schedule Onsite Geotechnical Investigation</u></td>
  </tr>
  <tr>
    <td colSpan="4">
    <div id="daterequest">
    Site Visit Date Date:
      <input type="date" name="datesitevisit" id="datesitevisit" className="smallWidth" value={this.state.datesitevisit} onChange={event => this.setState({[event.target.name]: event.target.value})} /> 
   Site Visit Time 
   <select name="timesitevisit" id="timesitevisit" className="smallWidth" value={this.state.timesitevisit} onChange={event => this.setState({[event.target.name]: event.target.value})}><option value="">Select Time </option><option value="8:00 am to 10:00 am">8:00 am to 10:00 am </option> <option value="10:00 am to 12:00 pm">10:00 am to 12:00 pm </option> <option value="12:00 pm to 2:00 pm">12:00 pm to 2:00 pm </option>
   <option value="2:00 pm to 4:00 pm">2:00 pm to 4:00 pm </option>   <option value="4:00 pm to 6:00 pm">4:00 pm to 6:00 pm </option>  </select></div></td>
  </tr>
  <tr>
    <td colSpan="4"></td>
  </tr>
  <tr>
    <td colSpan="4"></td>
  </tr>
  <tr>
    <td colSpan="4"><input type="checkbox" id="makefinal" name="makefinal" value={this.state.makefinal} onChange={event => this.makefinal(event)}  checked={this.state.makefinal === 1}   /> 
    Make Request Final (Sends Notification Email)</td>
  </tr>
  <tr>
    <th colSpan="2"><div id="removebutton_1"><input type="button" id="deleteservicerequest" value="Delete Request" className="halfWidth" onClick={this.deleteservicerequest}/> </div></th>
    <th width="276" colSpan="-1">&nbsp;</th>
    <td width="152" colSpan="-1"><div id="removebutton_2"> <input type="submit" value=" Insert/Update" id="btninsertrequest" /> </div></td>
  </tr>
  </tbody>
</table>
</form>)
  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ShowServiceRequest);
