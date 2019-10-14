import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import * as actions from './actions';
import Header from './components/header';
import Landing from './components/landing';
import Login from './components/login';
import Register from './components/register';
import Projects from './components/projects';
import Project from './components/project';
import Profile from './components/profile';
import LogDraft from './components/logdraft';
import LabSummary from './components/labsummary';
import FieldReport from './components/fieldreport';
import Letter from './components/letter';
import Schedule from './components/schedule';
import Actual from './components/actual';
import Events from './components/events';
import Invoice from './components/invoice';
import ViewProfile from './components/viewprofile';
import Engineer from './components/engineer';
import CompleteProfile from './components/completeprofile';
class App extends Component {
  componentDidMount() {
    document.title = "E-Client";
  }


  render() {
    return (

      <BrowserRouter>
    <div className="print-header">
    <Header/>
    <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/:clientid" component={ViewProfile} />
    <Route exact path="/:clientid/profile" component={Profile} />
     <Route exact path="/:clientid/completeprofile" component={CompleteProfile} />
    <Route exact path="/engineers/:engineerid" component={Engineer} />
    <Route exact path="/client/login" component={Login} />
    <Route exact path="/client/login/:message" component={Login} />
    <Route exact path="/newclient/register" component={Register} />
    <Route exact path="/:clientid/projects" component={Projects} />
    <Route exact path="/:clientid/projects/:projectid" component={Project} />
    <Route exact path="/:clientid/projects/:projectid/geology/:boringid" component={LogDraft} />
    <Route exact path="/:clientid/projects/:projectid/labsummary" component={LabSummary} />
    <Route exact path="/:clientid/projects/:projectid/fieldreports/:fieldid" component={FieldReport} />
    <Route exact path="/:clientid/projects/:projectid/reports/:letterid" component={Letter} />
    <Route exact path="/:clientid/projects/:projectid/invoices/:invoiceid" component={Invoice} />
    <Route exact path="/:clientid/projects/:projectid/schedule" component={Schedule} />
    <Route exact path="/:clientid/projects/:projectid/actual" component={Actual} />
    <Route exact path="/:clientid/projects/:projectid/events" component={Events} />
    </Switch>
    </div>
    </BrowserRouter>

    );
  }
}

export default connect(null, actions)(App);
