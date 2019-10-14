import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getClient, getProject } from '../actions/api';
import { UserModel, formatDateReport, formatTimeTest } from './functions';
import * as actions from '../actions';
import { Link } from 'react-router-dom';
import './fieldreport.css';

class Letter extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
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
  getengineerblock() {
    let engineeringblock = []
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        let letterid = this.props.match.params.letterid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  engineeringblock.push(<span>{letter.firstnameengineer} {letter.lastnameengineer}<br/></span>)
                  engineeringblock.push(<span>{letter.company}<br/> </span>)
                }

              })
            }

          }
        })
      }
    }
    return engineeringblock;
  }
  getclientblock() {
    let clientblock = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        let letterid = this.props.match.params.letterid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  clientblock.push(<span>Project Number {letter.projectnumber}<br/></span>)
                  clientblock.push(<span>{letter.title}<br/> </span>)
                  clientblock.push(<span>{letter.projectaddress} {letter.projectcity},{letter.projectstate}<br/> </span>)
                  clientblock.push(<span><b>{letter.reporttitle}</b> </span>)
                }

              })
            }

          }
        })
      }
    }
    return clientblock;
  }
  loadreportbody() {
    let body = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        let letterid = this.props.match.params.letterid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  if (letter.hasOwnProperty("body")) {
                    // eslint-disable-next-line
                    letter.body.section.map(section => {
                      let newcontent = section.content.split(/\n/g)
                      newcontent.forEach(content => {

                        body.push(<p> {content} </p>)

                      })
                    })
                  }
                }

              })
            }
          }
        })
      }
    }
    return body;
  }
  getdatereport() {
    let datereport = "";
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        let letterid = this.props.match.params.letterid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  datereport = formatDateReport(letter.datereport);
                }
              })
            }
          }
        })
      }
    }
    return datereport;
  }
  getcompactioncurves() {
    let projectid = this.props.match.params.projectid;
    let letterid = this.props.match.params.letterid;
    let compactioncurves = [];

    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  if (letter.hasOwnProperty("compactioncurves")) {
                    // eslint-disable-next-line
                    letter.compactioncurves.compactioncurve.map(compactioncurve => {
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
    let letterid = this.props.match.params.letterid;
    let compactiontests = [];

    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("letters")) {
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  if (letter.hasOwnProperty("compactiontests")) {
                    // eslint-disable-next-line
                    letter.compactiontests.compactiontest.map(compactiontest => {
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
        <div className="compactiontest-labelrow-a"> Date</div>
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

    compactiontests.push(<div className="compactiontest-labelrow-a"> {formatTimeTest(compactiontest.timetest)}</div>)
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
    compactiontests.push(<div className="compactiontest-labelrow-a"> Date</div>)

    compactiontests.push(<div className="compactiontest-labelrow-a"> Elevation</div>)
    compactiontests.push(<div className="compactiontest-labelrow-a"> Dry Density (pcf)</div>)
    compactiontests.push(<div className="compactiontest-labelrow-a"> Moisture Content %</div>)
    compactiontests.push(<div className="compactiontest-labelrow-a"> Relative Compaction</div>)
    compactiontests.push(<div className="compactiontest-labelrow-a"> Curve Number</div>)
    compactiontests.push(<div className="compactiontest-labelrow-a"> {formatTimeTest(compactiontest.timetest)}</div>)

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
    compactiontests.push(<div className="compactiontest-labelrow-c"> Date</div>)

    compactiontests.push(<div className="compactiontest-labelrow-c"> Elevation</div>)
    compactiontests.push(<div className="compactiontest-labelrow-c"> Dry Density (pcf)</div>)

    compactiontests.push(<div className="compactiontest-labelrow-c"> {formatTimeTest(compactiontest.timetest)}</div>)

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
            if (myproject.hasOwnProperty("letters")) {
              let letterid = this.props.match.params.letterid;
              // eslint-disable-next-line
              myproject.letters.letter.map(letter => {
                if (letter.letterid === letterid) {
                  if (letter.hasOwnProperty("compactiontests")) {
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
  handleLetter() {
    if (this.props.myusermodel) {
      if (this.props.myusermodel.clientid) {
        return (<div className="fieldreport-container">
    <div className="fieldreport-title">Geotechnical Report</div>
     <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
    <div className="fieldreport-row-1">{this.getengineerblock()} </div>
    <div className="fieldreport-row-1">{this.getclientblock()} </div>
    <div className="fieldreport-daterow">{this.getdatereport()}</div>
    <div className="fieldreport-daterow">{this.loadreportbody()}</div>
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
    return (this.handleLetter())
  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    activeprojectid: state.activeprojectid
  };
}
export default connect(mapStateToProps, actions)(Letter);
