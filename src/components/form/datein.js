import React, { Component } from 'react';
import './materials.css';
import './timein.css';
import { inputtimeDBoutputCalendarDaySeconds, inputDateSecActiveIDTimein, inputDateStringActiveIDTimein, inputUTCStringOutputDateString } from '../functions';
import {
    trailingzero,
    getFirstIsOn,
    check_30,
    check_29_feb_leapyear,
    check_31,
    formatDateforCalendarDisplay,
    adjustdays,
    inputDateObjDateStringNoOffset,
    inputDateObjStripTimeOutputObj,

}
from './functions';
import * as actions from '../../actions';
import { connect } from 'react-redux';
class DateIn extends Component {
    componentDidMount() {
        let dateobj = new Date();
        this.props.dateIn({ datein: inputDateObjStripTimeOutputObj(dateobj) });
        this.hideCalendar();
    }

   
    gettimeinfromeventid(eventid, projectid) {

        let timein = "";
        let timeout = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("scheduleitems")) {
                            // eslint-disable-next-line
                            myproject.scheduleitems.scheduleitem.map(item => {
                                if (item.eventid === eventid) {
                                    timein = item.timein;
                                    timeout = item.timeout;
                                }
                            })
                        }

                    }
                })

            }
        }
        return [timein, timeout];
    }
    setDay(dateencoded) {

        if (this.props.activeeventid) {
            if (this.props.activeeventid.activeeventid) {
                let eventid = this.props.activeeventid.activeeventid;
                let projectid = this.props.activeprojectid.activeprojectid;
                let times = this.gettimeinfromeventid(eventid, projectid)
                let timein = times[0];
                let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)

                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("scheduleitems")) {
                            // eslint-disable-next-line
                            myproject.scheduleitems.scheduleitem.map((item, j) => {
                                if (item.eventid === eventid) {
                                    this.props.projects[i].scheduleitems.scheduleitem[j].timein = newtimein;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })


                                }
                            })
                        }
                    }
                })
            }
            else {
                let datein = new Date(Number(dateencoded));

                this.props.dateIn({ datein })
            }
        }
        else {

            let datein = new Date(Number(dateencoded));

            this.props.dateIn({ datein })
        }

    }

    
    getvalue() {
        let value = ""

        if (this.props.activeeventid) {
            if (this.props.activeeventid.activeeventid) {
                let eventid = this.props.activeeventid.activeeventid;
                let projectid = this.props.activeprojectid.activeprojectid;
                let times = this.gettimeinfromeventid(eventid, projectid);
                let timein = times[0];
                value = inputUTCStringOutputDateString(timein)
                console.log(value)

            }

            else {
                value = this.setDayInactive()

            }

        }
        else {

            value = this.setDayInactive();
        }
        return value;
    }
    
    showdateforcalendar() {
        let datedisplay = "";
        if (this.props.activeeventid) {
            if (this.props.activeeventid.activeeventid) {
                let eventid = this.props.activeeventid.activeeventid;
                let projectid = this.props.activeprojectid.activeprojectid;
                let times = this.gettimeinfromeventid(eventid, projectid);
                let timein = times[0];
                let dateobj = new Date(`${timein.replace(/-/g, '/')}-07:00`);
                datedisplay = (this.handleshowdateforcalendar(dateobj))

            }
            else {
                if (this.props.datein) {
                    if (this.props.datein.hasOwnProperty("datein")) {
                        let dateobj = this.props.datein.datein;

                        if (Object.prototype.toString.call(dateobj) === "[object Date]") {
                            datedisplay = this.handleshowdateforcalendar(dateobj);

                        }
                    }
                }
            }
        }
        else {
            if (this.props.datein) {
                if (this.props.datein.hasOwnProperty("datein")) {
                    let dateobj = this.props.datein.datein;

                    if (Object.prototype.toString.call(dateobj) === "[object Date]") {
                        datedisplay = this.handleshowdateforcalendar(dateobj);

                    }
                }
            }
        }

        return datedisplay;

    }
    handleshowdateforcalendar(dateobj) {

        return (formatDateforCalendarDisplay(dateobj))

    }

    
    handleChange(newdate) {
        console.log(newdate)
        newdate = newdate.replace(/-/g, '/');
        let dateobj = new Date(`${newdate} 00:00:00-07:00`);
        if (this.props.activeeventid) {
            if (this.props.activeeventid.activeeventid) {
                let eventid = this.props.activeeventid.activeeventid;
                let projectid = this.props.activeprojectid.activeprojectid;
                let times = this.gettimeinfromeventid(eventid, projectid)
                let timein = times[0]
                let timeout = times[1]

                let newtimein = inputDateStringActiveIDTimein(dateobj, timein)
                let newtimeout = inputDateStringActiveIDTimein(dateobj, timeout)
                console.log(newtimein, newtimeout)
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {

                        if (myproject.hasOwnProperty("scheduleitems")) {
                            // eslint-disable-next-line
                            myproject.scheduleitems.scheduleitem.map((item, j) => {
                                if (item.eventid === eventid) {
                                    this.props.projects[i].scheduleitems.scheduleitem[j].timein = newtimein;
                                    this.props.projects[i].scheduleitems.scheduleitem[j].timeout = newtimeout;
                                    let obj = this.props.projects;
                                    this.props.reduxProjects(obj)
                                    this.setState({ render: 'render' })


                                }
                            })
                        }
                    }
                })

            }
            else {
                if (this.props.datein) {
                    if (this.props.datein.hasOwnProperty("datein")) {

                        if (Object.prototype.toString.call(dateobj) === "[object Date]") {
                            this.props.dateIn({ datein: dateobj })
                        }
                    }
                }

            }
        }
        else {
            if (this.props.datein) {
                if (this.props.datein.hasOwnProperty("datein")) {

                    if (Object.prototype.toString.call(dateobj) === "[object Date]") {
                        this.props.dateIn({ datein: dateobj })
                    }
                }
            }





        }
        this.setState({ render: 'render' });

    }

    addtimevaluestoeventid(timein, timeout, eventid, projectid) {
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {

            if (myproject.projectid === projectid) {

                if (myproject.hasOwnProperty("scheduleitems")) {
                    // eslint-disable-next-line
                    myproject.scheduleitems.scheduleitem.map((item, j) => {
                        if (item.eventid === eventid) {
                            this.props.projects[i].scheduleitems.scheduleitem[j].timein = timein;
                            this.props.projects[i].scheduleitems.scheduleitem[j].timeout = timeout;
                            let obj = this.props.projects;
                            this.props.reduxProjects(obj)
                            this.setState({ render: 'render' })


                        }
                    })
                }
            }
        })
    }

   
   
    getdateobject() {
        let dateobj = {};

        if (this.props.activeeventid) {
            let eventid = this.props.activeeventid.activeeventid;
            let projectid = this.props.activeprojectid.activeprojectid;
            // eslint-disable-next-line
            this.props.projects.map(myproject => {
                if (myproject.projectid === projectid) {

                    if (myproject.hasOwnProperty("scheduleitems")) {
                        // eslint-disable-next-line
                        myproject.scheduleitems.scheduleitem.map(item => {
                            if (item.eventid === eventid) {
                                dateobj = new Date(`${item.timein.replace(/-/g, '/')}-07:00`)
                            }
                        })
                    }
                }
            })


        }
        else {
            dateobj = this.props.datein.datein;
        }

        return dateobj;
    }

    
    
    render() {
        return (<div className="datein-container"> 
    <div className="datein-element-1a">
    Enter Date <br/> <input type="date" 
    value={this.getvalue()}
    className="project-field"
    onChange={event=>{this.handleChange(event.target.value)}}/>
    </div>
    <div className="datein-element-1b">
    <button className="datebutton"
    onClick={event=>{this.showCalender(event)}}
    id="btn-opendatemenu">
    <img alt="open menu"
    name="btnopendatemenu"
    src="https://www.egeotechnical.com/itisprojectmanagement/svg/openmenu.svg"/> 
    </button>
    <button className="datebutton" id="btn-closedatemenu">
    <img alt="close menu"
    src="https://www.egeotechnical.com/itisprojectmanagement/svg/closemenu.svg"
    name="btn-closemenu"
     onClick={event=>{this.hideCalendar(event)}}/>
    </button>
    </div>
        <div className="material-buttonrow"><button className="datebutton"
        onClick={event=>{this.yeardown(event)}}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/dateyeardown.svg" alt="year down"/> </button></div>
        <div className="material-buttonrow">
        <button className="datebutton"
        onClick={event=>{this.decreasemonth(event)}}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/datemonthdown.svg" alt="nonth down"/> </button> </div>
        <div className="material-buttonrow displaydate">{this.showdateforcalendar()} </div>
        <div className="material-buttonrow"
        onClick={event=>{this.increasemonth(event)}}><button className="datebutton"> <img src="https://www.egeotechnical.com/itisprojectmanagement/svg/datemonthup.svg" alt="month up" /></button> </div>
        <div className="material-buttonrow">
        <button className="datebutton"
        onClick={event=>{this.yearup(event)}}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/dateyearup.svg"  alt="year up"/> </button> </div>
    	
    	<div className="dateincalendar-container">
    	    <div className="calendar-grid">
			{this.showgrid()}
			</div>
		</div>
</div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid,
        datein: state.datein,
        activeeventid: state.activeeventid
    }
}

export default connect(mapStateToProps, actions)(DateIn)
