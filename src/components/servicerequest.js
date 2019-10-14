import React, { Component } from 'react';
import './servicerequest.css';
import { connect } from 'react-redux';
import { loadmyservicerequests, insertmyservicerequest, deletemyservicerequest } from '../actions/api';
import _ from 'lodash';
import USstates from '../resources/statearray'

class ServiceRequest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allmyservicerequests: [],
            daterequest: "",
            projectcity: "",
            projectstate: "",
            projectcounty: "",
            projectapn: "",
            proposed: "",
            proposedproject: "",
            title: "",
            siteaccess: "",
            makefinal: "",
            message: "",
            servicerequest: ""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.deleteservicerequest = this.deleteservicerequest.bind(this);
    }
    componentDidMount() {
        this.loadservicerequest()
    }



    async loadservicerequest() {
        var clientid = this.props.match.params.clientid
        let allmyservicerequests = await loadmyservicerequests(clientid);
        console.log(allmyservicerequests)
        this.setState({ allmyservicerequests });

    }
    async deleteservicerequest() {
        var clientid = this.props.myusermodel.clientid;
        var servicerequest = this.state.servicerequest;
        var values = { clientid, servicerequest }
        var index = 0;
        var allmyservicerequests = {}
        let deletedservicerequest = await deletemyservicerequest(values);
        if (this.state.allmyservicerequests.myservicerequest.length) {

            for (var i = 0; i < this.state.allmyservicerequests.myservicerequest.length; i++) {

                if (this.state.allmyservicerequests.myservicerequest[i].servicerequest === deletedservicerequest.deleterequest) {
                    index = i;
                    this.state.allmyservicerequests.myservicerequest.splice(index, 1);
                    console.log(this.state.allmyservicerequests);
                    allmyservicerequests = this.state.allmyservicerequests;
                    var message = deletedservicerequest.message;
                    var daterequest = deletedservicerequest.myservicerequest.daterequest;
                    var projectaddress = deletedservicerequest.myservicerequest.projectaddress;
                    var projectcity = deletedservicerequest.myservicerequest.projectcity;
                    var projectstate = deletedservicerequest.myservicerequest.projectstate;
                    var projectcounty = deletedservicerequest.myservicerequest.projectcounty;
                    var projectapn = deletedservicerequest.myservicerequest.projectapn;
                    var title = deletedservicerequest.myservicerequest.title;
                    var proposedproject = deletedservicerequest.myservicerequest.proposedproject;
                    var proposed = Number(deletedservicerequest.myservicerequest.proposed);
                    var siteaccess = Number(deletedservicerequest.myservicerequest.siteaccess);
                    servicerequest = Number(deletedservicerequest.myservicerequest.servicerequest);
                    this.setState({
                        allmyservicerequests,
                        message,
                        daterequest,
                        projectaddress,
                        projectcity,
                        projectstate,
                        projectcounty,
                        projectapn,
                        title,
                        proposedproject,
                        proposed,
                        siteaccess,
                        servicerequest
                    })

                    break;
                } //found the deleted request   


            } // end of for
        }
        else {
            //there is only one invoice
            message = deletedservicerequest.message;
            daterequest = deletedservicerequest.myservicerequest.daterequest;
            projectaddress = deletedservicerequest.myservicerequest.projectaddress;
            projectcity = deletedservicerequest.myservicerequest.projectcity;
            projectstate = deletedservicerequest.myservicerequest.projectstate;
            projectcounty = deletedservicerequest.myservicerequest.projectcounty;
            projectapn = deletedservicerequest.myservicerequest.projectapn;
            title = deletedservicerequest.myservicerequest.title;
            proposedproject = deletedservicerequest.myservicerequest.proposedproject;
            proposed = Number(deletedservicerequest.myservicerequest.proposed);
            siteaccess = Number(deletedservicerequest.myservicerequest.siteaccess);
            servicerequest = Number(deletedservicerequest.myservicerequest.servicerequest);
            this.setState({
                allmyservicerequests,
                message,
                daterequest,
                projectaddress,
                projectcity,
                projectstate,
                projectcounty,
                projectapn,
                title,
                proposedproject,
                proposed,
                siteaccess,
                servicerequest
            })


        }




        console.log(deletedservicerequest);
    }

    async insertservicerequest(values) {
        let updatedrequest = await insertmyservicerequest(values);
        //console.log(updatedrequest)
        var allmyservicerequests = {};
        if (updatedrequest.updaterequest) {

            if (this.state.allmyservicerequests.myservicerequest.length > 0) {

                for (var i = 0; i < this.state.allmyservicerequests.myservicerequest.length; i++) {

                    if (this.state.allmyservicerequests.myservicerequest[i].servicerequest === updatedrequest.myservicerequest.servicerequest) {
                        this.state.allmyservicerequests.myservicerequest[i] = updatedrequest.myservicerequest;

                    }

                }
            }
            else {

                this.state.allmyservicerequests = updatedrequest
            }

            allmyservicerequests = this.state.allmyservicerequests;
            var message = updatedrequest.message;
            var daterequest = updatedrequest.myservicerequest.daterequest;
            var projectaddress = updatedrequest.myservicerequest.projectaddress;
            var projectcity = updatedrequest.myservicerequest.projectcity;
            var projectstate = updatedrequest.myservicerequest.projectstate;
            var projectcounty = updatedrequest.myservicerequest.projectcounty;
            var projectapn = updatedrequest.myservicerequest.projectapn;
            var title = updatedrequest.myservicerequest.title;
            var proposedproject = updatedrequest.myservicerequest.proposedproject;
            var proposed = Number(updatedrequest.myservicerequest.proposed);
            var siteaccess = Number(updatedrequest.myservicerequest.siteaccess);
            var servicerequest = Number(updatedrequest.myservicerequest.servicerequest);
            this.setState({
                allmyservicerequests,
                message,
                daterequest,
                projectaddress,
                projectcity,
                projectstate,
                projectcounty,
                projectapn,
                title,
                proposedproject,
                proposed,
                siteaccess,
                servicerequest
            })
            //end edit
        }
        else if (updatedrequest.insertrequest) {

            if (this.state.allmyservicerequests.myservicerequest) {
                this.state.allmyservicerequests.myservicerequest.push(updatedrequest.myservicerequest)
                allmyservicerequests = this.state.allmyservicerequests;
                message = updatedrequest.message;
                daterequest = updatedrequest.myservicerequest.daterequest;
                projectaddress = updatedrequest.myservicerequest.projectaddress;
                projectcity = updatedrequest.myservicerequest.projectcity;
                projectstate = updatedrequest.myservicerequest.projectstate;
                projectcounty = updatedrequest.myservicerequest.projectcounty;
                projectapn = updatedrequest.myservicerequest.projectapn;
                title = updatedrequest.myservicerequest.title;
                proposedproject = updatedrequest.myservicerequest.proposedproject;
                proposed = Number(updatedrequest.myservicerequest.proposed);
                siteaccess = Number(updatedrequest.myservicerequest.siteaccess);
                servicerequest = Number(updatedrequest.myservicerequest.servicerequest);
                this.setState({
                    allmyservicerequests,
                    message,
                    daterequest,
                    projectaddress,
                    projectcity,
                    projectstate,
                    projectcounty,
                    projectapn,
                    title,
                    proposedproject,
                    proposed,
                    siteaccess,
                    servicerequest
                })

            }
            else {
                allmyservicerequests = updatedrequest;
                message = updatedrequest.message;
                daterequest = updatedrequest.myservicerequest.daterequest;
                projectaddress = updatedrequest.myservicerequest.projectaddress;
                projectcity = updatedrequest.myservicerequest.projectcity;
                projectstate = updatedrequest.myservicerequest.projectstate;
                projectcounty = updatedrequest.myservicerequest.projectcounty;
                projectapn = updatedrequest.myservicerequest.projectapn;
                title = updatedrequest.myservicerequest.title;
                proposedproject = updatedrequest.myservicerequest.proposedproject;
                proposed = Number(updatedrequest.myservicerequest.proposed);
                siteaccess = Number(updatedrequest.myservicerequest.siteaccess);
                servicerequest = Number(updatedrequest.myservicerequest.servicerequest);
                this.setState({
                    allmyservicerequests,
                    message,
                    daterequest,
                    projectaddress,
                    projectcity,
                    projectstate,
                    projectcounty,
                    projectapn,
                    title,
                    proposedproject,
                    proposed,
                    siteaccess,
                    servicerequest
                })
            }

        }

    }

    showservicerequests() {
        var myservicerequests = {};
        var returned = false;
        return _.map(this.state.allmyservicerequests.myservicerequest, (myservicerequest, i) => {
            if (i >= 0) {
                //array 
                myservicerequests = myservicerequest;
                return (<option value={myservicerequests.servicerequest} key={i}> {myservicerequests.servicerequest}- {myservicerequests.title} - {myservicerequest.daterequest} </option>)
            }
            else {
                //object  
                if (!returned) {
                    returned = true;
                    myservicerequests = this.state.allmyservicerequests.myservicerequest;
                    return (<option value={myservicerequests.servicerequest} key={i}>{myservicerequests.servicerequest} - {myservicerequests.title} - {myservicerequests.daterequest} </option>)
                }
            }


        })
    }
    findservicerequest() {
        var myservicerequests = {};
        var returned = false;
        if (this.state.servicerequest > 0) {
            _.map(this.state.allmyservicerequests.myservicerequest, (myservicerequest, i) => {

                if (i >= 0) {

                    if (myservicerequest.servicerequest === this.state.servicerequest) {

                        myservicerequests = myservicerequest

                        this.setState({
                            daterequest: myservicerequests.daterequest,
                            projectaddress: myservicerequests.projectaddress,
                            projectcity: myservicerequests.projectcity,
                            projectstate: myservicerequests.projectstate,
                            projectcounty: myservicerequests.projectcounty,
                            projectapn: myservicerequests.projectapn,
                            title: myservicerequests.title,
                            proposedproject: myservicerequests.proposedproject,
                            proposed: Number(myservicerequests.proposed),
                            siteaccess: Number(myservicerequests.siteaccess)

                        })
                    }

                    //array   
                }
                else {
                    //object
                    if (!returned) {
                        myservicerequests = this.state.allmyservicerequests.myservicerequest
                        this.setState({
                            daterequest: myservicerequests.daterequest,
                            projectaddress: myservicerequests.projectaddress,
                            projectcity: myservicerequests.projectcity,
                            projectstate: myservicerequests.projectstate,
                            projectcounty: myservicerequests.projectcounty,
                            projectapn: myservicerequests.projectapn,
                            title: myservicerequests.title,
                            proposedproject: myservicerequests.proposedproject,
                            proposed: Number(myservicerequests.proposed),
                            siteaccess: Number(myservicerequests.siteaccess)

                        })
                    }
                }


            })
        }
        else {
            this.clearservicerequest();
        }
    }

    clearservicerequest() {

        this.setState({
            daterequest: "",
            projectaddress: "",
            projectcity: "",
            projectstate: "",
            projectcounty: "",
            projectapn: "",
            title: "",
            proposedproject: "",
            proposed: "",
            siteaccess: "",
            message: ""

        })
    }

    makefinal(event) {
        var makefinal = 0;
        if (event.target.checked) {
            makefinal = 1;
        }
        this.setState({ makefinal })
    }
    handleScope(event) {
        var proposed = event.currentTarget.value;
        proposed = Number(proposed)
        this.setState({ proposed });
    }
    siteAccess(event) {
        var siteaccess = event.currentTarget.value;
        siteaccess = Number(siteaccess)
        this.setState({ siteaccess });
    }

    handleSubmit(event) {
        event.preventDefault();

        var clientid = this.props.myusermodel.clientid
        var servicerequest = this.state.servicerequest;
        var projectaddress = this.state.projectaddress;
        var projectcity = this.state.projectcity;
        var projectstate = this.state.projectstate;
        var projectcounty = this.state.projectcounty;
        var projectapn = this.state.projectapn;
        var proposed = this.state.proposed;
        var proposedproject = this.state.proposedproject;
        var title = this.state.title;
        var siteaccess = this.state.siteaccess;
        var makefinal = this.state.makefinal;

        var values = { clientid, servicerequest, projectaddress, projectcity, projectstate, projectcounty, projectapn, proposed, proposedproject, title, siteaccess, makefinal }
        if (makefinal === 1) {
            if (window.confirm('Are you sure you want to send the Service Request?')) {
                this.insertservicerequest(values);
            }
        }
        else {

            this.insertservicerequest(values);
        }

    }

    renderstates() {
        return _.map(USstates, (state) => {
            return (<option value={state.abbreviation}>{state.name} </option>)
        })
    }
    showfield(label, name, value, errmsg) {
        return (<div className="service-request-container">
       <div className="service-request-field"> {label}
       </div>
        <div className="service-request-field">
        <input type="text" name={name} value={value}
        onChange={event => this.setState({[event.target.name]: event.target.value})} 
        className="fullWidth" />
       </div>
        <div className="service-request-field"> {errmsg}
       </div>
       </div>)
    }
    showproposedprojects(proposedproject) {
        return (<div className="service-request-container">

    <div className="service-request-field span-3">
    <textarea name="proposedproject" 
    id="proposedproject" value={this.state.proposedproject}
    onChange={event => this.setState({[event.target.name]: event.target.value})}>
    </textarea>
    </div>
    </div>)
    }
    showselectmenu() {
        return (<div className="service-request-container">
       <div className="service-request-field"> Service Request ID
       </div>
              <div className="service-request-field"> 
              <select name="servicerequest" id="servicerequest" 
    value={this.state.servicerequest}     
    onChange={event => this.setState({[event.target.name]: event.target.value}, () => {
    this.findservicerequest();
    })
    }
    className="fullWidth"> 
    <option value=""> Enter New Request</option>
    {this.showservicerequests()}
    </select>
       </div>
     <div className="service-request-field">
     Select One to Edit or Select Enter New
     </div>
       </div>)
    }

    showstatefield() {
        return (
            <div className="service-request-container">
                <div className="service-request-field"> Project State
                </div>
                <div className="service-request-field"> 
                <select name="projectstate" 
                value={this.state.projectstate}  
                onChange={event => this.setState({[event.target.name]: event.target.value})} 
                id="service-projectstate"
                className="partialWidth">
                <option value="">- Enter Your State -</option>
                {this.renderstates()}
                </select>
                </div>
                <div className="service-request-field">
                 &nbsp;
                </div>
             </div>

        )
    }
    showradiogroup() {
        return (
            <div className="service-request-radio">
            <div className="service-request-field span-3">  
                Enter the Scope of Work
             </div>
            <div className="service-request-field">  
                <input type="radio" name="scope" value="1" className="radiob" id="scopeone" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===1}/>Multi-family Residences
             </div>
             <div className="service-request-field">  
                <input type="radio" name="scope" value="2" className="radiob" id="scopetwo" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===2} />Commercial Buildings
             </div>
             <div className="service-request-field">  
                <input type="radio" name="scope" value="6" className="radiob" id="scopesix" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===6} />Outdoor Improvements <br/><br/>
             </div>
             <div className="service-request-field">  
                <input type="radio" name="scope" value="5" className="radiob" id="scopefive" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===5} /> Single Family Residence
             </div>
             <div className="service-request-field">  
               <input type="radio" name="scope" value="3" className="radiob" id="scopethree" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===3}  /> Addition to Existing Residence
             </div>
             <div className="service-request-field">  
                <input type="radio" name="scope" value="4" className="radiob" id="scopefour" onChange={event=>{this.handleScope(event)}} checked={this.state.proposed===4} />Multiple Lot Sub-Division
             </div>
        </div>)
    }
    showsiteaccess() {
        return (
            <div className="service-request-siteaccess">
            <div className="service-request-field">
            Select Site Access
            </div>
       <div className="service-request-field">
        <input type="radio" name="access" id="truck" value="1" onChange={event=> {this.siteAccess(event)}} checked={this.state.siteaccess===1} />
      Open Access for Trucks 
        </div>
        <div className="service-request-field">
        <input type="radio" name="access" id="portable" value="2"  onChange={event=> {this.siteAccess(event)}} checked={this.state.siteaccess===2} />
        No Access for Trucks)
        </div>
        </div>)
    }

    showdate() {
        return (
            <div className="service-request-container">
            <div className="service-request-field">
            Date of Service Request
            </div>
       <div className="service-request-field span-2">
      
      {this.state.daterequest}
        </div>
        </div>)
    }
    showmakefinal() {
        return (
            <div className="service-request-select">
       <div className="service-request-field span-2">
       <input type="checkbox" 
            id="makefinal" 
            name="makefinal" 
            value={this.state.makefinal} 
            onChange={event => this.makefinal(event)}  
            checked={this.state.makefinal === 1}   /> 
            Make Request Final (Sends Notification Email)
      
       </div>
    </div>)
    }

    showmessage() {
        return (
            <div className="service-request-select">
       <div className="service-request-field span-2 center showmessage">
      
      {this.state.message} 
       </div>
    </div>)
    }
    showbuttons() {
        return (<div className="service-request-button">
            <div className="service-request-field center">
                   <input type="button" id="deleteservicerequest" 
                    value="Delete Request" 
                    className="request-button" 
                    onClick={() => { if (window.confirm('Do want to delete the Service Request?')) 
                    this.deleteservicerequest()} } 
                />
            </div>
            <div className="service-request-field center">
                <input type="submit" 
                value="Insert/Update"
                className="request-button" 
                id="btninsertrequest" />
             </div>
            </div>)
    }
    render() {
        var formpostURL = process.env.REACT_APP_SERVER_API + "/servicerequest/insertupdate";
        return (<div>
        <form method="post" action={formpostURL} onSubmit={this.handleSubmit}>
        {this.showmessage()}
        {this.showselectmenu()}
        {this.showdate()}
        {this.showfield("Enter a Project Title", "title", this.state.title,"")}
        {this.showfield("Address for the Project","projectaddress",this.state.projectaddress,"")}
        {this.showfield("Enter the City","projectcity",this.state.projectcity,"")}
        {this.showstatefield()}
        {this.showfield("Enter the County","projectcounty",this.state.projectcounty,"")}
        {this.showfield("Enter the Project APN","projectapn",this.state.projectapn,"")}
        {this.showradiogroup()}
        {this.showproposedprojects()}
        {this.showsiteaccess()}
        {this.showmakefinal()}
        {this.showbuttons()}
       </form>
       </div>)
    }

}

function mapStateToProps(state) {
    return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ServiceRequest);
