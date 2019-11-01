import React, { Component } from 'react';
import './register.css';
import { radioOpen, radioClosed, emailSignup } from './svg';
import { CheckClientID, getClient } from '../actions/api'
import { connect } from 'react-redux';
import { UserModel, validateClientID } from './functions';
import * as actions from '../actions';
class CompleteProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { errmsg: "", gender: "", clientid: "", firstname: '', lastname: '', company: '', address: '', city: '', contactstate: '', zipcode: '', emailaddress: '', phonenumber: '' }
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
        console.log(clientid)
        let response = await getClient(clientid);
        console.log(response)
        let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        this.props.reduxUser(myusermodel)


        if (response.hasOwnProperty("projects")) {
            this.props.reduxProjects(response.projects.project)
            if (response.projects.project.hasOwnProperty("length")) {

                let activeprojectid = response.projects.project[0].projectid;
                this.props.reduxProjectID(activeprojectid);
            }

        }
        let message = "";
        if (response.hasOwnProperty("clientid")) {
            message = `Your Profile will appear as ${process.env.REACT_APP_CLIENT}/${clientid}`
        }
        this.setState({ message })

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

    handleclientid(clientid) {
        clientid = clientid.toLowerCase()
        let errmsg = validateClientID(clientid);

        let message = `Your Profile will appear as ${process.env.REACT_APP_CLIENT}/${clientid}`
        let myusermodel = this.props.myusermodel;
        myusermodel.clientid = clientid;
        this.props.reduxUser(myusermodel)
        if (errmsg) {
            this.setState({ errmsg, message: errmsg })
        }
        else {
            this.setState({ errmsg: "", message })
        }


    }
    getclientid() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("clientid")) {
                return this.props.myusermodel.clientid;
            }
        }
    }

    showclienturl() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.clientid) {

                return (<div className="register-full"> {this.state.message}</div>)
            }
        }
    }

    handlepassword(password) {
        this.setState({ password })
    }
    getfirstname() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel) {
                if (this.props.myusermodel.hasOwnProperty("firstname")) {
                    return this.props.myusermodel.firstname;
                }
            }
        }
    }
    handlefirstname(firstname) {
        let myusermodel = this.props.myusermodel;
        myusermodel.firstname = firstname;
        this.props.reduxUser(myusermodel)

        this.setState({ render: 'render' });

    }
    handlelastname(lastname) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.lastame = lastname;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getlastname() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("lastname")) {
                return this.props.myusermodel.lastname;
            }
        }
    }
    handlecompany(company) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.company = company;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getcompany() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("company")) {
                return this.props.myusermodel.company;
            }
        }
    }
    handleaddress(address) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.address = address;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getaddress() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("address")) {
                return this.props.myusermodel.address;
            }
        }
    }
    handlecity(city) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.city = city;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getcity() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("city")) {
                return this.props.myusermodel.city;
            }
        }
    }
    handlecontactstate(contactstate) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.contactstate = contactstate;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getcontactstate() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("contactstate")) {
                return this.props.myusermodel.contactstate;
            }
        }
    }
    handlezipcode(zipcode) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.zipcode = zipcode;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getzipcode() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("zipcode")) {
                return this.props.myusermodel.zipcode;
            }
        }

    }
    handleemailaddress(email) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.email = email;
            this.props.reduxUser(myusermodel)
        }

        this.setState({ render: 'render' });
    }
    getemailaddress() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("email")) {
                return this.props.myusermodel.email;
            }
        }

    }
    handlephonenumber(phone) {
        if (this.props.myusermodel) {
            let myusermodel = this.props.myusermodel;
            myusermodel.phone = phone;
            this.props.reduxUser(myusermodel)

            this.setState({ render: 'render' });
        }
    }
    getphonenumber() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("phone")) {
                return this.props.myusermodel.phone;
            }
        }

    }
    async checkclientid() {
        let errmsg = this.state.errmsg;
        if (!errmsg) {
            let clientid = this.props.myusermodel.clientid;
            let values = { clientid }
            if (clientid) {
                let response = await CheckClientID(values);
                console.log(response)
                if (response.hasOwnProperty("invalid")) {
                    this.setState({ message: response.message, errmsg: response.message })
                }
                else {

                    let message = `Your Profile will appear as ${process.env.REACT_APP_CLIENT}/${clientid}`
                    this.setState({ message, errmsg: "" })
                }
            }
        }
    }
    handlesubmit(event) {
        if (this.state.errmsg) {
            event.preventDefault();
        }
    }
    getgender() {
        let gender = "";
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("gender")) {
                if (this.props.myusermodel.gender) {
                    gender = this.props.myusermodel.gender;
                }
            }

        }

        return gender;
    }
    render() {
        const formaction = `${process.env.REACT_APP_SERVER_API}/${this.props.match.params.clientid}/updateclientregister`

        return (<form action={formaction} method="post" onSubmit={event => { this.handlesubmit(event) }}>
            <div class="register-container">

                <div class="register-title">
                    Complete Your Profile
        </div>
                <div className="register-full">{this.state.message}  </div>
                <div className="gender-container">
                    <button type="button" className="newradio" id="btnmale" onClick={event => { this.handlemale(event) }}>{this.returnmale()} </button> Male
            <button type="button" className="newradio" id="btnfemale" onClick={event => { this.handlefemale(event) }}> {this.returnfemale()}</button> Female
            <input type="hidden" name="gender" value={this.getgender()} />
                </div>
                <div className="register-half">First Name<br /><input type="text" className="regular-field" name="firstname" onChange={event => { this.handlefirstname(event.target.value) }} value={this.getfirstname()} /></div>
                <div className="register-half">Last Name <br /><input type="text" className="regular-field" name="lastname" onChange={event => { this.handlelastname(event.target.value) }} value={this.getlastname()} /></div>
                <div className="register-full">Client ID <br /><input type="text" className="regular-field" name="clientid"
                    onFocus={event => { this.checkclientid(event) }}
                    onBlur={event => { this.checkclientid(event) }}
                    value={this.getclientid()}
                    onChange={event => { this.handleclientid(event.target.value) }} /></div>
                {this.showclienturl()}
                <div className="register-full">Company <br /><input type="text" className="regular-field" name="company" onChange={event => { this.handlecompany(event.target.value) }} value={this.getcompany()} /></div>
                <div className="register-full">Address <br /><input type="text" className="regular-field" name="address" onChange={event => { this.handleaddress(event.target.value) }} value={this.getaddress()} /></div>
                <div className="register-half">City<br /><input type="text" className="regular-field" name="city" value={this.getcity()} onChange={event => { this.handlecity(event.target.value) }} /></div>
                <div className="register-half">State <br /><input type="text" className="regular-field" name="contactstate" value={this.getcontactstate()} onChange={event => { this.handlecontactstate(event.target.value) }} /></div>
                <div className="register-half">Zipcode<br /><input type="text" className="regular-field" name="zipcode" value={this.getzipcode()} onChange={event => { this.handlezipcode(event.target.value) }} /></div>
                <div className="register-half">Phone Number <br /><input type="text" className="regular-field" name="phone" value={this.getphonenumber()} onChange={event => { this.handlephonenumber(event.target.value) }} /></div>
                <div className="register-full">Email Address<br /><input type="text" className="regular-field" name="email" value={this.getemailaddress()} onChange={event => { this.handleemailaddress(event.target.value) }} /></div>
                <div className="register-full">Password <br /><input type="password" className="regular-field" name="password" onChange={event => { this.handlepassword(event.target.value) }} value={this.state.password} /></div>
                <div className="emailsignup"><button id="btnsignupemail"> {emailSignup()}</button> </div>
                <div className="register-full"><input type="hidden" name="gender" value={this.state.gender} /></div>

            </div>
        </form>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects
    };
}
export default connect(mapStateToProps, actions)(CompleteProfile);
