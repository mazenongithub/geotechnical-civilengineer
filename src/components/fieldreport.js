import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClient, getProject } from '../actions/api';
import { UserModel, formatDateReport, formatTimefromDB } from './functions';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import './fieldreport.css'
class FieldReport extends Component {
    constructor(props) {
        super(props)
        this.state = { width: "", height: "" }
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
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
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
    getfieldengineer() {
        let fieldengineer = "";
        let projectid = this.props.match.params.projectid;
        let fieldid = this.props.match.params.fieldid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                if (fieldreport.fieldid === fieldid) {
                                    fieldengineer = `Field Engineer: ${fieldreport.firstnameengineer} ${fieldreport.lastnameengineer}`
                                }
                            })
                        }
                    }
                })
            }
        }
        return fieldengineer;

    }
    gettitleblock() {
        let projectid = this.props.match.params.projectid;
        let titleblock = [];

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        titleblock.push(<span>{`Project Number: ${myproject.projectnumber}`}</span>)
                        titleblock.push(<br/>)
                        titleblock.push(<span>{myproject.title}</span>)
                        titleblock.push(<br/>)
                        titleblock.push(<span>{myproject.projectaddress} {myproject.projectcity},CA</span>)
                        titleblock.push(<br/>)
                    }
                })

            }
        }
        return titleblock;
    }
    getdatereport() {
        let datereport = "";
        let projectid = this.props.match.params.projectid;
        let fieldid = this.props.match.params.fieldid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                if (fieldreport.fieldid === fieldid) {
                                    datereport = formatDateReport(fieldreport.datereport);
                                }
                            })
                        }
                    }
                })
            }
        }
        return datereport;
    }
    getfieldreport() {
        let fieldreport = [];
        let projectid = this.props.match.params.projectid;
        let fieldid = this.props.match.params.fieldid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(report => {
                                if (report.fieldid === fieldid) {
                                    let newcontent = report.reportcontent.split(/\n/g)
                                    newcontent.forEach(content => {

                                        fieldreport.push(<p> {content} </p>)

                                    })

                                }
                            })
                        }
                    }
                })
            }
        }
        return fieldreport;

    }
    getcompactioncurves() {
        let projectid = this.props.match.params.projectid;
        let fieldid = this.props.match.params.fieldid;
        let compactioncurves = [];

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                if (fieldreport.fieldid === fieldid) {
                                    if (fieldreport.hasOwnProperty("compactioncurves")) {
                                        // eslint-disable-next-line
                                        fieldreport.compactioncurves.compactioncurve.map(compactioncurve => {
                                            if (this.state.width >= 721) {
                                                compactioncurves.push(this.showcompactionrow(compactioncurve))
                                            }
                                            else {
                                                compactioncurves.push(this.showsmallcompactionrow(compactioncurve))


                                            }

                                        })

                                    }
                                }



                            })
                        }
                    }
                })
            }
        }
        if (this.state.width >= 721) {
            return (<div className="compactioncurve-container"> 
        <div className="compactiontable-header"> Table 1 - Summary of Laboratory Test Results</div>
        <div className="compactioncurve-labelrow-a"> Curve Number</div>
        <div className="compactioncurve-labelrow-b"> Description</div>
        <div className="compactioncurve-labelrow-c"> Max Density (pcf)</div>
        <div className="compactioncurve-labelrow-c"> Optimum Moisture %</div>
        {compactioncurves}
        </div>)
        }
        else {
            return (<div className="compactioncurve-container"> 
             <div className="compactiontable-header"> Table 1 - Summary of Laboratory Test Results</div>
    {compactioncurves}
    </div>)
        }
    }
    showsmallcompactionrow(compactioncurve) {
        let compactionrow = [];
        compactionrow.push(<div className="compactioncurve-labelrow-a"> Curve Number</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-b"> Description</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-a">{compactioncurve.curvenumber}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-b"> {compactioncurve.description}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> Max Density (pcf)</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> Optimum Moisture %</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> {Number(compactioncurve.maxden).toFixed(1)}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> {Number(compactioncurve.moist).toFixed(1)}</div>)
        return compactionrow;

    }
    showcompactionrow(compactioncurve) {
        let compactionrow = [];
        compactionrow.push(<div className="compactioncurve-labelrow-a">{compactioncurve.curvenumber}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-b"> {compactioncurve.description}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> {Number(compactioncurve.maxden).toFixed(1)}</div>)
        compactionrow.push(<div className="compactioncurve-labelrow-c"> {Number(compactioncurve.moist).toFixed(1)}</div>)

        return compactionrow;
    }
    getcompactiontests() {
        let projectid = this.props.match.params.projectid;
        let fieldid = this.props.match.params.fieldid;
        let compactiontests = [];

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                if (fieldreport.fieldid === fieldid) {
                                    if (fieldreport.hasOwnProperty("compactiontests")) {
                                        // eslint-disable-next-line
                                        fieldreport.compactiontests.compactiontest.map(compactiontest => {
                                            if (this.state.width >= 1081) {
                                                compactiontests.push(this.showcompactiontest(compactiontest))
                                            }
                                            else if (this.state.width >= 721) {
                                                compactiontests.push(this.showmediumcompaction(compactiontest))
                                            }
                                            else {
                                                compactiontests.push(this.showsmallcompaction(compactiontest))
                                            }
                                        })


                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
        if (this.state.width >= 1081) {
            return (<div className="compactioncurve-container"> 
        <div className="compactiontable-header"> Table 2 - Summary of Field Compaction Test Results</div>
        <div className="compactiontest-labelrow-a"> Time</div>
        <div className="compactiontest-labelrow-a"> Test No.</div>
        <div className="compactiontest-labelrow-b"> Location</div>
        <div className="compactiontest-labelrow-a"> Elevation</div>
        <div className="compactiontest-labelrow-a"> Dry Density (pcf)</div>
        <div className="compactiontest-labelrow-a"> Moisture Content %</div>
        <div className="compactiontest-labelrow-a"> Relative Compaction</div>
        <div className="compactiontest-labelrow-a"> Curve Number</div>
        {compactiontests}
        </div>)
        }
        else {
            return (<div className="compactioncurve-container"> 
            <div className="compactiontable-header"> Table 2 - Summary of Field Compaction Test Results</div>
           {compactiontests}
        </div>)
        }
    }
    showcompactiontest(compactiontest) {
        let compactiontests = [];

        compactiontests.push(<div className="compactiontest-labelrow-a"> {formatTimefromDB(compactiontest.timetest)}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.testnum}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-b"> {compactiontest.location}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.elevation}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.dryden}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.moistpercent}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {Math.round(compactiontest.relative)}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.curvenumber}</div>)
        return compactiontests;
    }
    showmediumcompaction(compactiontest) {
        let compactiontests = [];

        compactiontests.push(<div className="compactiontest-labelrow-a"> Test No.</div>)
        compactiontests.push(<div className="compactiontest-labelrow-b"> Location</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.testnum}</div>)

        compactiontests.push(<div className="compactiontest-labelrow-b"> {compactiontest.location}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> Time</div>)

        compactiontests.push(<div className="compactiontest-labelrow-a"> Elevation</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> Dry Density (pcf)</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> Moisture Content %</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> Relative Compaction</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> Curve Number</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {formatTimefromDB(compactiontest.timetest)}</div>)

        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.elevation}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.dryden}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.moistpercent}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {Math.round(compactiontest.relative)}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.curvenumber}</div>)
        return compactiontests;
    }
    showsmallcompaction(compactiontest) {
        let compactiontests = [];

        compactiontests.push(<div className="compactiontest-labelrow-a"> Test No.</div>)
        compactiontests.push(<div className="compactiontest-labelrow-b"> Location</div>)
        compactiontests.push(<div className="compactiontest-labelrow-a"> {compactiontest.testnum}</div>)

        compactiontests.push(<div className="compactiontest-labelrow-b"> {compactiontest.location}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> Time</div>)

        compactiontests.push(<div className="compactiontest-labelrow-c"> Elevation</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> Dry Density (pcf)</div>)

        compactiontests.push(<div className="compactiontest-labelrow-c"> {formatTimefromDB(compactiontest.timetest)}</div>)

        compactiontests.push(<div className="compactiontest-labelrow-c"> {compactiontest.elevation}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> {compactiontest.dryden}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> Moisture Content %</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> Relative Compaction</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> Curve Number</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> {compactiontest.moistpercent}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> {Math.round(compactiontest.relative)}</div>)
        compactiontests.push(<div className="compactiontest-labelrow-c"> {compactiontest.curvenumber}</div>)
        return compactiontests;
    }
    getcompactionreport() {
        let compactionreport = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            let fieldid = this.props.match.params.fieldid;
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                if (fieldreport.fieldid === fieldid) {
                                    if (fieldreport.hasOwnProperty("compactiontests")) {
                                        let compactioncurves = this.getcompactioncurves();
                                        let compactiontests = this.getcompactiontests();
                                        compactionreport.push(compactioncurves);
                                        compactionreport.push(compactiontests)
                                    }
                                }
                            })
                        }
                    }
                })
            }
        }
        return compactionreport;

    }
    getlinktoprojects() {
        let clientid = this.props.match.params.clientid;
        let projectid = this.props.match.params.projectid;
        return (`/${clientid}/projects/${projectid}`)
    }
    handleFieldReport() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("clientid")) {
                return (<div className="fieldreport-container">
    <div className="fieldreport-title">
    Geotechnical Field Report
    </div>
     <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
    <div className="fieldreport-row-1">{this.getfieldengineer()}</div>
    <div className="fieldreport-row-1">{this.gettitleblock()}</div>
    <div className="fieldreport-daterow">{this.getdatereport()}</div>
    <div className="fieldreport-daterow">I was onsite to observe the following:</div>
    <div className="fieldreport-daterow">{this.getfieldreport()}</div>
    <div className="fieldreport-daterow"> {this.getcompactionreport()}</div>
    
    </div>)
            }
            else {
                return (<span>&nbsp; </span>)
            }
        }
        else {
            return (<span>&nbsp; </span>)
        }
    }
    render() {

        return (this.handleFieldReport())
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid
    };
}

export default connect(mapStateToProps, actions)(FieldReport);
