import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import './header.css';
import { menuIcon } from './svg'
class Header extends(Component) {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, navigation: false };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  toggleNavigation() {
    let navigation = true;
    if (this.state.navigation) {
      navigation = false;
    }
    this.setState({ navigation })
  }

  menu_1() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.hasOwnProperty("clientid")) {
        let clientid = this.props.myusermodel.clientid;
        //loggedin
        return (<Link className="nav-link" to={`/${clientid}/profile`}>profile </Link>)
      }
      else {
        //logged out  
        return (<Link className="nav-link" to="/client/login">login </Link>)
      }
    }
    else {
      //logged out 
      return (<Link className="nav-link" to="/client/login">login </Link>)
    }

  }
  menu_2() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.hasOwnProperty("clientid")) {
        //loggedin
        let clientid = this.props.myusermodel.clientid;
        //loggedin

        return (<p><Link className="nav-link" to={`/${clientid}/projects`}>projects </Link></p>)
      }
      else {
        //logged out  
        return (<p><Link className="nav-link" to="/newclient/register">register</Link></p>)
      }
    }
    else {
      //logged out 
      return (<p><Link className="nav-link" to="/newclient/register">register</Link></p>)
    }

  }
  menu_3() {

    if (this.props.myusermodel) {
      if (this.props.myusermodel.hasOwnProperty("clientid")) {
        //loggedin
        let clientid = this.props.myusermodel.clientid;
        let backendapi = `${process.env.REACT_APP_SERVER}/${clientid}/clientlogout`
        return (<p><a href={backendapi} className="nav-link">logout </a></p>)
      }
      else {
        //logged out  
        return (<p><Link className="nav-link" to="/">home </Link></p>)
      }
    }
    else {
      //logged out 
      return (<p><Link className="nav-link" to="/">home </Link></p>)
    }

  }
  menu_4() {
    return (<p><Link className="nav-link" to="/engineers/mazen">my engineer</Link></p>)
  }
  handleNavigation() {

    if (this.state.width) {
      let width = this.state.width;
      if (this.state.navigation) {
        // navigation is open
        if (width > 720) {
          return (
            <div className="navigation-container"> 
            <div className="floatingicon-container">
              <button id="menu-icon" onClick={event=>{this.toggleNavigation(event)}}> {menuIcon()}</button> 
            </div>
            <div className="menu-container">
             {this.menu_1()}
             {this.menu_2()}
             {this.menu_3()}
             {this.menu_4()}
            </div>
            <div className="open-logo-container"> EClient Geotechnical Reports</div>
          </div>)
        }
        else {
          return (<div className="smallnavigation-container">
         <div className="floatingicon-container"><button id="menu-icon" onClick={event=>{this.toggleNavigation(event)}}> {menuIcon()}</button> </div>
         <div className="smallmenu-container">
         {this.menu_1()}
         {this.menu_2()}
         {this.menu_3()}
          {this.menu_4()}
        </div>
         <div className="smalllogo-container"> EClient Geotechnical Reports</div>
         </div>)

        }
      }
      else {
        // navigation is closed
        if (width > 720) {
          return (<div className="navigation-container">
       <div className="icon-container"><button id="menu-icon" onClick={event=>{this.toggleNavigation(event)}}> {menuIcon()}</button> </div>
       <div className="logo-container"> EClient Geotechnical Reports</div>
        </div>)
        }
        else {
          return (<div className="smallnavigation-container">
         <div className="floatingicon-container"><button id="menu-icon" onClick={event=>{this.toggleNavigation(event)}}> {menuIcon()}</button> </div>
         <div className="smalllogo-container"> EClient Geotechnical Reports</div>
         </div>)
        }

      }


    }

  }

  render() {


    return (
      <div>{this.handleNavigation()}</div>
    )

  }


}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel }
}
export default connect(mapStateToProps)(Header)
