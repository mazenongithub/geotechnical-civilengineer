import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import './events.css';
import './timein.css';
import './materials.css';
import { getClient, getEngineer, SaveClientData, getProject } from '../actions/api';
import {
  UserModel,
  formatTimefromDB,
  getTimeFromDateObj,
  EventModel,
  randomString,
  ScheduleModel,
  convertTimeDBtoSec,
  convertTimeSectoString,
  createclientdata,
  engineerEvent,
  inputUTCStringOutputDateString,
  inputDateStringActiveIDTimein,
  trailingzero,
  adjustdays,
  formatDateforCalendarDisplay,
  inputDateObjDateStringNoOffset,
  check_29_feb_leapyear,
  check_30,
  check_31,
  getFirstIsOn,
  createBaseDate,
  inputtimeDBoutputCalendarDaySeconds,
  TimeDBBaseDateObj,
  inputDateSecActiveIDTimein,
  formatTimeTest,
  getTimezoneUTCString
}
  from './functions';
import { inputDateObjStripTimeOutputObj } from './form/functions';

import { saveEvent, startNewEvent, removeEvent } from './svg';
import { Link } from 'react-router-dom';
class Events extends Component {
  constructor(props) {
    super(props)
    this.state = { starttime: {}, endtime: {}, activeeventid: "", eventdetail: "", render: "", activetime: 'start', message: '', engineerid: "mazen", datein: createBaseDate() }

  }
  componentDidMount() {

    let clientid = this.props.match.params.clientid;
    let projectid = this.props.match.params.projectid;

    if (!this.props.projects) {
      if (clientid !== "gus") {
        this.getclient(clientid)
      }
      else {
        this.getproject(clientid, projectid)
      }



    }


    if (!this.props.engineers) {
      this.getengineers();
    }
    else if (!this.props.engineers.engineer.hasOwnProperty("length")) {
      this.getengineers();
    }

  }
  async getengineers() {
    let response = await getEngineer();
    console.log(response);
    if (response.hasOwnProperty("engineers")) {
      this.props.reduxEngineers(response.engineers);

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
    this.setState({ message: response.message })
  }
  async getproject(clientid, projectid) {
    let response = await getProject(clientid, projectid);
    console.log(response)
    let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
    this.props.reduxUser(myusermodel)


    if (response.hasOwnProperty("projects")) {

      this.props.reduxProjects(response.projects.project)
    }
    this.props.activeEventID({ activeeventid: "" })
    this.setState({ render: 'render' });

  }
  gettitlerow() {
    let titlerow = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {

            titlerow.push(<span>{`Project Number ${myproject.projectnumber} ${myproject.title}`} <br /></span>);
            titlerow.push(<span>{`${myproject.projectaddress} ${myproject.projectcity}`} <br /></span>);
            titlerow.push(<span>Events</span>);

          }

        })
      }
    }
    return titlerow;
  }

  getengineerfromid(engineerid) {

    let myengineer = "";
    if (this.props.engineers) {
      if (this.props.engineers.engineer) {
        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {

          if (engineer.engineerid === engineerid) {

            myengineer = `${engineer.firstname} ${engineer.lastname}`
          }
        })

      }
    }
    return myengineer;
  }
  geteventfromid(eventid) {

    let eventstring = "";
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        //eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {

              //eslint-disable-next-line
              myproject.scheduleitems.scheduleitem.map(item => {
                if (item.eventid === eventid) {


                  eventstring = `${this.getengineerfromid(item.engineerid)} ${formatTimeTest(item.timein)} ${formatTimefromDB(item.timein)}-${formatTimefromDB(item.timeout)}`

                }
              })
            }
          }
        })

      }
    }

    return (eventstring)
  }

  geteventobjfromid(eventid) {

    let event = {};

    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        //eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {

              //eslint-disable-next-line
              myproject.scheduleitems.scheduleitem.map(item => {
                if (item.eventid === eventid) {
                  event.timein = item.timein;
                  event.timeout = item.timeout;
                  event.detail = item.description;
                  event.eventid = eventid;
                  event.engineer = item.engineer;
                }
              })
            }
          }
        })
      }
    }
    return event;
  }
  handleevent(eventid) {


    this.setState({ activeeventid: eventid });
  }
  showevents() {
    let events = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        //eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("events")) {
              //eslint-disable-next-line
              myproject.events.event.map(myevent => {

                events.push(<div className="event-titlerow">
                  <div className="eventid-container">
                    <div onClick={event => { this.handleevent(myevent.eventid) }} className="findevent-container">
                      EventID {myevent.eventid} {this.geteventfromid(myevent.eventid)} </div>
                    <div className="removeevent-container"><button className="btn-removeevent" onClick={event => { this.removeevent(myevent.eventid) }}> {removeEvent()} </button></div>
                  </div>
                </div>)
              })
            }
          }
        })
      }
    }
    return (events)
  }
  removeevent(eventid) {
    if (window.confirm('Are you sure you want to delete the event?') === true) {
      if (this.props.projects) {
        if (this.props.projects.hasOwnProperty("length")) {
          let projectid = this.props.match.params.projectid;
          // eslint-disable-next-line
          this.props.projects.map((myproject, i) => {
            if (myproject.projectid === projectid) {
              if (myproject.hasOwnProperty("scheduleitems")) {
                // eslint-disable-next-line
                myproject.scheduleitems.scheduleitem.map((item, j) => {
                  if (item.eventid === eventid) {
                    this.props.projects[i].scheduleitems.scheduleitem.splice(j, 1)


                  }
                })
              }

              if (myproject.hasOwnProperty("events")) {
                // eslint-disable-next-line
                myproject.events.event.map((event, k) => {
                  if (event.eventid === eventid) {
                    this.props.projects[i].events.event.splice(k, 1)
                  }
                })
              }


            }
          })
        }
      }
      if (this.props.engineers) {
        if (this.props.engineers.engineer) {
          let engineerid = this.state.engineerid;
          // eslint-disable-next-line
          this.props.engineers.engineer.map((engineer, i) => {
            if (engineer.engineerid === engineerid) {
              if (engineer.hasOwnProperty("scheduleitems")) {
                // eslint-disable-next-line
                engineer.scheduleitems.scheduleitem.map((item, j) => {
                  if (item.eventid === eventid) {
                    this.props.engineers.engineer[i].scheduleitems.scheduleitem.splice(j, 1);
                    let obj = this.props.engineers;
                    this.props.reduxEngineers(obj)
                  }
                })
              }
            }

          })
        }
      }
      this.setState({ activeeventid: "" })
      this.saveclient()
    }
  }
  getdatemessage() {

    let datemessage = "";
    let dateobj = {};
    if (this.state.activeeventid) {
      let times = this.gettimeinfromeventid(this.state.activeeventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein);
      dateobj = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`)
    }
    else {
      dateobj = this.state.datein;
    }

    let month = dateobj.getMonth();
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();

    switch (month) {
      case 0:
        datemessage += "January";
        break;
      case 1:
        datemessage += "February";
        break;
      case 2:
        datemessage += "March";
        break;
      case 3:
        datemessage += "April";
        break;
      case 4:
        datemessage += "May";
        break;
      case 5:
        datemessage += "June";
        break;
      case 6:
        datemessage += "July";
        break;
      case 7:
        datemessage += "August";
        break;
      case 8:
        datemessage += "September";
        break;
      case 9:
        datemessage += "October";
        break;
      case 10:
        datemessage += "November";
        break;
      case 11:
        datemessage += "December";
        break;
      default:
        break;
    }
    datemessage = `On ${datemessage} ${day}, ${year} The available time slots are `



    if (this.state.activeeventid) {
      datemessage = ` The active Event is ${this.state.activeeventid}. You are updating the event. ${datemessage}`
    }

    return datemessage;
  }
  getstartactivetime() {
    if (this.state.activetime === "start") {
      return ("activetime-container")
    }
    else {
      return ("")
    }
  }
  activestarttime(event) {
    this.setState({ activetime: "start" })
  }
  activeendtime(event) {
    this.setState({ activetime: "end" })
  }
  getendactivetime() {
    if (this.state.activetime === "end") {
      return ("activetime-container")
    }
    else {
      return ("")
    }

  }
  handlestarttime() {
    return (<div className={`starttime-container ${this.getstartactivetime()}`} onClick={event => { this.activestarttime(event) }}>Please Select A Start Time </div>)
  }
  handleendtime() {
    return (<div className={`starttime-container ${this.getendactivetime()}`} onClick={event => { this.activeendtime(event) }}>Please Select An End Time </div>)
  }
  createnewbutton() {
    if (this.state.activeeventid) {

      return (<div className="event-titlerow"><button className="button-events" onClick={event => this.cleareventid()}>{startNewEvent()} </button></div>)
    }
    else {
      return (<span> &nbsp;</span>)
    }

  }
  cleareventid() {


    this.setState({ activeeventid: "", eventdetail: "", activetime: "start", datein: inputDateObjStripTimeOutputObj(new Date()) })
  }
  gettimeinfromeventid(eventid) {

    let projectid = this.props.match.params.projectid;
    let times = [];

    if (this.props.projects.hasOwnProperty("length")) {
      // eslint-disable-next-line
      this.props.projects.map(myproject => {
        if (myproject.projectid === projectid) {

          if (myproject.hasOwnProperty("scheduleitems")) {
            // eslint-disable-next-line
            myproject.scheduleitems.scheduleitem.map(item => {
              if (item.eventid === eventid) {

                times[0] = item.timein;
                times[1] = item.timeout;

              }
            })
          }

        }
      })

    }

    return (times);
  }
  showtime() {
    let showminutes = [];

    if (this.state.activeeventid) {


      let times = this.gettimeinfromeventid(this.state.activeeventid);
      let timein = times[0];
      let dateobj = TimeDBBaseDateObj(timein)

      showminutes.push(this.handleshowtime(dateobj))
    }
    else {
      if (this.state.datein) {
        let dateobj = this.state.datein;
        showminutes.push(this.handleshowtime(dateobj))
      }
    }


    return showminutes;
  }
  setDay(dateencoded) {


    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let projectid = this.props.match.params.projectid;
      let times = this.gettimeinfromeventid(eventid, projectid)
      let timein = times[0];
      let timeout = times[1];
      let newtimein = inputDateSecActiveIDTimein(dateencoded, timein)
      let newtimeout = inputDateSecActiveIDTimein(dateencoded, timeout)
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



              }
            })
          }
        }
      })
      if (this.props.engineers) {
        if (this.props.engineers.engineer.hasOwnProperty("length")) {
          let engineerid = this.state.engineerid;
          // eslint-disable-next-line
          this.props.engineers.engineer.map((engineer, i) => {
            if (engineer.engineerid === engineerid) {
              if (engineer.hasOwnProperty("scheduleitems")) {
                // eslint-disable-next-line
                engineer.scheduleitems.scheduleitem.map((item, j) => {
                  if (item.eventid === eventid) {
                    this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timein = newtimein;
                    this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timeout = newtimeout;
                  }
                })
              }
            }
          })
        }
      }
      this.setState({ render: 'render' })
    }
    else {
      let datein = new Date(Number(dateencoded));

      this.setState({ datein })
    }


  }
  handleshowtime(mydate) {
    let showtime = [];

    let am_6 = mydate.getTime() + (6 * 1000 * 60 * 60);
    let pm_6 = mydate.getTime() + (18 * 1000 * 60 * 60);
    let increment = (1 * 1000 * 60 * 60);
    for (let i = am_6; i < pm_6;) {

      showtime.push(<div className="eventtime-container">{this.showminutes(i)}</div>)

      i = i + increment;
    }



    return showtime;

  }
  getminuteclass(j) {
    let minuteclass = "event-minute-container";


    if (this.props.engineers) {

      let engineerid = this.state.engineerid;
      if (this.props.engineers.engineer) {

        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {
          if (engineer.engineerid === engineerid) {
            if (engineer.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              engineer.scheduleitems.scheduleitem.map(item => {
                let timeinentry = convertTimeDBtoSec(item.timein)

                let timeoutentry = convertTimeDBtoSec(item.timeout)

                if ((timeinentry <= j && timeoutentry >= j) || timeinentry === j || timeoutentry === j) {
                  minuteclass = "event-minute-container-reserved"
                }
              })
            }
          }
        })
      }
    }



    return minuteclass;
  }
  getvalue() {
    let value = ""
    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      value = inputUTCStringOutputDateString(timein)

    }



    else {
      value = this.setDayInactive()

    }


    return value;
  }
  handleChange(newdate) {

    newdate = newdate.replace(/-/g, '/');
    let basetime = `${newdate} 00:00:00`
    let offsetfactor = getTimezoneUTCString(basetime);
    let dateobj = new Date(`${newdate} 00:00:00-${offsetfactor}`);

    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let projectid = this.props.match.params.projectid
      let times = this.gettimeinfromeventid(eventid)

      let timein = times[0]
      let timeout = times[1]

      let newtimein = inputDateStringActiveIDTimein(dateobj, timein)
      let newtimeout = inputDateStringActiveIDTimein(dateobj, timeout)

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
      if (this.props.engineers) {
        if (this.props.engineers.engineer.hasOwnProperty("length")) {
          let engineerid = this.state.engineerid;
          // eslint-disable-next-line
          this.props.engineers.engineer.map((engineer, i) => {
            if (engineer.engineerid === engineerid) {
              if (engineer.hasOwnProperty("scheduleitems")) {
                // eslint-disable-next-line
                engineer.scheduleitems.scheduleitem.map((item, j) => {
                  if (item.eventid === eventid) {
                    this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timein = newtimein;
                    this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timeout = newtimeout;
                  }
                })
              }
            }
          })
        }
      }

    }
    else {

      this.setState({ datein: dateobj })

    }

  }
  showCalender(event) {

    let class_1 = "material-buttonrow"
    let class_2 = "dateincalendar-container"

    let row_1 = document.getElementsByClassName(class_1);
    for (let i = 0; i < row_1.length; i++) {
      row_1[i].classList.remove("hidden");
    }
    let row_2 = document.getElementsByClassName(class_2);
    for (let i = 0; i < row_2.length; i++) {
      row_2[i].classList.remove("hidden");
    }
    let closemenu = document.getElementById("btn-closedatemenu");
    if (closemenu) {
      closemenu.classList.remove("hidden");
    }
    let openmenu = document.getElementById("btn-opendatemenu");
    if (openmenu) {
      openmenu.classList.add("hidden");
    }
  }
  hideCalendar(event) {

    let class_1 = "material-buttonrow"
    let class_2 = "dateincalendar-container"
    let row_1 = document.getElementsByClassName(class_1);
    for (let i = 0; i < row_1.length; i++) {
      row_1[i].classList.add("hidden");
    }
    let row_2 = document.getElementsByClassName(class_2);
    for (let i = 0; i < row_2.length; i++) {
      row_2[i].classList.add("hidden");
    }
    let closemenu = document.getElementById("btn-closedatemenu");
    if (closemenu) {
      closemenu.classList.add("hidden");
    }
    let openmenu = document.getElementById("btn-opendatemenu");
    if (openmenu) {
      openmenu.classList.remove("hidden");
    }
  }

  yeardown(event) {

    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;

      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein);
      let datein = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`);


      let yearin = datein.getFullYear();
      let newyearin = yearin - 1;

      let monthin = datein.getMonth() + 1;
      if (monthin < 10) {
        monthin = `0${monthin}`
      }
      let monthout = datein.getMonth() + 1;
      if (monthout < 10) {
        monthout = `0${monthout}`
      }
      let dayin = datein.getDate();
      if (dayin < 10) {
        dayin = `0${dayin}`
      }


      let newday = `${newyearin}-${monthin}-${dayin}`;
      this.handleChange(newday)


    }
    else {


      this.handleyeardown()

    }


  }
  handleyeardown() {

    if (this.state.datein) {

      let dateobj = this.state.datein



      let year = dateobj.getFullYear() - 1;
      let month = dateobj.getMonth() + 1;
      let day = dateobj.getDate();

      month = trailingzero(month);
      day = trailingzero(day);


      let hours = dateobj.getHours();
      hours = trailingzero(hours);
      let minutes = dateobj.getMinutes();
      minutes = trailingzero(minutes);
      let baseoffset = `${year}/${month}/${day} ${hours}:${minutes}:00`
      let offsetfactor = getTimezoneUTCString(baseoffset)
      let timestring = `${year}/${month}/${day} ${hours}:${minutes}:00-${offsetfactor}`;
      let datein = new Date(timestring);

      this.setState({ datein });

    }

  }

  yearup(event) {

    if (this.props.activeeventid) {
      if (this.state.activeeventid) {
        let eventid = this.state.activeeventid;

        let times = this.gettimeinfromeventid(eventid);
        let timein = times[0];
        let offsetfactor = getTimezoneUTCString(timein)
        let datein = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`);


        let yearin = datein.getFullYear();
        let newyearin = yearin + 1;

        let monthin = datein.getMonth() + 1;
        if (monthin < 10) {
          monthin = `0${monthin}`
        }
        let monthout = datein.getMonth() + 1;
        if (monthout < 10) {
          monthout = `0${monthout}`
        }
        let dayin = datein.getDate();
        if (dayin < 10) {
          dayin = `0${dayin}`
        }


        let newday = `${newyearin}-${monthin}-${dayin}`;
        this.handleChange(newday)
      }
      else {


        this.handleyearup()

      }
    }
    else {


      this.handleyearup()

    }
  }

  handleyearup() {

    if (this.state.datein.hasOwnProperty("datein")) {
      let dateobj = this.state.datein;


      let year = dateobj.getFullYear() + 1;
      let month = dateobj.getMonth() + 1;
      let day = dateobj.getDate();

      month = trailingzero(month);
      day = trailingzero(day);


      let hours = dateobj.getHours();
      hours = trailingzero(hours);
      let minutes = dateobj.getMinutes();
      minutes = trailingzero(minutes);
      let baseoffset = `${year}/${month}/${day} ${hours}:${minutes}:00`
      let offsetfactor = getTimezoneUTCString(baseoffset)
      let timestring = `${year}/${month}/${day} ${hours}:${minutes}:00-${offsetfactor}`;
      let datein = new Date(timestring);

      this.setState({ datein });

    }



  }
  decreasemonth(event) {

    if (this.state.activeeventid) {

      let eventid = this.state.activeeventid;

      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein)
      let datein = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`);


      let yearin = datein.getFullYear();


      let monthin = datein.getMonth();
      if (monthin === 0) {
        monthin = 12;
        yearin = yearin - 1;
      }
      // decrease month by one
      let monthout = datein.getMonth()
      if (monthout < 10) {
        monthout = `0${monthout}`
      }
      let dayin = datein.getDate();
      if (dayin < 10) {
        dayin = `0${dayin}`
      }


      let newday = `${yearin}-${monthin}-${dayin}`;
      this.handleChange(newday)



    }
    else {


      this.handledecreasemonth()

    }
  }
  handledecreasemonth() {

    if (this.state.datein.hasOwnProperty("datein")) {
      let dateobj = this.state.datein;

      if (Object.prototype.toString.call(dateobj) === "[object Date]") {
        let year = dateobj.getFullYear();

        let month = dateobj.getMonth()
        let day = dateobj.getDate();
        let hours = dateobj.getHours();
        let minutes = dateobj.getMinutes();
        //gets the current month/decreases by one
        if (month === 0) {
          //december year previous
          month = 12;
          year = year - 1;

        }
        else {
          day = adjustdays(month - 1, day, year);
          month = trailingzero(month);
        }

        day = trailingzero(day);
        hours = trailingzero(hours);
        minutes = trailingzero(minutes);
        month = trailingzero(month)
        let baseoffset = `${year}/${month}/${day} ${hours}:${minutes}:00`
        let offsetfactor = getTimezoneUTCString(baseoffset)
        let timestring = `${year}/${month}/${day} ${hours}:${minutes}:00-${offsetfactor}`;

        let datein = new Date(timestring);

        this.setState({ datein });
      }
    }

  }
  increasemonth(event) {

    if (this.state.activeeventid) {

      let eventid = this.state.activeeventid;

      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein)
      let datein = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`);


      let yearin = datein.getFullYear();

      // increases month
      let newmonthin = datein.getMonth();
      if (newmonthin === 11) {
        newmonthin = 1;
        yearin = yearin + 1;
      }
      else {
        newmonthin = newmonthin + 2;
      }
      if (newmonthin < 10) {
        newmonthin = `0${newmonthin}`
      }
      // decrease month by one
      let monthout = datein.getMonth()
      if (monthout < 10) {
        monthout = `0${monthout}`
      }
      let dayin = datein.getDate();
      if (dayin < 10) {
        dayin = `0${dayin}`
      }


      let newday = `${yearin}-${newmonthin}-${dayin}`;
      this.handleChange(newday)


    }
    else {


      this.handleincreasemonth()

    }

  }
  showgrid() {

    let showgrid = [];
    if (this.state.activeeventid) {

      let eventid = this.state.activeeventid;

      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein)
      let datein = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`)
      showgrid.push(this.showgridcalender(datein))

    }
    else {
      if (this.state.datein) {

        let datein = this.state.datein;
        showgrid.push(this.showgridcalender(datein))
      }
    }

    return showgrid;
  }
  handleincreasemonth() {
    if (this.state.datein) {

      let dateobj = this.state.datein;

      if (Object.prototype.toString.call(dateobj) === "[object Date]") {
        let year = dateobj.getFullYear();
        let day = dateobj.getDate();
        let hours = dateobj.getHours();
        let minutes = dateobj.getMinutes();
        //gets the current month and increases it by one
        let month = (dateobj.getMonth())
        if (month === 11) {
          month = 1;
          year = year + 1;
        }
        else {
          //adjust for calc
          month = month + 1;
          day = adjustdays(month, day, year);
          month = month + 1;
        }
        //adjust for string
        month = trailingzero(month);
        day = trailingzero(day);
        hours = trailingzero(hours);
        minutes = trailingzero(minutes);
        let timestring = `${year}/${month}/${day} ${hours}:${minutes}`;

        let datein = new Date(timestring);

        this.setState({ datein });
      }
    }

  }
  showdateforcalendar() {

    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let offsetfactor = getTimezoneUTCString(timein)
      return (formatDateforCalendarDisplay(new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`)))
    }
    else

      return (formatDateforCalendarDisplay(this.state.datein))


  }
  DateIn() {
    return (<div className="datein-container">
      <div className="datein-element-1a">
        Enter Date <br /> <input type="date"
          value={this.getvalue()}
          className="project-field"
          onChange={event => { this.handleChange(event.target.value) }} />
      </div>
      <div className="datein-element-1b">
        <button className="datebutton"
          onClick={event => { this.showCalender(event) }}
          id="btn-opendatemenu">
          <img alt="open menu"
            name="btnopendatemenu"
            src="https://www.egeotechnical.com/itisprojectmanagement/svg/openmenu.svg" />
        </button>
        <button className="datebutton" id="btn-closedatemenu">
          <img alt="close menu"
            src="https://www.egeotechnical.com/itisprojectmanagement/svg/closemenu.svg"
            name="btn-closemenu"
            onClick={event => { this.hideCalendar(event) }} />
        </button>
      </div>
      <div className="material-buttonrow"><button className="datebutton"
        onClick={event => { this.yeardown(event) }}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/dateyeardown.svg" alt="year down" /> </button></div>
      <div className="material-buttonrow">
        <button className="datebutton"
          onClick={event => { this.decreasemonth(event) }}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/datemonthdown.svg" alt="nonth down" /> </button> </div>
      <div className="material-buttonrow displaydate">{this.showdateforcalendar()} </div>
      <div className="material-buttonrow"
        onClick={event => { this.increasemonth(event) }}><button className="datebutton"> <img src="https://www.egeotechnical.com/itisprojectmanagement/svg/datemonthup.svg" alt="month up" /></button> </div>
      <div className="material-buttonrow">
        <button className="datebutton"
          onClick={event => { this.yearup(event) }}><img src="https://www.egeotechnical.com/itisprojectmanagement/svg/dateyearup.svg" alt="year up" /> </button> </div>

      <div className="dateincalendar-container">
        <div className="calendar-grid">
          {this.showgrid()}
        </div>
      </div>
    </div>)
  }
  activeeventidsettime(timeinsec) {
    let eventid = this.state.activeeventid;
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              myproject.scheduleitems.scheduleitem.map((item, j) => {
                if (item.eventid === eventid) {
                  if (this.state.activetime === "start") {
                    let timeout = this.props.projects[i].scheduleitems.scheduleitem[j].timeout;
                    if (timeout) {
                      timeout = convertTimeDBtoSec(timeout)
                    }

                    if (timeout < timeinsec) {
                      this.setState({ message: 'Start Time Should be less than End Time' })
                    }
                    else {
                      this.props.projects[i].scheduleitems.scheduleitem[j].timein = convertTimeSectoString(timeinsec);


                    }

                  }
                  else if (this.state.activetime === "end") {
                    let timein = this.props.projects[i].scheduleitems.scheduleitem[j].timein;
                    timein = convertTimeDBtoSec(timein)
                    if (timein < timeinsec) {
                      this.props.projects[i].scheduleitems.scheduleitem[j].timeout = convertTimeSectoString(timeinsec);

                    }
                    else {
                      this.setState({ message: 'End Time should be greater than Start Time' })
                    }

                  }

                }
              })
            }
          }
        })
      }
    }

    if (this.props.engineers) {
      if (this.props.engineers.engineer) {
        let engineerid = this.state.engineerid;
        // eslint-disable-next-line
        this.props.engineers.engineer.map((engineer, i) => {
          if (engineer.engineerid === engineerid) {
            if (engineer.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              engineer.scheduleitems.scheduleitem.map((item, j) => {
                if (item.eventid === eventid) {
                  if (this.state.activetime === "start") {

                    let timeout = convertTimeDBtoSec(item.timeout)
                    if (timeout > timeinsec) {

                      this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timein = convertTimeSectoString(timeinsec);
                      let obj = this.props.engineers;
                      this.props.reduxEngineers(obj)

                    }


                  }
                  else if (this.state.activetime === "end") {
                    let timein = convertTimeDBtoSec(item.timein)

                    if (timein < timeinsec) {
                      this.props.engineers.engineer[i].scheduleitems.scheduleitem[j].timeout = convertTimeSectoString(timeinsec);
                      let obj = this.props.engineers;
                      this.props.reduxEngineers(obj)
                    }


                  }

                }
              })
            }

          }
        })


      }
    }

    this.setState({ render: 'render' })

  }
  settimeintervalnew(timeinsec) {

    let eventid = randomString(4)

    let itemid = randomString(5);
    let engineerid = this.state.engineerid;
    let engineer = this.getengineer(engineerid)

    let myevent = {};
    let schedulemodel = {};
    let engineerevent = {}
    let projectid = this.props.match.params.projectid;
    if (this.state.activetime === "start") {
      engineerevent = engineerEvent(itemid, eventid, convertTimeSectoString(timeinsec), "")
      myevent = EventModel(eventid,
        convertTimeSectoString(timeinsec),
        "",
        "",
        `${engineer.firstname} ${engineer.lastname}`)
      schedulemodel = ScheduleModel(itemid,
        projectid,
        engineerid,
        `${engineer.firstname} ${engineer.lastname}`,
        "",
        engineer.rate,
        convertTimeSectoString(timeinsec),
        convertTimeSectoString(timeinsec),
        eventid)

    }
    else if (this.state.activetime === "end") {
      engineerevent = engineerEvent(itemid, eventid, "", convertTimeSectoString(timeinsec))
      myevent = EventModel(eventid,
        "",
        convertTimeSectoString(timeinsec),
        "",
        `${engineer.firstname} ${engineer.lastname}`)
      schedulemodel = ScheduleModel(itemid,
        projectid,
        engineerid,
        `${engineer.firstname} ${engineer.lastname}`,
        "",
        engineer.rate,
        convertTimeSectoString(timeinsec),
        convertTimeSectoString(timeinsec),
        eventid)

    }
    if (this.props.engineers) {

      if (this.props.engineers.engineer) {

        // eslint-disable-next-line
        this.props.engineers.engineer.map((engineer, i) => {
          if (engineer.engineerid === engineerid) {
            if (engineer.hasOwnProperty("scheduleitems")) {

              this.props.engineers.engineer[i].scheduleitems.scheduleitem.push(engineerevent)
              let obj = this.props.engineers;
              this.props.reduxEngineers(obj)
            }
            else {
              this.props.engineers.engineer[i].scheduleitems = { scheduleitem: [engineerevent] }
              let obj = this.props.engineers;
              this.props.reduxEngineers(obj)
            }
          }
        })
      }
    }

    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {
              this.props.projects[i].scheduleitems.scheduleitem.push(schedulemodel)
            }
            else {

              let scheduleitem = [];
              let scheduleitems = {};
              scheduleitem.push(schedulemodel);
              scheduleitems = { scheduleitem }
              this.props.projects[i].scheduleitems = scheduleitems;
            }

            if (myproject.hasOwnProperty("events")) {
              this.props.projects[i].events.event.push(myevent)
            }
            else {
              let events = {};
              let event = [];
              event.push(myevent)
              events = { event }
              this.props.projects[i].events = events;
            }
          }
        })
      }
    }
    if (this.state.activetime === "start") {
      this.setState({ activeeventid: eventid, activetime: "end" })
    }
    else if (this.state.activetime === "end") {
      this.setState({ activeeventid: eventid, activetime: "start" })
    }


  }
  settimeinterval(timeinsec) {

    if (this.state.activeeventid) {
      this.activeeventidsettime(timeinsec)
    }
    else {
      this.settimeintervalnew(timeinsec)
    }

  }
  showminutes(i) {

    let showminutes = [];
    let minutes_0 = i;

    let minutes_60 = i + (1000 * 60 * 60);

    let increment_15 = (1000 * 60 * 15)

    for (let j = minutes_0; j < minutes_60;) {

      showminutes.push(this.handleshowminutes(j))
      j = j + increment_15;
    }
    return showminutes;
  }
  getlinktoprojects() {
    let clientid = this.props.match.params.clientid;
    let projectid = this.props.match.params.projectid;
    return (`/${clientid}/projects/${projectid}`)
  }
  checkbooked(j) {

    // check if its active event
    let checkbooked = false;
    if (this.props.engineers) {
      if (this.props.engineers.engineer) {
        let engineerid = this.state.engineerid;
        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {
          if (engineer.engineerid === engineerid) {
            if (engineer.hasOwnProperty("scheduleitems")) {
              // eslint-disable-next-line
              engineer.scheduleitems.scheduleitem.map(item => {
                let offsetfactor = getTimezoneUTCString(item.timein)
                let timeinsec = new Date(`${item.timein.replace(/-/g, '/')}-${offsetfactor}`).getTime();
                let timeoutsec = new Date(`${item.timeout.replace(/-/g, '/')}-${offsetfactor}`).getTime();
                if (timeinsec <= j && timeoutsec >= j) {
                  checkbooked = true;
                }

              })
            }
          }
        })
      }
    }


    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let times = this.gettimeinfromeventid(eventid);
      let timein = times[0];
      let timeout = times[1];
      let offsetfactor = getTimezoneUTCString(timein);
      let timeinsec = new Date(`${timein.replace(/-/g, '/')}-${offsetfactor}`).getTime();
      let timeoutsec = new Date(`${timeout.replace(/-/g, '/')}-${offsetfactor}`).getTime();

      if (timeinsec <= j && timeoutsec >= j) {
        checkbooked = false;
      }
    }
    return checkbooked;
  }
  handleshowminutes(j) {
    let now = new Date().getTime();
    let status = "";
    if (!this.state.activeeventid) {

      if (j > now && !this.checkbooked(j)) {
        status = "available";
      }
      else if (j > now && this.checkbooked(j)) {
        status = "not-available"
      }
      else if (j < now) {
        status = "expired"
      }


    }
    else {


      if (j > now && !this.checkbooked(j)) {
        status = "available";
      }
      else if (j < now && !this.checkbooked(j)) {
        status = "available"
      }
      else if (j > now && this.checkbooked(j)) {
        status = "not-available"
      }
      else
        if (j < now) {
          status = "expired"
        }

    }



    switch (status) {
      case "available":
        return (<div
          key={j} id={j}
          className={`${this.getminuteclass(j)}`}
          onClick={event => { this.settimeinterval(event.target.id) }}>{getTimeFromDateObj(new Date(j))} </div>)
      case "expired":
        return (<div className="minutes-expired"> Expired - {getTimeFromDateObj(new Date(j))}  </div>)
      case "previous-event":
        return (<div className="minutes-expired"> Previous Event - {getTimeFromDateObj(new Date(j))}  </div>)
      case "not-available":
        return (<div className="minutes-expired">Not-Available  {getTimeFromDateObj(new Date(j))} </div>)
      default:
        break;

    }

  }
  geteventdetail() {
    let detail = "";

    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      let event = this.geteventobjfromid(eventid)
      detail = event.detail;
    }
    else {
      detail = this.state.eventdetail;
    }

    return detail;
  }
  handleeventdetail(detail) {

    if (this.state.activeeventid) {
      let eventid = this.state.activeeventid;
      if (this.props.projects) {
        if (this.props.projects.hasOwnProperty("length")) {
          let projectid = this.props.match.params.projectid;
          // eslint-disable-next-line
          this.props.projects.map((myproject, i) => {
            if (myproject.projectid === projectid) {
              if (myproject.hasOwnProperty("scheduleitems")) {
                // eslint-disable-next-line
                myproject.scheduleitems.scheduleitem.map((item, j) => {
                  if (item.eventid === eventid) {
                    this.props.projects[i].scheduleitems.scheduleitem[j].description = detail;
                    this.setState({ render: 'render' })
                  }
                })
              }
            }
          })
        }
      }



    }
    else {
      this.neweventfromdescription(detail)
    }
  }
  neweventfromdescription(detail) {
    let eventid = randomString(4);
    //this.state.engineer
    let engineerid = this.state.engineerid;
    let engineer = this.getengineer(engineerid);
    let myevent = EventModel(eventid,
      "",
      "",
      detail,
      `${engineer.firstname} ${engineer.lastname}`);
    let itemid = randomString(8);
    let projectid = this.props.match.params.projectid;
    let schedulemodel = ScheduleModel(itemid,
      projectid,
      engineerid,
      `${engineer.firstname} ${engineer.lastname}`,
      detail,
      engineer.rate,
      "",
      "",
      eventid)
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {
            if (myproject.hasOwnProperty("scheduleitems")) {

              this.props.projects[i].scheduleitems.scheduleitem.push(schedulemodel)
            }
            else {

              let scheduleitem = [];
              scheduleitem.push(schedulemodel);
              this.props.projects[i].scheduleitems.scheduleitem = scheduleitem;
            }

            if (myproject.hasOwnProperty("events")) {
              this.props.projects[i].events.event.push(myevent)
            }
            else {

              let newevent = [];
              newevent.push(myevent)
              this.props.projects[i].events.event = newevent;
            }
          }
        })
      }
    }
    this.props.activeEventID({ activeeventid: eventid })
    this.setState({ eventdetail: detail })
  }
  getengineer(engineerid) {

    let myengineer = {};
    if (this.props.engineers) {
      if (this.props.engineers.engineer.hasOwnProperty("length")) {
        //eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {
          if (engineer.engineerid === engineerid) {
            myengineer = engineer;
            myengineer.rate = this.getcumulativerate(engineerid);
          }
        })
      }
    }
    return myengineer;
  }
  getcumulativerate(engineerid) {

    let cumlativerate = 0;

    if (this.props.engineers) {
      if (this.props.engineers.engineer.hasOwnProperty("length")) {

        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {
          if (engineer.engineerid === engineerid) {

            if (engineer.hasOwnProperty("benefits")) {
              // eslint-disable-next-line
              engineer.benefits.benefit.map(benefit => {
                cumlativerate += this.costperhour(engineerid, benefit.type, benefit.amount, benefit.unit)



              })
            }
          }
        })

      }
    }



    return cumlativerate;

  }
  costperhour(engineerid, type, amount, unit) {

    let costperhour = "";
    amount = Number(amount)
    let salary = 0;
    let workinghours = 0;
    let hourlyrate = 0;
    if (this.props.engineers) {
      if (this.props.engineers.engineer.hasOwnProperty("length")) {

        // eslint-disable-next-line
        this.props.engineers.engineer.map(engineer => {
          if (engineer.engineerid === engineerid) {
            workinghours = Number(engineer.workinghours)
            if (engineer.hasOwnProperty("benefits")) {
              // eslint-disable-next-line
              engineer.benefits.benefit.map(benefit => {
                if (benefit.type === "Salary") {
                  salary = Number(benefit.amount);
                  hourlyrate += salary / workinghours;

                }

              })
            }
          }
        })

      }
    }

    if (type === "Salary" || "Benefit") {
      costperhour = amount / (workinghours)
    }
    if (type === "Fringe") {

      costperhour = (hourlyrate * amount * 8) / workinghours;
    }

    return costperhour;

  }
  async saveclient() {
    let clientid = this.props.match.params.clientid;
    let firstname = "";
    let lastname = "";
    let company = "";
    let address = "";
    let city = "";
    let contactstate = "";
    let zipcode = "";
    let email = "";
    let gender = "";
    if (this.props.myusermodel) {

      firstname = this.props.myusermodel.firstname;
      lastname = this.props.myusermodel.lastname;
      company = this.props.myusermodel.company;
      address = this.props.myusermodel.address;
      city = this.props.myusermodel.city;
      contactstate = this.props.myusermodel.contactstate;
      zipcode = this.props.myusermodel.zipcode;
      email = this.props.myusermodel.email;
      gender = this.props.myusermodel.gender;
    }
    let project = [];
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {

        let projectid = this.props.match.params.projectid;
        // eslint-disable-next-line
        this.props.projects.map(myproject => {
          if (myproject.projectid === projectid) {
            project.push(myproject);
          }
        })

      }
    }

    let values = createclientdata(clientid, gender, firstname, lastname, company, address, city, contactstate, zipcode, email, project)

    let response = await SaveClientData(clientid, values);
    console.log(response)
    if (response.hasOwnProperty("message")) {
      this.setState({ message: response.message, activetime: "start" })
    }
    if (response.hasOwnProperty("engineers")) {
      this.props.reduxEngineers(response.engineers);

    }

    if (response.hasOwnProperty("projects")) {
      let projectid = this.props.match.params.projectid;
      if (this.props.projects) {
        // eslint-disable-next-line
        this.props.projects.map((myproject, i) => {
          if (myproject.projectid === projectid) {


            this.props.projects[i] = response.projects.project[0];
            let obj = this.props.projects;
            this.props.reduxProjects(obj)
          }
        })
      }
    }


  }
  setDayInactive() {
    let value = "";
    if (this.state.hasOwnProperty("datein")) {
      let dateobj = this.state.datein;


      value = inputDateObjDateStringNoOffset(dateobj);

    }



    return value;
  }
  getactivedate(dateencoded) {

    let activedate = "";
    let timein = "";

    if (this.state.activeeventid) {

      let eventid = this.state.activeeventid

      let times = this.gettimeinfromeventid(eventid);

      timein = times[0];

      if (timein) {
        timein = inputtimeDBoutputCalendarDaySeconds(timein)
      }




    }
    else {

      timein = this.state.datein.getTime();

    }


    if (timein === dateencoded) {

      activedate = "active-calendar";
    }



    return activedate;


  }
  showdate(dateobj, day) {

    let showday = [];
    if (day) {
      let month = dateobj.getMonth() + 1;
      month = trailingzero(month)
      let year = dateobj.getFullYear();


      let dayzero = trailingzero(day);
      let baseoffset = `${year}/${month}/${dayzero} 00:00:00`;
      let offsetfactor = getTimezoneUTCString(baseoffset)
      let timestring = `${year}/${month}/${dayzero} 00:00:00-${offsetfactor}`;

      let calendardate = new Date(timestring);

      let dateencoded = calendardate.getTime();

      showday.push(<div
        className={`${this.getactivedate(dateencoded)} calendar-date`}
        onClick={event => { this.setDay(dateencoded) }}
      > {day}</div>)
    }
    return showday;
  }


  showgridcalender(datein) {

    let gridcalender = [];
    let firstison = getFirstIsOn(datein);
    let days = [];
    let numberofcells = 49;
    for (let i = 1; i < numberofcells + 1; i++) {
      days.push(i);
    }
    // eslint-disable-next-line
    days.map((day, i) => {
      if (i === 0) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Mon
							</div>)
      }
      else if (i === 1) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Tues
							</div>)
      }
      else if (i === 2) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Weds
							</div>)
      }
      else if (i === 3) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Thurs
							</div>)
      }
      else if (i === 4) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Fri
							</div>)
      }
      else if (i === 5) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Sat
							</div>)
      }
      else if (i === 6) {
        gridcalender.push(<div className="calendar-element daydisplay">
          Sun
							</div>)
      }
      else if (i === 7) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}&nbsp;
							</div>)

      }
      else if (i === 8) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 2);
            break;
          case "Tues":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }

      else if (i === 9) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 3);
            break;
          case "Tues":
            display = this.showdate(datein, 2);
            break;
          case "Weds":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)

      }
      else if (i === 10) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 4);
            break;
          case "Tues":
            display = this.showdate(datein, 3);
            break;
          case "Weds":
            display = this.showdate(datein, 2);
            break;
          case "Thurs":
            display = this.showdate(datein, 1);
            break;
          default:
            break
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)


      }
      else if (i === 11) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 5);
            break;
          case "Tues":
            display = this.showdate(datein, 4);
            break;
          case "Weds":
            display = this.showdate(datein, 3);
            break;
          case "Thurs":
            display = this.showdate(datein, 2);
            break;
          case "Fri":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)

      }
      else if (i === 12) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 6);
            break;
          case "Tues":
            display = this.showdate(datein, 5);
            break;
          case "Weds":
            display = this.showdate(datein, 4);
            break;
          case "Thurs":
            display = this.showdate(datein, 3);
            break;
          case "Fri":
            display = this.showdate(datein, 2);
            break;
          case "Sat":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }

        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)


      }
      else if (i === 13) {
        let display = " "
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 7);
            break;
          case "Tues":
            display = this.showdate(datein, 6);
            break;
          case "Weds":
            display = this.showdate(datein, 5);
            break;
          case "Thurs":
            display = this.showdate(datein, 4);
            break;
          case "Fri":
            display = this.showdate(datein, 3);
            break;
          case "Sat":
            display = this.showdate(datein, 2);
            break;
          case "Sun":
            display = this.showdate(datein, 1);
            break;
          default:
            break;
        }


        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)

      }
      else if (i === 14) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 8);
            break;
          case "Tues":
            display = this.showdate(datein, 7);
            break;
          case "Weds":
            display = this.showdate(datein, 6);
            break;
          case "Thurs":
            display = this.showdate(datein, 5);
            break;
          case "Fri":
            display = this.showdate(datein, 4);
            break;
          case "Sat":
            display = this.showdate(datein, 3);
            break;
          case "Sun":
            display = this.showdate(datein, 2);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 15) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 9);
            break;
          case "Tues":
            display = this.showdate(datein, 8);
            break;
          case "Weds":
            display = this.showdate(datein, 7);
            break;
          case "Thurs":
            display = this.showdate(datein, 6);
            break;
          case "Fri":
            display = this.showdate(datein, 5);
            break;
          case "Sat":
            display = this.showdate(datein, 4);
            break;
          case "Sun":
            display = this.showdate(datein, 3);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 16) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 10);
            break;
          case "Tues":
            display = this.showdate(datein, 9);
            break;
          case "Weds":
            display = this.showdate(datein, 8);
            break;
          case "Thurs":
            display = this.showdate(datein, 7);
            break;
          case "Fri":
            display = this.showdate(datein, 6);
            break;
          case "Sat":
            display = this.showdate(datein, 5);
            break;
          case "Sun":
            display = this.showdate(datein, 4);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 17) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 11);
            break;
          case "Tues":
            display = this.showdate(datein, 10);
            break;
          case "Weds":
            display = this.showdate(datein, 9);
            break;
          case "Thurs":
            display = this.showdate(datein, 8);
            break;
          case "Fri":
            display = this.showdate(datein, 7);
            break;
          case "Sat":
            display = this.showdate(datein, 6);
            break;
          case "Sun":
            display = this.showdate(datein, 5);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 18) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 12);
            break;
          case "Tues":
            display = this.showdate(datein, 11);
            break;
          case "Weds":
            display = this.showdate(datein, 10);
            break;
          case "Thurs":
            display = this.showdate(datein, 9);
            break;
          case "Fri":
            display = this.showdate(datein, 8);
            break;
          case "Sat":
            display = this.showdate(datein, 7);
            break;
          case "Sun":
            display = this.showdate(datein, 6);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 19) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 13);
            break;
          case "Tues":
            display = this.showdate(datein, 12);
            break;
          case "Weds":
            display = this.showdate(datein, 11);
            break;
          case "Thurs":
            display = this.showdate(datein, 10);
            break;
          case "Fri":
            display = this.showdate(datein, 9);
            break;
          case "Sat":
            display = this.showdate(datein, 8);
            break;
          case "Sun":
            display = this.showdate(datein, 7);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 20) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 14);
            break;
          case "Tues":
            display = this.showdate(datein, 13);
            break;
          case "Weds":
            display = this.showdate(datein, 12);
            break;
          case "Thurs":
            display = this.showdate(datein, 11);
            break;
          case "Fri":
            display = this.showdate(datein, 10);
            break;
          case "Sat":
            display = this.showdate(datein, 9);
            break;
          case "Sun":
            display = this.showdate(datein, 8);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 21) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 15);
            break;
          case "Tues":
            display = this.showdate(datein, 14);
            break;
          case "Weds":
            display = this.showdate(datein, 13);
            break;
          case "Thurs":
            display = this.showdate(datein, 12);
            break;
          case "Fri":
            display = this.showdate(datein, 11);
            break;
          case "Sat":
            display = this.showdate(datein, 10);
            break;
          case "Sun":
            display = this.showdate(datein, 9);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 22) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 16);
            break;
          case "Tues":
            display = this.showdate(datein, 15);
            break;
          case "Weds":
            display = this.showdate(datein, 14);
            break;
          case "Thurs":
            display = this.showdate(datein, 13);
            break;
          case "Fri":
            display = this.showdate(datein, 12);
            break;
          case "Sat":
            display = this.showdate(datein, 11);
            break;
          case "Sun":
            display = this.showdate(datein, 10);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 23) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 17);
            break;
          case "Tues":
            display = this.showdate(datein, 16);
            break;
          case "Weds":
            display = this.showdate(datein, 15);
            break;
          case "Thurs":
            display = this.showdate(datein, 14);
            break;
          case "Fri":
            display = this.showdate(datein, 13);
            break;
          case "Sat":
            display = this.showdate(datein, 12);
            break;
          case "Sun":
            display = this.showdate(datein, 11);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 24) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 18);
            break;
          case "Tues":
            display = this.showdate(datein, 17);
            break;
          case "Weds":
            display = this.showdate(datein, 16);
            break;
          case "Thurs":
            display = this.showdate(datein, 15);
            break;
          case "Fri":
            display = this.showdate(datein, 14);
            break;
          case "Sat":
            display = this.showdate(datein, 13);
            break;
          case "Sun":
            display = this.showdate(datein, 12);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 25) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 19);
            break;
          case "Tues":
            display = this.showdate(datein, 18);
            break;
          case "Weds":
            display = this.showdate(datein, 17);
            break;
          case "Thurs":
            display = this.showdate(datein, 16);
            break;
          case "Fri":
            display = this.showdate(datein, 15);
            break;
          case "Sat":
            display = this.showdate(datein, 14);
            break;
          case "Sun":
            display = this.showdate(datein, 13);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 26) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 20);
            break;
          case "Tues":
            display = this.showdate(datein, 19);
            break;
          case "Weds":
            display = this.showdate(datein, 18);
            break;
          case "Thurs":
            display = this.showdate(datein, 17);
            break;
          case "Fri":
            display = this.showdate(datein, 16);
            break;
          case "Sat":
            display = this.showdate(datein, 15);
            break;
          case "Sun":
            display = this.showdate(datein, 14);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 27) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 21);
            break;
          case "Tues":
            display = this.showdate(datein, 20);
            break;
          case "Weds":
            display = this.showdate(datein, 19);
            break;
          case "Thurs":
            display = this.showdate(datein, 18);
            break;
          case "Fri":
            display = this.showdate(datein, 17);
            break;
          case "Sat":
            display = this.showdate(datein, 16);
            break;
          case "Sun":
            display = this.showdate(datein, 15);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 28) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 22);
            break;
          case "Tues":
            display = this.showdate(datein, 21);
            break;
          case "Weds":
            display = this.showdate(datein, 20);
            break;
          case "Thurs":
            display = this.showdate(datein, 19);
            break;
          case "Fri":
            display = this.showdate(datein, 18);
            break;
          case "Sat":
            display = this.showdate(datein, 17);
            break;
          case "Sun":
            display = this.showdate(datein, 16);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 29) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 23);
            break;
          case "Tues":
            display = this.showdate(datein, 22);
            break;
          case "Weds":
            display = this.showdate(datein, 21);
            break;
          case "Thurs":
            display = this.showdate(datein, 20);
            break;
          case "Fri":
            display = this.showdate(datein, 19);
            break;
          case "Sat":
            display = this.showdate(datein, 18);
            break;
          case "Sun":
            display = this.showdate(datein, 17);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 30) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 24);
            break;
          case "Tues":
            display = this.showdate(datein, 23);
            break;
          case "Weds":
            display = this.showdate(datein, 22);
            break;
          case "Thurs":
            display = this.showdate(datein, 21);
            break;
          case "Fri":
            display = this.showdate(datein, 20);
            break;
          case "Sat":
            display = this.showdate(datein, 19);
            break;
          case "Sun":
            display = this.showdate(datein, 18);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 31) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 25);
            break;
          case "Tues":
            display = this.showdate(datein, 24);
            break;
          case "Weds":
            display = this.showdate(datein, 23);
            break;
          case "Thurs":
            display = this.showdate(datein, 22);
            break;
          case "Fri":
            display = this.showdate(datein, 21);
            break;
          case "Sat":
            display = this.showdate(datein, 20);
            break;
          case "Sun":
            display = this.showdate(datein, 19);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 32) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 26);
            break;
          case "Tues":
            display = this.showdate(datein, 25);
            break;
          case "Weds":
            display = this.showdate(datein, 24);
            break;
          case "Thurs":
            display = this.showdate(datein, 23);
            break;
          case "Fri":
            display = this.showdate(datein, 22);
            break;
          case "Sat":
            display = this.showdate(datein, 21);
            break;
          case "Sun":
            display = this.showdate(datein, 20);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 33) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 27);
            break;
          case "Tues":
            display = this.showdate(datein, 26);
            break;
          case "Weds":
            display = this.showdate(datein, 25);
            break;
          case "Thurs":
            display = this.showdate(datein, 24);
            break;
          case "Fri":
            display = this.showdate(datein, 23);
            break;
          case "Sat":
            display = this.showdate(datein, 22);
            break;
          case "Sun":
            display = this.showdate(datein, 21);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 34) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, 28);
            break;
          case "Tues":
            display = this.showdate(datein, 27);
            break;
          case "Weds":
            display = this.showdate(datein, 26);
            break;
          case "Thurs":
            display = this.showdate(datein, 25);
            break;
          case "Fri":
            display = this.showdate(datein, 24);
            break;
          case "Sat":
            display = this.showdate(datein, 23);
            break;
          case "Sun":
            display = this.showdate(datein, 22);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 35) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          case "Tues":
            display = this.showdate(datein, 28);
            break;
          case "Weds":
            display = this.showdate(datein, 27);
            break;
          case "Thurs":
            display = this.showdate(datein, 26);
            break;
          case "Fri":
            display = this.showdate(datein, 25);
            break;
          case "Sat":
            display = this.showdate(datein, 24);
            break;
          case "Sun":
            display = this.showdate(datein, 23);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 36) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Tues":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          case "Weds":
            display = this.showdate(datein, 28);
            break;
          case "Thurs":
            display = this.showdate(datein, 27);
            break;
          case "Fri":
            display = this.showdate(datein, 26);
            break;
          case "Sat":
            display = this.showdate(datein, 25);
            break;
          case "Sun":
            display = this.showdate(datein, 24);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 37) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Tues":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Weds":
            display = this.showdate(datein, check_29_feb_leapyear(datein))
            break;
          case "Thurs":
            display = this.showdate(datein, 28);
            break;
          case "Fri":
            display = this.showdate(datein, 27);
            break;
          case "Sat":
            display = this.showdate(datein, 26);
            break;
          case "Sun":
            display = this.showdate(datein, 25);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 38) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Weds":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Thurs":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          case "Fri":
            display = this.showdate(datein, 28);
            break;
          case "Sat":
            display = this.showdate(datein, 27);
            break;
          case "Sun":
            display = this.showdate(datein, 26);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 39) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            break;
          case "Weds":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Thurs":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Fri":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          case "Sat":
            display = this.showdate(datein, 28);
            break;
          case "Sun":
            display = this.showdate(datein, 27);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 40) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            break;
          case "Weds":
            break;
          case "Thurs":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Fri":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Sat":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          case "Sun":
            display = this.showdate(datein, 28);
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 41) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            break;
          case "Weds":
            break;
          case "Thurs":
            break;
          case "Fri":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Sat":
            display = this.showdate(datein, check_30(datein));
            break;
          case "Sun":
            display = this.showdate(datein, check_29_feb_leapyear(datein));
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 42) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            break;
          case "Weds":
            break;
          case "Thurs":
            break;
          case "Fri":
            break;
          case "Sat":
            display = this.showdate(datein, check_31(datein));
            break;
          case "Sun":
            display = this.showdate(datein, check_30(datein));
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else if (i === 43) {
        let display = " ";
        switch (firstison) {
          case "Mon":
            break;
          case "Tues":
            break;
          case "Weds":
            break;
          case "Thurs":
            break;
          case "Fri":
            break;
          case "Sat":
            break;
          case "Sun":
            display = this.showdate(datein, check_31(datein));
            break;
          default:
            break;
        }
        gridcalender.push(<div className="calendar-element daydisplay">
          {display}
        </div>)
      }
      else {
        gridcalender.push(<div className="calendar-element daydisplay">
          &nbsp;
							</div>)
      }
    })
    return gridcalender;
  }
  handlerender() {
    if (this.props.projects) {
      if (this.props.projects.hasOwnProperty("length")) {
        return (<div className="event-container">
          <div className="event-titlerow">{this.gettitlerow()} </div>
          <div className="event-datecontainer"><Link to={this.getlinktoprojects()} className="project-link"> {` << Back to Project `} </Link> </div>
          <div className="event-titlerow">{this.createnewbutton()} </div>
          <div className="event-datecontainer">{this.DateIn()}</div>
          <div className="event-titlerow">{this.getdatemessage()} </div>
          <div className="event-titlerow">{this.handlestarttime()} </div>
          <div className="event-titlerow">{this.handleendtime()}  </div>


          {this.showtime()}

          <div className="event-datecontainer">
            Event Detail <br />
            <textarea className="project-field" value={this.geteventdetail()} onChange={event => { this.handleeventdetail(event.target.value) }}> </textarea> </div>
          <div className="event-titlerow"><button className="button-events" onClick={event => { this.saveclient() }}>{saveEvent()} </button></div>
          <div className="event-datecontainer">{this.state.message}</div>
          {this.showevents()}
        </div>)
      }
      else {
        return (<span>&nbsp; </span>)
      }
    }
    return (<span>&nbsp; </span>)
  }

  render() {
    return (<div>{this.handlerender()} </div>)

  }
}

function mapStateToProps(state) {
  return {
    myusermodel: state.myusermodel,
    projects: state.projects,
    activeprojectid: state.activeprojectid,
    datein: state.datein,
    engineers: state.engineers,
    activeeventid: state.activeeventid
  };
}

export default connect(mapStateToProps, actions)(Events);
