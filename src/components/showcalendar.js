import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash'
import './showcalendar.css';
import moment from 'moment';
import { loadmyclientevents, insertgooglecalendarevent, updategooglecalendarevent, deletemyclientevent } from '../actions/api'
import {
  validateprojectid
}
from '../resources/userfunctions';
class ShowCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      myevents: [],
      myprojects: [],
      eventid: '',
      eventidmsg: '',
      eventtitle: '',
      projectid: '',
      projectidmsg: '',
      attendees: [],
      attendeesmsg: '',
      calendardescription: '',
      calendardescriptionmsg: '',
      starttime: new Date(),
      endtime: new Date(),
      usermessage: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handledelete = this.handledelete.bind(this)
  }

  componentDidMount() {
    this.loadmyevents()
  }

  async loadmyevents() {
    var returned = false;
    var returned_2 = false;
    var clientid = this.props.match.params.clientid;
    let response = await loadmyclientevents(clientid);
    this.setState({ response })
    _.map(response.allmyprojects.myproject, (myproject, i) => {
      if (i >= 0) {

        this.state.myprojects.push(myproject)
      }
      else {
        if (!returned) {
          returned = true;
          myproject = response.allmyprojects.myproject
          this.state.myprojects.push(myproject)
        }
      }

    })

    _.map(response.allmyevents.myevent, (myevent, i) => {
      if (i >= 0) {

        this.state.myevents.push(myevent)
      }
      else {

        if (!returned_2) {
          returned_2 = true;
          myevent = response.allmyevents.myevent;
          this.state.myevents.push(myevent)
        }
      }
    })
    this.setState({ response })
  }
  loadmyprojectids() {

    if (this.state.myprojects.length > 0) {
      return this.state.myprojects.map(function(myproject) {
        return (<option key={myproject.projectid} value={myproject.projectid}>Proj {myproject.projectnumber} - {myproject.title} </option>)
      })
    }

  }

  loadeventids() {
    if (this.state.myevents.length > 0) {
      return this.state.myevents.map((myevent) => {
        return (<option key={myevent.eventid} value={myevent.eventid}> {myevent.eventid}</option>)
      })
    }
  }

  findmyevent(eventid) {
    if (eventid.length > 0) {
      // eslint-disable-next-line
      this.state.myevents.map((myevent) => {

        if (myevent.eventid === eventid) {
          this.setState({
            projectid: myevent.projectid,
            calendardescription: myevent.description,
            starttime: myevent.starttime,
            endtime: myevent.endtime,
            eventtitle: myevent.eventtitle
          })

        }

      })

    }
    else {
      this.clearform();
    }

  }

  clearform() {
    this.setState({ projectid: '', calendardescription: '', starttime: new Date(), endtime: new Date() })
  }

  handleEventChange(event) {
    this.setState({ eventid: event.target.value })
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  calendarfield(fieldname, fieldvalue, errmsg, label) {
    return (

      <div className="grid-container-googlecalendar">
          <div className="grid-element-googlecalendar">
          {label}
          </div>
          <div className="grid-element-googlecalendar">
          <input type="text" name={fieldname} id={fieldname}  value={fieldvalue} onChange={event => this.handleInputChange(event)}/>
          </div>
          <div className="grid-element-googlecalendar">
          {errmsg} &nbsp;
          </div>
          </div>

    )
  }

  showeventid() {
    return (

      <div className="grid-container-googlecalendar">
          <div className="grid-element-googlecalendar">
          Event ID
          </div>
          <div className="grid-element-googlecalendar">
          <select name="eventid" 
          id="eventid-calendar"   
          value={this.state.eventid}
  
          onChange={event => {this.setState({eventid:event.target.value},() => {
            this.findmyevent(this.state.eventid)
          })}}>
          <option value=""> Enter New or Select One to Edit </option>
        {this.loadeventids()}
          </select>
          </div>
          <div className="grid-element-googlecalendar">
          {this.state.eventidmsg}
          </div>
          </div>

    )
  }

  findeventtitle() {
    // eslint-disable-next-line
    this.state.myprojects.map((myproject) => {
      if (myproject.projectid === this.state.projectid) {
        var attendees = [];
        var attendee = {};
        var eventtitle = "Proj " + myproject.projectnumber + "-" + myproject.title
        var emailstring = myproject.emailstring;
        var attendeesArray = emailstring.split(',');
        // eslint-disable-next-line
        attendeesArray.map((email) => {
          attendee = { email, responseStatus: "needsAction" }
          attendees.push(attendee);
        })
        this.setState({ eventtitle, attendees })

      }
    })
  }
  showprojectid() {
    return (

      <div className="grid-container-googlecalendar">
          <div className="grid-element-googlecalendar">
          Project ID
          </div>
          <div className="grid-element-googlecalendar">
          <select name="projectid" id="projectid-calendar"   
          value={this.state.projectid}
          onChange={event => this.setState({[event.target.name]:event.target.value}, ()=> {
           this.findeventtitle()
          })}>
          <option value="0">Select Project ID  </option>
          {this.loadmyprojectids()}
          </select>
          </div>
          <div className="grid-element-googlecalendar">
          {this.state.projectidmsg}
          </div>
          </div>

    )
  }
  handleStartDateChange(event) {


    this.setState({ starttime: event })

  }
  handleEndDateChange(event) {

    this.setState({ endtime: event })

  }

  enddatepicker() {
    return (

      <div className="date-grid">
      <div className="date-grid-element">
      <label>End-Time</label>
      </div>
        <div className="date-grid-element">
        <input type="datetime-local" 
          value={this.state.endtime}
          onChange = { event => this.handleEndDateChange(event) }
          name="end-time-date-picker"
          id="end-time-date-picker"
          format="YYYY/MM/DD hh:mm A"
        />
     </div>
     </div>

    );
  }




  startdatepicker() {
    return (

      <div className="date-grid">
      <div className="date-grid-element">
      <label>Start-Time</label>
      </div>
        <div className="date-grid-element">
        <input type="datetime-local"
          value={this.state.starttime}
          onChange={event => this.handleStartDateChange(event)}
          name="start-time-date-picker"
          id="start-time-date-picker"
          format="YYYY/MM/DD hh:mm A"
        />
     </div>

     </div>

    );
  }

  async handleSubmit(event) {
    event.preventDefault();
    var errorvalue = 0;

    var eventid = this.state.eventid;
    var projectid = this.state.projectid;
    if (!validateprojectid(projectid)) {
      errorvalue += 1;
      this.setState({ projectidmsg: ' You must select a Project ID before entering an event' })
    }
    var description = this.state.calendardescription;
    var starttime = this.state.starttime;
    starttime = moment(starttime).format('YYYY-MM-DDTHH:mm:00-07:00');
    var endtime = this.state.endtime;
    endtime = moment(endtime).format('YYYY-MM-DDTHH:mm:00-07:00');
    var eventtitle = this.state.eventtitle;
    var attendees = this.state.attendees;
    var values = { eventid, projectid, eventtitle, description, starttime, endtime, attendees }
    console.log(values)
    if (errorvalue === 0) {
      if (eventid.length === 0) {
        let insertmyevent = await insertgooglecalendarevent(values);
        console.log(insertmyevent)
        if (insertmyevent.insertevent) {

          this.state.myevents.push(insertmyevent.myevent);
          var myevents = this.state.myevents
          this.setState({
            myevents,
            eventid: insertmyevent.myevent.eventid,
            eventtitle: insertmyevent.myevent.eventtitle,
            calendardescription: insertmyevent.myevent.description,
            projectid: insertmyevent.myevent.projectid,
            starttime: insertmyevent.myevent.starttime,
            endtime: insertmyevent.myevent.endtime
          })

        }
      }

      else {
        let updatemyevent = await updategooglecalendarevent(values);
        console.log(updatemyevent)
        if (updatemyevent.updateevent) {

          for (var i = 0; i < this.state.myevents.length; i++) {
            if (this.state.myevents[i] === updatemyevent.myevent.eventid) {
              this.state.myevents[i] = updatemyevent.myevent
            }
          }
          myevents = this.state.myevents;
          this.setState({
            myevents,
            eventid: updatemyevent.myevent.eventid,
            projectid: updatemyevent.myevent.projectid,
            calendardescription: updatemyevent.myevent.description,
            eventtitle: updatemyevent.myevent.eventtitle,
            starttime: updatemyevent.myevent.starttime,
            endtime: updatemyevent.myevent.endtime
          })
        } //end if updated event

      } //end else condition to check insert or update

    } //end of validation check
  } //end function

  async handledelete() {
    let deleteresponse = await deletemyclientevent(this.state.eventid)
    console.log(deleteresponse)
    if (deleteresponse.eventdeleted) {
      var deletedid = deleteresponse.eventdeleted;
      //get array key index
      for (var i = 0; i < this.state.myevents.length; i++) {
        if (this.state.myevents[i].eventid === deletedid) {
          //splice the array to remove it from the state object
          this.state.myevents.splice(i, 1)
          var myevents = this.state.myevents;
          this.setState({
            myevents,
            eventid: deleteresponse.myevent.eventid,
            calendardescription: deleteresponse.myevent.description,
            projectid: deleteresponse.myevent.projectid,
            starttime: new Date(),
            endtime: new Date(),
            eventtitle: ''
          })
        }
      }

      //

    }

  }


  render() {


    return (
      <div>
      <div id="calendar-message"> {this.state.usermessage}</div>
      <form method="post" onSubmit={this.handleSubmit}>
      {this.showeventid()}
      {this.showprojectid()}
     
     {this.calendarfield("calendardescription", this.state.calendardescription, this.state.calendardescriptionmsg, "Event Description") }
     <div className="time-grid">
     <div className="time-grid-element">
 {this.startdatepicker()}
 </div>
 <div className="time-grid-element">
   {this.enddatepicker()}  
   </div>
  </div>
  <div className="button-grid">
  <div className="button-grid-element">
  <input type="submit" value="Insert/Update" className="calendarbutton"/>
  </div>
  <div className="button-grid-element">
  <input type="button" id="btndelete" onClick={this.handledelete} value="Delete Event" className="calendarbutton"/>
  </div>
  </div>
  
  </form>
      <iframe src="https://calendar.google.com/calendar/embed?title=GFK%20%26%20Associates%20Geotechnical%20Consultants&amp;mode=WEEK&amp;height=600&amp;wkst=1&amp;bgcolor=%23FFFFFF&amp;src=np4qfs6med0m5qpiv00peg48bk%40group.calendar.google.com&amp;color=%231B887A&amp;ctz=America%2FLos_Angeles" title="GFK &amp; Associates Geotechnical Consultants" className="google-calendar"></iframe>\
      </div>
    )

  }

}


function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ShowCalendar);
