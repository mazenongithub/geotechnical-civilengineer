import React, { Component } from 'react';
import './signup.css';
import { connect } from 'react-redux';
import * as actions from '../actions';
import * as apiCalls from '../actions/api';
import * as userfunctions from '../resources/userfunctions';
import USstates from '../resources/statearray'
class UserForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: this.props.myusermodel.email,
      emailmsg: '',
      firstname: this.props.myusermodel.firstname,
      firstnamemsg: '',
      lastname: this.props.myusermodel.lastname,
      lastnamemsg: '',
      contactcompany: this.props.myusermodel.contactcompany,
      contactcompanymsg: '',
      contactaddress: this.props.myusermodel.contactaddress,
      contactaddressmsg: '',
      contactcity: this.props.myusermodel.contactcity,
      contactcitymsg: '',
      contactstate: this.props.myusermodel.contactstate,
      contactstatemsg: '',
      contactzipcode: this.props.myusermodel.contactzipcode,
      contactzipcodemsg: '',
      contactphonenumber: this.props.myusermodel.contactphonenumber,
      contactphonenumbermsg: '',
      gender: this.props.myusermodel.gender,
      gendermsg: '',
      passworderr: '',
      usermsg: ''

    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleupdatepassword = this.handleupdatepassword.bind(this);
  }

  ongenderChange(event) {
    var gender = Number(event.currentTarget.value)
    this.setState({ gender });
  }

  handleSubmit(event) {
    event.preventDefault();
    var err = 0;
    var errmsg = ""
    var firstname = this.state.firstname;
    if (!userfunctions.validatenamefield(firstname)) {
      err += 1;
      errmsg += " firstname invalid"
    }
    var lastname = this.state.lastname;
    if (!userfunctions.validatenamefield(lastname)) {
      err += 1;
      errmsg += " lastname invalid"
    }
    var contactcompany = this.state.contactcompany;
    if (!userfunctions.validatebasic(contactcompany)) {
      err += 1;
      errmsg += " company name invalid"
    }
    var contactaddress = this.state.contactaddress;
    if (!userfunctions.validatebasic(contactaddress)) {
      err += 1;
      errmsg += " address invalid"
    }
    var contactcity = this.state.contactcity;
    if (!userfunctions.validatebasic(contactcity)) {
      err += 1;
      errmsg += " city invalid"
    }
    var contactstate = this.state.contactstate;
    var contactzipcode = this.state.contactzipcode;
    if (!userfunctions.validatezipcode(contactzipcode)) {
      err += 1;
      errmsg += " zipcode invalid"
    }
    var contactphonenumber = this.state.contactphonenumber;
    if (!userfunctions.validatephonenumber(contactphonenumber)) {
      err += 1;
      errmsg += " phone number invalid"
    }
    var email = this.state.email;
    if (!userfunctions.validemailaddress(email)) {
      err += 1;
      errmsg += " email invalid"
    }
    var gender = this.state.gender;
    if (gender !== 1 && gender !== 2) {
      err += 1;
      errmsg += " gender missing"
      this.setState({ gendermsg: "Select gender" })
    }
    else {
      this.setState({ gendermsg: "" })
    }
    var clientid = this.props.myusermodel.clientid;
    if (clientid.length === 0) {
      err += 1;
      errmsg += " client id missing"
    }
    if (err === 0) {
      var values = { clientid, firstname, lastname, contactcompany, contactaddress, contactcity, contactstate, contactphonenumber, contactzipcode, email, gender }
      this.props.updateUser(values)
      this.setState({ 'usermsg': 'Submission Successful' });
    }
    else {
      this.setState({ 'usermsg': "Error in your submission:" + errmsg });
    }
  }

  handleupdatepassword() {
    var emailauth = document.getElementById("emailauth").value;
    var confirm = document.getElementById("confirm").value;
    if ((emailauth === confirm) && emailauth.length >= 6) {
      this.setState({ passworderr: '' })
      var values = { clientid: this.props.myusermodel.clientid, emailauth }
      this.updatepassword(values);
    }
    else if (emailauth.length < 6) {
      this.setState({ passworderr: 'Minimum length is 6' })
    }
    else {
      this.setState({ passworderr: ' Your passwords do not match' })
    }
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    this.validatefields(event.target.name, event.target.value)

  }
  validatefields(fieldname, fieldvalue) {
    switch (fieldname) {
      case "email":
        if (!userfunctions.validemailaddress(fieldvalue)) {
          this.setState({ emailmsg: 'Invalid email, try again' })
        }
        else {
          this.setState({ emailmsg: ' ' })
        }
        break;
      case "firstname":
        if (!userfunctions.validatenamefield(fieldvalue)) {
          this.setState({ firstnamemsg: " Required field 32 character limit" })
        }
        else {
          this.setState({ firstnamemsg: "" })
        }
        break;
      case "lastname":
        if (!userfunctions.validatenamefield(fieldvalue)) {
          this.setState({ lastnamemsg: " Required field 32 character limit " })
        }
        else {
          this.setState({ lastnamemsg: "" })
        }
        break;
      case "contactcompany":
        if (!userfunctions.validatebasic(fieldvalue)) {
          this.setState({ contactcompanymsg: " Character length exceeded" })
        }
        else {
          this.setState({ contactcompanymsg: '' })
        }
        break;
      case "contactaddress":
        if (!userfunctions.validatebasic(fieldvalue)) {
          this.setState({ contactaddressmsg: "Character length exceeded" })
        }
        else {
          this.setState({ contactaddressmsg: "" })
        }
        break;
      case "contactcity":
        if (!userfunctions.validatebasic(fieldvalue)) {
          this.setState({ contactcitymsg: 'Character length exceeded' })
        }
        else {
          this.setState({ contactcitymsg: '' })
        }
        break;
      case "contactzipcode":
        if (!userfunctions.validatezipcode(fieldvalue)) {
          this.setState({ contactzipcodemsg: 'Invalid Zipode, try again' })
        }
        else {
          this.setState({ contactzipcodemsg: '' })
        }
        break;
      case "contactphonenumber":
        if (!userfunctions.validatephonenumber(fieldvalue)) {
          this.setState(({ contactphonenumbermsg: "Invalid number, try again" }))
        }
        else {
          this.setState(({ contactphonenumbermsg: "" }))
        }
        break;
      default:
        break;
    }
  }

  validatefield(fieldname, fieldvalue, errmsg, label) {
    return (

      <div className="grid-container-1">
          <div className="grid-element-1">
          {label}
          </div>
          <div className="grid-element-1">
          <input type="text" name={fieldname} id={fieldname}  className="signuptext" value={fieldvalue} onChange={event => this.handleInputChange(event)}/>
          </div>
          <div className="grid-element-1">
          {errmsg} &nbsp;
          </div>
          </div>

    )
  }

  async updatepassword(val) {
    let newUser = await apiCalls.updateUserpassword(val);
    console.log(newUser);
  }

  render() {
    var renderstates = USstates.map(state => {

      return (<option value={state.abbreviation}>{state.name} </option>)
    })

    var formpostURL = process.env.REACT_APP_SERVER_API + "/api/current_user/update";
    return (<form action={formpostURL} method="post" onSubmit={this.handleSubmit}>
 <div className="signupform">{this.state.usermsg} </div>
   {this.validatefield("email",this.state.email, this.state.emailmsg, "Email/Login" ) }
   {userfunctions.passwordfield("emailauth", this.state.passworderr, 'Password') }
   {userfunctions.passwordfield("confirm", this.state.passworderr, 'Confirm Password') } 
   <div className="center"><input type="button" value="  Update Password " className="submit-button" onClick={this.handleupdatepassword} /> </div>
    <div className="signupform">
      <label>
       <input type="radio" name="gender" value="1" onChange={event => this.ongenderChange(event)} checked={this.state.gender === 1}   />
        Male</label>
        <label>  <input type="radio" name="gender" value="2" onChange={event => this.ongenderChange(event)} checked={this.state.gender === 2} />
            Female</label> {this.state.gendermsg}
    </div>
          
         {this.validatefield("firstname",this.state.firstname, this.state.firstnamemsg, "First Name" ) }
         {this.validatefield("lastname",this.state.lastname, this.state.lastnamemsg, "Last Name" ) }
         {this.validatefield("contactcompany",this.state.contactcompany, this.state.contactcompanymsg, "Company" ) }
         {this.validatefield("contactaddress",this.state.contactaddress, this.state.contactaddressmsg, "Address" ) }
         {this.validatefield("contactcity",this.state.contactcity, this.state.contactcitymsg, "City" ) }
          <div className="grid-container-1">
          <div className="grid-element-1">State
          </div>
          <div className="grid-element-1">
          <select name="contactstate" className="signuptext" value={this.state.contactstate} onChange={event => this.setState({[event.target.name]: event.target.value})}>
          <option value="">- Enter Your State -</option>
          {renderstates}
          </select>
          </div></div>
          {this.validatefield("contactzipcode",this.state.contactzipcode, this.state.contactzipcodemsg, "Zipcode" ) }
          {this.validatefield("contactphonenumber",this.state.contactphonenumber, this.state.contactphonenumbermsg, "Phone Number:" ) }
          <div className="center"><input type="submit" value="  Update User  " className="submit-button" /> </div>
         
</form>);

  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel }
}
export default connect(mapStateToProps, actions)(UserForm)
