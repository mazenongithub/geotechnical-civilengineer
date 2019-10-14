import React, { Component } from 'react';
import { LoadClient } from '../actions/api';
import './register.css';

class ViewProfile extends Component {
    constructor(props) {
        super(props);
        this.state = { client: {} }
    }
    componentDidMount() {
        this.loadclient();
    }
    async loadclient() {
        let clientid = this.props.match.params.clientid
        let response = await LoadClient(clientid)
        console.log(response)
        this.setState({ client: response })

    }
    getfirstline() {
        let firstline = "";
        if (this.state.client) {
            if (this.state.client.gender) {
                if (this.state.client.gender === "female") {
                    firstline += `Ms. `

                }
                else if (this.state.client.gender === "male") {
                    firstline += `Mr. `
                }
            }
            if (this.state.client.firstname) {
                firstline += `${this.state.client.firstname}`
                if (this.state.client.lastname) {
                    firstline += `${this.state.client.lastname}`
                }

            }
        }
        return firstline;
    }
    secondline() {
        if (this.state.client.contactcompany) {
            return (<div className="main-profile-container">{this.state.client.contactcompany} </div>)
        }
    }
    thirdline() {
        let thirdline = "";
        if (this.state.client.contactaddress) {
            thirdline += this.state.client.contactaddress;
        }
        if (thirdline) {
            return (<div className="main-profile-container">{thirdline} </div>)
        }
    }
    fourthline() {
        let fourthline = "";
        if (this.state.client.contactcity) {
            fourthline += this.state.client.contactcity;
        }
        if (this.state.client.contactstate) {
            fourthline += `, ${this.state.client.contactstate}`;
        }
        if (this.state.client.contactzipcode) {
            fourthline += ` ${this.state.client.contactzipcode}`;
        }
        return (<div className="main-profile-container">{fourthline} </div>)
    }
    fifthline() {
        let fifthline = [];
        if (this.state.client.contactemail && this.state.client.contactphonenumber) {

            fifthline.push(<div className="profile-container-2"><a className="nodecoration" href={`mailTo:${this.state.client.contactemail}`}>{this.state.client.contactemail} </a> </div>)
            fifthline.push(<div className="profile-container-2"><a className="nodecoration" href={`tel:${this.state.client.contactphonenumber}`}>{this.state.client.contactphonenumber} </a> </div>)
        }
        else if (this.state.client.contactemail) {
            fifthline.push(<div className="main-profile-container"><a className="nodecoration" href={`mailTo:$ {this.state.client.contactemail}`}>{this.state.client.contactemail} </a>  </div>)
        }
        else if (this.state.client.contactphonenumber) {
            fifthline.push(<div className="main-profile-container"><a className="nodecoration" href={`tel:${this.state.client.contactphonenumber}`}>{this.state.client.contactphonenumber} </a> </div>)
        }

        return fifthline;
    }
    render() {

        return (
            <div className="register-container">
            <div className="main-profile-container"><div className="profilepicture-container">&nbsp; </div></div>
            <div className="main-profile-container">{this.getfirstline()} </div>
            {this.secondline()}
            {this.thirdline()}
            {this.fourthline()}
            {this.fifthline()}
       
        </div>)
    }

}


export default ViewProfile;
