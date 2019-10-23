import React, { Component } from 'react';
import './register.css';
import { radioOpen, radioClosed, emailSignup, googleSignup, yahooIcon } from './svg';
import { CheckClientID } from '../actions/api';
import { validateClientID } from './functions';
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { errmsg: "", gender: "", clientid: "", firstname: '', lastname: '', company: '', address: '', city: '', contactstate: '', zipcode: '', emailaddress: '', phonenumber: '' }
    }
    handlemale(event) {

        this.setState({ gender: "male" })
    }
    returnmale() {
        if (this.state.gender === "male") {

            return (radioClosed())
        }
        else {

            return (radioOpen())
        }
    }
    handlefemale(event) {

        this.setState({ gender: "female" })
    }
    returnfemale() {
        if (this.state.gender === "female") {
            return (radioClosed())
        }
        else {
            return (radioOpen())
        }
    }

    handleclientid(clientid) {
        clientid = clientid.toLowerCase()
        let errmsg = validateClientID(clientid);
        let message = `Your Profile will appear as ${process.env.REACT_APP_CLIENT}/${this.state.clientid}`
        if (errmsg) {
            this.setState({ clientid, errmsg, message: errmsg })
        }
        else {
            this.setState({ clientid, errmsg: "", message })
        }

    }
    showclienturl() {
        if (this.state.clientid) {
            return (<div className="register-full">{this.state.message}</div>)
        }
    }

    handlepassword(password) {
        this.setState({ password })
    }
    handlefirstname(firstname) {
        this.setState({ firstname })
    }
    handlelastname(lastname) {
        this.setState({ lastname })
    }
    handlecompany(company) {
        this.setState({ company })
    }
    handleaddress(address) {
        this.setState({ address })
    }
    handlecity(city) {
        this.setState({ city })
    }
    handlecontactstate(contactstate) {
        this.setState({ contactstate })
    }
    handlezipcode(zipcode) {
        this.setState({ zipcode })
    }
    handleemailaddress(emailaddress) {
        this.setState({ emailaddress })
    }
    handlephonenumber(phonenumber) {
        this.setState({ phonenumber })
    }
    async checkclientid() {
        let errmsg = this.state.errmsg;
        if (!errmsg) {
            let clientid = this.state.clientid;
            let values = { clientid }
            if (clientid) {
                let response = await CheckClientID(values);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ message: response.message, errmsg: response.message })
                }
                else {
                    this.setState({ errmsg: "" })
                }
            }
        }
    }
    handlesubmit(event) {
        if (this.state.errmsg) {
            event.preventDefault();
        }
    }
    render() {
        const formaction = `${process.env.REACT_APP_SERVER_API}/clientregister`
        const googleredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/google/login`;
        const googlescope = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENTID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`
        const yahooredirect = `${process.env.REACT_APP_SERVER_API}/oauth20/yahoo/login`;
        const yahooscope = `https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${yahooredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YAHOO_CLIENTID}`
        return (<form action={formaction} method="post" onSubmit={event => { this.handlesubmit(event) }}>
            <div class="register-container">
                <div class="register-google">
                    <a href={googlescope}><button id="btnregisterwithgoogle" type="button">{googleSignup()}</button></a>
                </div>

                <div className="register-google">

                    <a href={yahooscope}>
                        <button className="btnregister"> {yahooIcon()} </button>
                    </a>

                </div>
                <div class="register-title">
                    Register New Account By Email
        </div>
                <div className="register-full">{this.state.message}  </div>
                <div className="gender-container">
                    <button type="button" className="newradio" id="btnmale" onClick={event => { this.handlemale(event) }}>{this.returnmale()} </button> Male
            <button type="button" className="newradio" id="btnfemale" onClick={event => { this.handlefemale(event) }}> {this.returnfemale()}</button> Female
        </div>
                <div className="register-half">First Name<br /><input type="text" className="regular-field" name="firstname" onChange={event => { this.handlefirstname(event.target.value) }} value={this.state.firstname} /></div>
                <div className="register-half">Last Name <br /><input type="text" className="regular-field" name="lastname" onChange={event => { this.handlelastname(event.target.value) }} value={this.state.lastname} /></div>
                <div className="register-full">Client ID <br /><input type="text" className="regular-field" name="clientid" onFocus={event => { this.checkclientid(event) }} onBlur={event => { this.checkclientid(event) }} value={this.state.clientid} onChange={event => { this.handleclientid(event.target.value) }} /></div>
                {this.showclienturl()}
                <div className="register-full">Company <br /><input type="text" className="regular-field" name="company" onChange={event => { this.handlecompany(event.target.value) }} value={this.state.company} /></div>
                <div className="register-full">Address <br /><input type="text" className="regular-field" name="address" onChange={event => { this.handleaddress(event.target.value) }} value={this.state.address} /></div>
                <div className="register-half">City<br /><input type="text" className="regular-field" name="city" value={this.state.city} onChange={event => { this.handlecity(event.target.value) }} /></div>
                <div className="register-half">State <br /><input type="text" className="regular-field" name="contactstate" value={this.state.contactstate} onChange={event => { this.handlecontactstate(event.target.value) }} /></div>
                <div className="register-half">Zipcode<br /><input type="text" className="regular-field" name="zipcode" value={this.state.zipcode} onChange={event => { this.handlezipcode(event.target.value) }} /></div>
                <div className="register-half">Phone Number <br /><input type="text" className="regular-field" name="phonenumber" value={this.state.phonenumber} onChange={event => { this.handlephonenumber(event.target.value) }} /></div>
                <div className="register-full">Email Address<br /><input type="text" className="regular-field" name="emailaddress" value={this.state.emailaddress} onChange={event => { this.handleemailaddress(event.target.value) }} /></div>
                <div className="register-full">Password <br /><input type="password" className="regular-field" name="password" onChange={event => { this.handlepassword(event.target.value) }} value={this.state.password} /></div>
                <div className="emailsignup"><button id="btnsignupemail"> {emailSignup()}</button> </div>
                <div className="register-full"><input type="hidden" name="gender" value={this.state.gender} /></div>

            </div>
        </form>)
    }
}
export default Register;
