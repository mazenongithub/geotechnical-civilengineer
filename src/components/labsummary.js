import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import { getClient,getProject } from '../actions/api';
import {
    UserModel,
    returnSieve,
    handlezerovalue,
    checkformediumtests,
    checkatteberglimits,
    checkunconfined,
    checksieveanalysis
}
from './functions';
import './labsummary.css';

class LabSummary extends Component {
    constructor(props) {
        super(props);
        this.state = { width: 0, height: 0 };
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
         let clientid = this.props.match.params.clientid;
        let projectid = this.props.match.params.projectid;
        this.props.reduxProjectID(projectid)
        if (!this.props.projects) {
          
           if (clientid !== "gus") {
                this.getclient(clientid)
            }
            else {
                this.getproject(clientid, projectid)
            }
            
        }
    }
    async getclient(clientid) {
        let response = await getClient(clientid);
        console.log(response)
        let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        this.props.reduxUser(myusermodel)


        if (response.hasOwnProperty("projects")) {
            this.props.reduxProjects(response.projects.project)
        }
    }
    async getproject(clientid, projectid) {
    let response = await getProject(clientid, projectid);
    console.log(response)
     let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        this.props.reduxUser(myusermodel)

    if (response.hasOwnProperty("projects")) {
      this.props.reduxProjects(response.projects.project)
    }
  }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    handleLabSummary() {
        let projectid = this.props.match.params.projectid;
        let labsummary = [];
        let projectnumber = "";
        let title = "";
        let location = "";

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        projectnumber = myproject.projectnumber;
                        title = myproject.title;
                        location = `${myproject.projectaddress}, ${myproject.projectcity}, CA`
                        if (myproject.hasOwnProperty("labsummary")) {
                            // eslint-disable-next-line
                            myproject.labsummary.lab.map(lab => {
                                if (this.state.width >= 1081) {
                                    labsummary.push(this.showlabsummary(lab))
                                }
                                else if (this.state.width >= 721) {
                                    labsummary.push(this.showmedium(lab))
                                }
                                else {
                                    labsummary.push(this.showsmall(lab))
                                }
                            })
                        }
                    }
                })
            }
        }

        if (this.state.width > 721 && this.state.width < 1081) {
            //medium
            return (<div className="labsummary-container">
             <div className="labsummary-linkcontainer">
                <Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> 
            </div>
             <div className="title-row-med1a">{`Project No. ${projectnumber}`} </div>
            <div className="title-row-med1b">{`Geotechnical Investigation/${title}`} </div>
            <div className="title-row-med1a"> &nbsp;</div>
            <div className="title-row-med1b"> {location}</div>
             <div className="title-row-2"> Table 1 - Summary of Lab Test Results</div>
            <div className="medium-table">
            {labsummary} 
            </div>
            </div>)
        }
        else if (this.state.width > 1081) {
            //large

            return (
                <div className="labsummary-container">
            <div className="labsummary-linkcontainer">
                <Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> 
            </div>
            
            <div className="title-row-1a">{`Project No. ${projectnumber}`} </div>
            <div className="title-row-1b">{`Geotechnical Investigation/${title}`} </div>
            <div className="title-row-1a"> &nbsp;</div>
            <div className="title-row-1b"> {location}</div>
            
        
            
            <div className="title-row-2"> Table 1 - Summary of Lab Test Results</div>
                <div className="label-row-1">&nbsp; </div>
            <div className="label-row-2">Atterberg Limits </div>
            <div className="label-row-2">Unconfined Compression </div>
            <div className="label-row-3">&nbsp; </div>
            <div className="samplenumber-container">Sample No.</div>
            <div className="lab-container">Depth (ft)</div>
            <div className="lab-container">Dry Density (pcf) </div>
            <div className="lab-container">Moisture Content (%) </div>
            <div className="lab-container">Liquid Limit (%) </div>
            <div className="lab-container">Plasticity Index </div>
            <div className="lab-container">Strength (psf)</div>
            <div className="lab-container">Strain (%)</div>
            <div className="sieve-container">Sieve Analysis </div>
            {labsummary}
        </div>)


        }
        else {
            //small
            return (<div className="labsummary-container">
             <div className="labsummary-linkcontainer">
                <Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> 
            </div>
             <div className="title-row-med1a">{`Project No. ${projectnumber}`} </div>
            <div className="title-row-med1b">{`Geotechnical Investigation/${title}`} </div>
            <div className="title-row-med1a"> &nbsp;</div>
            <div className="title-row-med1b"> {location}</div>
             <div className="title-row-2"> Table 1 - Summary of Lab Test Results</div>
            <div className="small-table">
            {labsummary} 
            </div>
            
            </div>)
        }


    }
    getlinktoprojects() {
        let clientid = this.props.match.params.clientid;
        let projectid = this.props.match.params.projectid;
        return (`/${clientid}/projects/${projectid}`)
    }
    showsmall(lab) {
        let checkatteberg = checkatteberglimits(lab.ll, lab.pi);
        let checkun = checkunconfined(lab.unconfined);
        let checksieve = checksieveanalysis(lab.gravfrac, lab.sandfrac, lab.fines)

        let atteberg = [];
        let unconfined = [];
        let sieveanalysis = [];
        if (checksieve) {
            sieveanalysis.push(<div className="labsummary-small-1">Sieve Analysis</div>)
            sieveanalysis.push(<div className="labsummary-small-1">{returnSieve(lab.gravfrac,lab.sandfrac,lab.fines)} </div>)
        }
        if (checkun) {
            unconfined.push(<div className="labsummary-small-1">Unconfined Compression</div>)
            unconfined.push(<div className="labsummary-small-3">Strength (psf) </div>)
            unconfined.push(<div className="labsummary-small-3">Strain (%) </div>)
            unconfined.push(<div className="labsummary-small-3">{handlezerovalue(lab.unconfined)} </div>)
            unconfined.push(<div className="labsummary-small-3">{handlezerovalue(lab.strain)}  </div>)
        }
        if (checkatteberg) {
            atteberg.push(<div className="labsummary-small-1">Atterberg Limits</div>)
            atteberg.push(<div className="labsummary-small-3">Liquid Limit (%) </div>)
            atteberg.push(<div className="labsummary-small-3">Plasticity Index </div>)
            atteberg.push(<div className="labsummary-small-3">{handlezerovalue(lab.ll)} </div>)
            atteberg.push(<div className="labsummary-small-3">{handlezerovalue(lab.pi)}  </div>)
        }
        return (<div className="labsummary-container">
        <div className="labsummary-small-1">Sample No.</div>
        <div className="labsummary-small-1">{`${lab.hole}-${lab.sampleset}(${lab.samplenumber})${lab.depth}`}</div>
        <div className="labsummary-small-2">Depth (ft)</div>
        <div className="labsummary-small-2">Dry Density (pcf)</div>
        <div className="labsummary-small-2">Moisture Content (%)</div>
        <div className="labsummary-small-2">{lab.depth}</div>
        <div className="labsummary-small-2">{handlezerovalue(lab.dryden)}</div>
        <div className="labsummary-small-2">{handlezerovalue(lab.moist)}</div>
        {atteberg}
        {unconfined}
        {sieveanalysis}
        
        
        </div>)

    }
    showmedium(lab) {
        let checkmedium = checkformediumtests(lab.unconfined, lab.ll, lab.pi, lab.gravfrac, lab.sandfrac, lab.fines)
        let myjsx = [];
        if (checkmedium) {

            myjsx.push(<div className="labsummary-medium-2">Atterberg Limits </div>)
            myjsx.push(<div className="labsummary-medium-2">Unconfined Compression </div>)
            myjsx.push(<div className="labsummary-medium-2">&nbsp; </div>)
            myjsx.push(<div className="labsummary-medium-3a">Liquid Limit (%) </div>)
            myjsx.push(<div className="labsummary-medium-3a">Plasticity Index </div>)
            myjsx.push(<div className="labsummary-medium-3a">Strength (psf) </div>)
            myjsx.push(<div className="labsummary-medium-3a">Strain (%) </div>)
            myjsx.push(<div className="labsummary-medium-3b">Sieve Analysis </div>)
            myjsx.push(<div className="labsummary-medium-3a">{handlezerovalue(lab.ll)} </div>)
            myjsx.push(<div className="labsummary-medium-3a">{handlezerovalue(lab.pi)}  </div>)
            myjsx.push(<div className="labsummary-medium-3a">{handlezerovalue(lab.unconfined)} </div>)
            myjsx.push(<div className="labsummary-medium-3a">{handlezerovalue(lab.strain)} </div>)
            myjsx.push(<div className="labsummary-medium-3b">{returnSieve(lab.gravfrac,lab.sandfrac,lab.fines)} </div>)
        }
        return (
            <div className="labsummary-container">
        <div className="labsummary-medium-1a">Sample No.</div>
        <div className="labsummary-medium-1b">Depth (ft)</div>
        <div className="labsummary-medium-1b">Dry Density (pcf)</div>
        <div className="labsummary-medium-1b">Moisture Content (%)</div>
        <div className="labsummary-medium-1a">{`${lab.hole}-${lab.sampleset}(${lab.samplenumber})${lab.depth}`}</div>
        <div className="labsummary-medium-1b">{lab.depth}</div>
        <div className="labsummary-medium-1b">{handlezerovalue(lab.dryden)}</div>
        <div className="labsummary-medium-1b">{handlezerovalue(lab.moist)}</div>
        {myjsx}
        
        </div>)

    }
    showlabsummary(lab) {

        let myjsx = [];
        myjsx.push(<div className="samplenumber-container">{`${lab.hole}-${lab.sampleset}(${lab.samplenumber})${lab.depth}`}</div>);
        myjsx.push(<div className="lab-container">{lab.depth}</div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.dryden)} </div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.moist)} </div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.ll)}</div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.pi)} </div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.unconfined)}</div>);
        myjsx.push(<div className="lab-container">{handlezerovalue(lab.strain)}</div>);
        myjsx.push(<div className="sieve-container">{returnSieve(lab.gravfrac,lab.sandfrac,lab.fines)} </div>);

        return myjsx;




    }
    render() {
        return (this.handleLabSummary())
    }
}


function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid
    }
}
export default connect(mapStateToProps, actions)(LabSummary)
