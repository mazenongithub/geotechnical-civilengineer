import React, { Component } from 'react';
import { LoadClient } from '../actions/api';
import './register.css';
import { yahooIcon } from './svg'
class FindYahoo extends Component {

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

    showyahoo() {
        if (this.state.client.clientid) {

            const yahooredirect = `${process.env.REACT_APP_SERVER}/oauth20/yahoo/login`;
            const yahooscope = `https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${yahooredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YAHOO_CLIENTID}&state=${this.props.match.params.clientid}`
            const client = `${this.state.client.firstname} ${this.state.client.lastname}`;
            return (<div className="login-container">
   <div className="main-profile-general"> {client} I created this to link to find your yahoo account and Link it to your EClient Account. Once your consent it will link to your account so you can sign in with yahoo to access your EClient account.  </div>
   <div className="loginbutton-container">
        <div className="google-container">
                <a href={yahooscope}>
                    {yahooIcon()}
                </a>
        </div>
    </div>
   </div>)

        }
        else {
            return (<span> &nbsp;</span>)
        }
    }

    render() { return (this.showyahoo()) }

}


export default FindYahoo;
