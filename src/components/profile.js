import React, { Component } from 'react';
import * as actions from '../actions';
import { getClient, UpdateUserProfile } from '../actions/api';
import { UserModel } from './functions';
import { connect } from 'react-redux';
import './register.css';
import { radioOpen, radioClosed, saveProfile } from './svg';
class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = { gender: "", render: "", message: "" }
    }
    componentDidMount() {
        let clientid = this.props.match.params.clientid;
        if (!this.props.projects) {
            this.getclient(clientid)
        }
        else if (!this.props.projects.hasOwnProperty("length")) {
            this.getclient(clientid)
        }

    }
    async getclient(clientid) {
        let response = await getClient(clientid);
        console.log(response)
        let myusermodel = {
            clientid: response.clientid,
            firstname: response.firstname,
            lastname: response.lastname,
            company: response.contactcompany,
            address: response.contactaddress,
            city: response.contactcity,
            contactstate: response.contactstate,
            zipcode: response.contactzipcode,
            email: response.contactemail,
            gender: response.gender,
            phone: response.contactphonenumber
        }
        this.props.reduxUser(myusermodel)


        if (response.hasOwnProperty("projects")) {
            this.props.reduxProjects(response.projects.project)
        }
    }
    handlemale(event) {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("gender")) {

                let myusermodel = this.props.myusermodel;
                myusermodel.gender = "male";
                this.props.reduxUser(myusermodel);
                this.setState({ render: 'render' })

            }
        }
    }
    returnmale() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("gender")) {
                if (this.props.myusermodel.gender === "male") {

                    return (radioClosed())
                }
                else {

                    return (radioOpen())
                }
            }
        }
    }
    handlefemale(event) {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("gender")) {
                let myusermodel = this.props.myusermodel
                myusermodel.gender = "female"
                this.props.reduxUser(myusermodel)
                this.setState({ render: 'render' })

            }
        }

    }
    returnfemale() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("gender")) {
                if (this.props.myusermodel.gender === "female") {
                    return (radioClosed())
                }
                else {
                    return (radioOpen())
                }
            }
        }
    }

    getFirstName() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("firstname")) {
                return this.props.myusermodel.firstname;
            }
        }
    }
    handleFirstName(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.firstname = value;
        this.props.reduxUser(myusermodel)

        this.setState({ render: 'render' });
    }

    getLastName() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("lastname")) {
                return this.props.myusermodel.lastname;
            }
        }
    }
    handleLastName(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.lastname = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }

    handleCompany(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.company = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    getCompany() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("company")) {
                return this.props.myusermodel.company;
            }
        }
    }
    getAddress() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("address")) {
                return this.props.myusermodel.address
            }
        }
    }
    handleAddress(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.address = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    getCity() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("city")) {
                return this.props.myusermodel.city;
            }
        }
    }
    handleCity(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.city = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    handleZipcode(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.zipcode = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    getZipcode() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("zipcode")) {
                return this.props.myusermodel.zipcode;
            }
        }
    }
    getEmail() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("email")) {
                return this.props.myusermodel.email;
            }
        }
    }
    handleEmail(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.email = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    getPhone() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("phone")) {
                return this.props.myusermodel.phone;
            }
        }
    }

    handlePhone(value) {
        let myusermodel = this.props.myusermodel;
        myusermodel.phone = value;
        this.props.reduxUser(myusermodel)
        this.setState({ render: 'render' });;
    }
    async updateuserprofile() {
        let firstname = this.props.myusermodel.firstname;
        let lastname = this.props.myusermodel.lastname;
        let company = this.props.myusermodel.company;
        let address = this.props.myusermodel.address;
        let city = this.props.myusermodel.city;
        let zipcode = this.props.myusermodel.zipcode;
        let phonenumber = this.props.myusermodel.phone;
        let email = this.props.myusermodel.email;
        let contactstate = this.props.myusermodel.contactstate;
        let gender = this.props.myusermodel.gender;
        let clientid = this.props.match.params.clientid;
        let values = UserModel(clientid, gender, firstname, lastname, company, address, city, contactstate, zipcode, email, phonenumber)
        console.log(values)
        let response = await UpdateUserProfile(values)
        console.log(response);
        let responsevalues = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        responsevalues.clientid = response.clientid;
        this.props.reduxUser(responsevalues);
        this.setState({ render: 'render', message: response.message })
    }
    render() {

        return (
            <div class="register-container">
        <div class="register-title">
        Update Profile
        </div>
         <div class="register-title">
        Your Profile is found at {process.env.REACT_APP_CLIENT}/{this.props.match.params.clientid}
        </div>
        <div className="gender-container">
            <button className="newradio" id="btnmale" onClick={event=>{this.handlemale(event)}}>{this.returnmale()} </button> Male 
            <button className="newradio" id="btnfemale" onClick={event=>{this.handlefemale(event)}}> {this.returnfemale()}</button> Female
        </div>
        <div className="register-half">First Name<br/><input type="text" className = "regular-field"
        name = "firstname"
        onChange = { event => { this.handleFirstName(event.target.value)}} value={this.getFirstName()} /></div>
         <div className="register-half">Last Name <br/><input type="text" className="regular-field" name="lastname" onChange={event=>{this.handleLastName(event.target.value)}} value={this.getLastName()}/></div>
         <div className="register-full">Company <br/><input type="text" className="regular-field"   name="company" onChange={event=>{this.handleCompany(event.target.value)}} value={this.getCompany()} /></div>
         <div className="register-full">Address <br/><input type="text" className="regular-field"   name="address" onChange={event=>{this.handleAddress(event.target.value)}} value={this.getAddress()}/></div>
         <div className="register-half">City<br/><input type="text" className="regular-field"  name="city" onChange={event=>{this.handleCity(event.target.value)}} value={this.getCity()}/></div>
         <div className="register-half">State <br/><input type="text" className="regular-field" value="California" name="contactstate"/></div>
         <div className="register-half">Zipcode<br/><input type="text" className="regular-field"  name="zipcode" onChange={event=>{this.handleZipcode(event.target.value)}} value={this.getZipcode()}/></div>
         <div className="register-half">Phone Number <br/><input type="text" className="regular-field" name="phonenumber"  onChange={event=>{this.handlePhone(event.target.value)}} value={this.getPhone()}/></div>
         <div className="register-full">Email Address<br/><input type="text" className="regular-field"  name="emailaddress"onChange={event=>{this.handleEmail(event.target.value)}} value={this.getEmail()}/></div>
         <div className="emailsignup"><button id="btnsignupemail" onClick={event=>{this.updateuserprofile()}}> {saveProfile()}</button> </div>
         <div className="register-full"> {this.state.message}</div>
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects
    };
}

export default connect(mapStateToProps, actions)(Profile);
