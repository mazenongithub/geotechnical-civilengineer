import React, { Component } from 'react';
import './login.css';
import { emailLogin, googleLogin, yahooIcon } from './svg'
class Login extends Component {
    render() {
        const formdestination = `${process.env.REACT_APP_SERVER}/api/clientlogin`;
        const googleredirect = `${process.env.REACT_APP_SERVER}/oauth20/google/login`;
        const googlescope = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${googleredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_GOOGLE_CLIENTID}&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.login+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fplus.me+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.profile+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email+https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fuserinfo.email&access_type=offline`
        const yahooredirect = `${process.env.REACT_APP_SERVER}/oauth20/yahoo/login`;
        const yahooscope = `https://api.login.yahoo.com/oauth2/request_auth?redirect_uri=${yahooredirect}&prompt=consent&response_type=code&client_id=${process.env.REACT_APP_YAHOO_CLIENTID}`
        return (

            <form action={formdestination} method="post">
    <div className="login-container">
   <div className="login-title">  Login </div>
   <div className="loginfield-label">Email</div><div className="loginfield"><input type="text" className="regular-field" name="email"/></div>
   <div className="loginfield-label">  Password </div>
   <div className="loginfield"><input type="password" className="regular-field" name="password" /></div>
   <div className="loginbutton-container"> <button className="btnloginuser">{emailLogin()} </button> </div> 
   <div className="loginbutton-container">
        <div className="google-container">
                <a href={googlescope}>
                    {googleLogin()}
                </a>
        </div>
    </div>
    
       <div className="loginbutton-container">
        <div className="google-container">
                <a href={yahooscope}>
                    {yahooIcon()}
                </a>
        </div>
    </div>
   </div>
   </form>)
    }
}

export default Login;
