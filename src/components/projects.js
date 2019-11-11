import React, { Component } from 'react';
import { connect } from 'react-redux';
// eslint-disable-next-line
import { getClient, CreateNewProject, getMoreProjects } from '../actions/api';
import { radioOpen, radioClosed, clicktoSave, menuOpen, menuClosed, clearProjectIDIcon, getmoreprojectsIcon } from './svg';
import { sortDecending, rounDown100, ClientProject, UserModel, randomString } from './functions';
import { Link } from 'react-router-dom';
import './projects.css';
import * as actions from '../actions';
class Projects extends Component {
    constructor(props) {
        super(props)
        this.state = {
            proposed: '',
            scope: "",
            address: "",
            city: "",
            title: "",
            loaded: true,
            countermessage: '',
            counter: 0
        }
        this.clearactiveprojectid = this.clearactiveprojectid.bind(this)
    }
    componentDidMount() {
        let clientid = this.props.match.params.clientid;
        if (!this.props.projects) {
            this.getclient(clientid)
        }
        else if (!this.props.projects.hasOwnProperty("length")) {
            this.getclient(clientid)
        }


    }
    async getclient(clientid) {

        let response = await getClient(clientid);
        console.log(response)
        let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        this.props.reduxUser(myusermodel)


        if (response.hasOwnProperty("projects")) {
            this.props.reduxProjects(response.projects.project)
            if (response.projects.project.hasOwnProperty("length")) {

                let activeprojectid = response.projects.project[0].projectid;
                this.props.reduxProjectID(activeprojectid);
            }

        }


    }
    handleSingleFamily(event) {

        this.setState({ proposed: "single-family" })

    }
    getsinglefamily() {
        if (this.state.proposed === "single-family") {
            return (radioClosed())
        }
        else {
            return (radioOpen())
        }


    }
    handleAddition(event) {
        this.setState({ proposed: "addition" })

    }
    getaddition() {
        if (this.state.proposed === "addition") {
            return (radioClosed())
        }
        else {
            return (radioOpen())
        }

    }
    getsubdivision() {
        if (this.state.proposed === "subdivision") {
            return (radioClosed())
        }
        else {
            return (radioOpen())
        }

    }
    handleSubdivision(event) {
        this.setState({ proposed: "subdivision" })
    }
    handleOther(event) {
        this.setState({ proposed: "other" })

    }
    getother() {
        if (this.state.proposed === "other") {
            return (radioClosed())
        }
        else {
            return (radioOpen())
        }

    }
    getprojects(min, max) {
        let projectlist = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (Number(myproject.projectnumber) >= min && Number(myproject.projectnumber) <= max) {
                        projectlist.push(myproject)
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container">

            {this.showprojectlist(projectlist)}</div>)
    }
    showprojectlist(projectlist) {
        // eslint-disable-next-line
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("clientid")) {
                let clientid = this.props.myusermodel.clientid;
                return projectlist.map(myproject => {
                    return (<div className="innerprojectlist-element" key={`${randomString(6)}`}>
                        <Link className="project-link" to={`/${clientid}/projects/${myproject.projectid}`}>{myproject.projectnumber}-{myproject.projectaddress} {myproject.projectcity}</Link></div>)
                })
            }
        }

    }
    zeroprojects(menu) {
        let projectlist = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (Number(myproject.projectnumber) === 0) {
                        projectlist.push(myproject)
                    }
                })
            }
        }
        return this.showprojectlist(projectlist)
    }
    getSubMenuIcon(menu, bottom, top) {
        let activemenu = this.props.activeprojectid;
        let useractivemenu = this.state.useractiveprojectid;
        if (activemenu >= bottom && activemenu <= top) {
            return (menuOpen())
        }
        if (useractivemenu >= bottom && useractivemenu <= top) {
            return (menuOpen())
        }

        return (menuClosed())


    }
    getMenuIcon(menu) {
        let activemenu = rounDown100(this.props.activeprojectid)
        let useractivemenu = rounDown100(this.state.useractiveprojectid)
        if (menu === activemenu) {
            return (menuOpen())
        }
        if (menu === useractivemenu) {
            return (menuOpen())
        }

        return (menuClosed())


    }
    activesubcontainer(menu) {
        let activeprojectnumber = this.getactiveprojectnumber();
        let activemenu = rounDown100(activeprojectnumber)
        let useractivemenu = rounDown100(this.state.useractiveprojectid)
        if (menu !== activemenu && menu !== useractivemenu) {
            return (`inactive-projectlist`)
        }
        else {
            return (`active-projectlist`)
        }
    }
    getactiveprojectnumber() {
        let activeprojectnumber = 0;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                if (this.props.activeprojectid) {
                    let activeprojectid = this.props.activeprojectid;
                    // eslint-disable-next-line
                    this.props.projects.map(myproject => {
                        if (myproject.projectid === activeprojectid) {
                            activeprojectnumber = myproject.projectnumber;
                        }
                    })
                }
            }
        }
        return activeprojectnumber;
    }
    activeprojectlist(menu, bottom, top) {
        let activeprojectid = this.getactiveprojectnumber();
        let useractiveprojectid = this.state.useractiveprojectid;
        let activeprojectlist = `inactive-projectlist`;
        if (activeprojectid >= bottom && activeprojectid <= top) {
            activeprojectlist = `active-projectlist`;
        }
        if (useractiveprojectid >= bottom && useractiveprojectid <= top) {
            activeprojectlist = `active-projectlist`;
        }
        return activeprojectlist
    }
    useractivesubmenu(event, projectid) {

        this.setState({ useractiveprojectid: projectid })
    }
    getmin() {
        let min = 0;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (Number(myproject.projectnumber) !== 0) {
                        min = Number(myproject.projectnumber)
                    }
                })

            }
        }

        return min;
    }
    getmax() {
        let max = 0;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {

                max = this.props.projects[0].projectnumber;
            }
        }
        return max;
    }
    getmenusfrommax(min, max) {
        console.log(min, max)
        let menus = [];
        min = rounDown100(min);
        max = rounDown100(max);
        menus[0] = 0;
        if (min > 0) {
            menus[1] = min;
            while (min !== max) {
                min = min + 100;
                menus.push(min);
            }
        }
        return menus;

    }
    showprojectmenus() {
        let showprojectmenus = [];
        let max = this.getmax();
        let min = this.getmin();
        let menus = this.getmenusfrommax(min, max);

        menus.sort(sortDecending);
        // eslint-disable-next-line
        menus.forEach(menu => {
            showprojectmenus.push(<div className="projectid-container" key={`${randomString(6)}${menu}`}><button className="project-icon icon-left" onClick={event => { this.useractivesubmenu(event, menu) }}>{this.getMenuIcon(menu)}</button>{menu}s</div>)
            if (menu !== 0) {


                showprojectmenus.push(<div className={`projectid-subcontainer ${this.activesubcontainer(menu)}`} key={`${randomString(10)}`}><button className="project-subicon" onClick={event => { this.useractivesubmenu(event, menu + 81) }}>{this.getSubMenuIcon(menu, menu + 81, menu + 99)}</button><label className="subprojectlabel">{menu + 81} - {menu + 99} </label> </div>)
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)} ${this.activeprojectlist(menu, menu + 81, menu + 99)}`} key={`${randomString(6)}${menu}`}>{this.getprojects(menu + 81, menu + 99)} </div>)
                showprojectmenus.push(<div className={`projectid-subcontainer ${this.activesubcontainer(menu)}`} key={`${randomString(10)}${menu}`}><button className="project-subicon" onClick={event => { this.useractivesubmenu(event, menu + 61) }}>{this.getSubMenuIcon(menu, menu + 61, menu + 80)}</button><label className="subprojectlabel">{menu + 61} - {menu + 80}</label> </div>)
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)} ${this.activeprojectlist(menu, menu + 61, menu + 80)}`} key={`${randomString(6)}${menu}`}>{this.getprojects(menu + 61, menu + 80)} </div>)
                showprojectmenus.push(<div className={`projectid-subcontainer ${this.activesubcontainer(menu)}`} key={`${randomString(10)}${menu}`}><button className="project-subicon" onClick={event => { this.useractivesubmenu(event, menu + 41) }}>{this.getSubMenuIcon(menu, menu + 41, menu + 60)}</button><label className="subprojectlabel">{menu + 41} - {menu + 60}</label> </div>)
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)} ${this.activeprojectlist(menu, menu + 41, menu + 60)}`} key={`${randomString(6)}${menu}`}>{this.getprojects(menu + 41, menu + 60)} </div>)
                showprojectmenus.push(<div className={`projectid-subcontainer ${this.activesubcontainer(menu)}`} key={`${randomString(10)}${menu}`} ><button className="project-subicon" onClick={event => { this.useractivesubmenu(event, menu + 21) }}>{this.getSubMenuIcon(menu, menu + 21, menu + 40)}</button><label className="subprojectlabel">{menu + 21} - {menu + 40}</label> </div>)
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)} ${this.activeprojectlist(menu, menu + 21, menu + 40)}`} key={`${randomString(6)}${menu}`}>{this.getprojects(menu + 21, menu + 40)} </div>)
                showprojectmenus.push(<div className={`projectid-subcontainer ${this.activesubcontainer(menu)}`} key={`${randomString(10)}${menu}`}><button className="project-subicon" onClick={event => { this.useractivesubmenu(event, menu) }}>{this.getSubMenuIcon(menu, menu, menu + 20)}</button><label className="subprojectlabel">{menu} - {menu + 20}</label> </div>)
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)} ${this.activeprojectlist(menu, menu, menu + 20)}`} key={`${randomString(6)}${menu}`}>{this.getprojects(menu, menu + 20)} </div>)

            }
            else {
                showprojectmenus.push(<div className={`projectid-projectlist ${this.activesubcontainer(menu)}`} key={`${randomString(6)}${menu}`}>{this.zeroprojects(menu)} </div>)
            }
        })
        return showprojectmenus;
    }

    handlescope(value) {
        if (this.props.activeprojectid) {
            let projectid = this.props.activeprojectid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    this.props.projects[i].proposedproject = value;
                    let obj = this.props.projects;
                    this.props.reduxProjects(obj);
                    this.setState({ render: 'render' })
                }
            })


        }
        else {
            this.setState({ scope: value })
        }
    }
    getscope() {
        let scope = "";
        if (this.props.activeprojectid) {
            let myproject = this.getactiveproject();
            scope = myproject.proposedproject;;


        }
        else {
            scope = this.state.scope;
        }
        return scope;
    }
    handlecity(value) {
        if (this.props.activeprojectid) {
            let projectid = this.props.activeprojectid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    this.props.projects[i].city = value;
                    let obj = this.props.projects;
                    this.props.reduxProjects(obj);
                    this.setState({ render: 'render' })
                }
            })


        }
        else {
            this.setState({ city: value })
        }
    }
    getcity() {
        let city = "";
        if (this.props.activeprojectid) {
            let myproject = this.getactiveproject();
            city = myproject.projectcity;


        }
        else {
            city = this.state.city;
        }
        return city;
    }
    handleaddress(value) {
        if (this.props.activeprojectid) {
            let projectid = this.props.activeprojectid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    this.props.projects[i].projectaddress = value;
                    let obj = this.props.projects;
                    this.props.reduxProjects(obj);
                    this.setState({ render: 'render' })
                }
            })


        }
        else {
            this.setState({ address: value })
        }
    }
    getaddress() {
        let address = "";
        if (this.props.activeprojectid) {
            let myproject = this.getactiveproject();
            address = myproject.projectaddress;


        }
        else {
            address = this.state.address;
        }
        return address;
    }
    handletitle(value) {
        if (this.props.activeprojectid) {
            let projectid = this.props.activeprojectid;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    this.props.projects[i].title = value;
                    let obj = this.props.projects;
                    this.props.reduxProjects(obj);
                    this.setState({ render: 'render' })
                }
            })


        }
        else {
            console.log("inactive")
            this.setState({ title: value })
        }
    }
    getactiveproject() {
        let project = {};
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                if (this.props.activeprojectid) {

                    let projectid = this.props.activeprojectid
                    // eslint-disable-next-line
                    this.props.projects.map(myproject => {
                        if (myproject.projectid === projectid) {
                            project = myproject;
                        }
                    })
                }
            }
        }
        return project;
    }
    gettitle() {
        let title = "";
        if (this.props.activeprojectid) {
            let myproject = this.getactiveproject();
            console.log(this.props.activeprojectid)
            title = myproject.title;


        }
        else {
            title = this.state.title;
        }
        return title;
    }
    async createproject(event) {
        let clientid = this.props.match.params.clientid;
        let newproject = { clientid };
        if (this.props.activeprojectid) {
            newproject = this.getactiveproject();
            newproject.clientid = clientid;
        }
        else {
            newproject = ClientProject(clientid, 0, 0, "", this.state.title, this.state.address, this.state.city, this.state.proposed, this.state.scope)
        }
        let response = await CreateNewProject(newproject);
        console.log(response)
        if (response.hasOwnProperty("projects")) {
            newproject = response.projects.project
        }
        if (response.hasOwnProperty("projectinserted")) {
            if (this.props.projects) {
                let obj = this.props.projects;
                obj.push(newproject);
                this.props.reduxProjectID(newproject.projectid)
                this.props.reduxProjects(obj)

            }
            else {
                let obj = [];
                obj.push(newproject);
                this.props.reduxProjectID(newproject.projectid)
                this.props.reduxProjects(obj)

            }
        }
        else if (response.hasOwnProperty("projectupdated")) {
            let projectid = response.projectupdated;
            // eslint-disable-next-line
            this.props.projects.map((myproject, i) => {
                if (myproject.projectid === projectid) {
                    this.props.projects[i] = newproject;
                    let obj = this.props.projects;
                    this.props.reduxProjectID(newproject.projectid)
                    this.props.reduxProjects(obj)


                }
            })
        }
        if (response.hasOwnProperty("message")) {
            this.setState({ message: response.message })
        }
        else {
            this.setState({ render: 'render' })
        }

    }
    clearactiveprojectid(event) {
        this.props.reduxProjectID(false)
        this.setState({ title: "", scope: "", address: "", city: "", proposed: '', message: '' })


    }
    getactivemessage() {
        let myproject = this.getactiveproject();
        return `Active Project ID ${myproject.projectid} ${myproject.projectaddress} ${myproject.projectcity}`
    }
    handleclearprojecticon() {
        let clearicon = [];
        if (this.props.activeprojectid) {
            clearicon.push(<div className="project-title"> <button className="project-button" onClick={event => { this.clearactiveprojectid(event) }}> {clearProjectIDIcon()}</button></div>)
            clearicon.push(<div className="project-message-container">{this.getactivemessage()}  </div>)

        }
        else {
            return;
        }
        return clearicon;
    }
    getlastproject() {
        let myproject = {};
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                myproject = this.props.projects[this.props.projects.length - 1]
            }
        }
        return myproject;

    }

    showloadingmessage() {
        let counter = 0;

        setInterval((int) => {

            if (this.state.loaded === false) {
                counter += .1;
                this.setState({ counter })
            } else {
                clearInterval(int)
            }



        }, 100)


    }
    async getmoreprojects() {
        this.setState({ loaded: false })
        this.showloadingmessage()
        let myproject = this.getlastproject();

        let lastprojectnumber = myproject.projectnumber;
        let lastseries = myproject.series;
        let clientid = this.props.match.params.clientid;
        let values = { clientid, projectnumber: lastprojectnumber, series: lastseries }
        let response = await getMoreProjects(values)

        let obj = this.props.projects;
        if (response.hasOwnProperty("projects")) {

            // eslint-disable-next-line
            response.projects.project.map(project => {
                obj.push(project)
            })

        }
        this.props.reduxProjects(obj);
        this.setState({ loaded: true })
    }
    getprojectmessage() {
        if (this.state.loaded) {
            let min = this.getmin();
            let max = this.getmax();
            return (`Viewing Projects ${min} - ${max} .. Click Get More to Load the next 50 projects `)

        }

    }
    getcountermessage() {
        if (!this.state.loaded) {
            let counter = this.state.counter;
            return (`Loading ${Number(counter).toFixed(2)} sec`)
        }
    }
    handleloadmoreprojects() {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                if (this.props.projects.length >= 50) {
                    return (
                        <div className="project-message-container">
                            <button className="project-button" onClick={event => { this.getmoreprojects(event) }}>{getmoreprojectsIcon()} </button> <br />
                            {this.getprojectmessage()}
                            {this.getcountermessage()}
                        </div>)
                }
            }
        }
    }
    handleProjects() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("clientid")) {
                return (<div className="outerproject-container">
                    <div className="project-container">
                        <div className="project-title">My Projects </div>
                        {this.handleclearprojecticon()}
                        {this.handleloadmoreprojects()}
                        <div className="project-scope">
                            <ul className="none">
                                <li><button className="proposed-radio" onClick={event => { this.handleSingleFamily(event) }}><label className="radio-label">{this.getsinglefamily()} </label></button>New Single Family Residential </li>
                                <li><button className="proposed-radio" onClick={event => { this.handleAddition(event) }}><label className="radio-label">{this.getaddition()}</label></button> Addition to Existing Residence </li>
                                <li><button className="proposed-radio" onClick={event => { this.handleSubdivision(event) }}><label className="radio-label">{this.getsubdivision()}</label> </button> Multi Housing Unit Development </li>
                                <li><button className="proposed-radio" onClick={event => { this.handleOther(event) }}><label className="radio-label">{this.getother()}</label></button> Other </li>
                            </ul>
                        </div>
                        <div className="project-title-container">Project Title  <br /><input type="text" className="project-field" value={this.gettitle()} onChange={event => { this.handletitle(event.target.value) }} /></div>
                        <div className="project-address-container"> Address  <br /> <input type="text" className="project-field" value={this.getaddress()} onChange={event => { this.handleaddress(event.target.value) }} /></div>
                        <div className="project-location-container">City  <br /><input type="text" className="project-field" value={this.getcity()} onChange={event => { this.handlecity(event.target.value) }} /> </div>
                        <div className="project-location-container">State  <br /><input type="text" className="project-field" value="California" /> </div>
                        <div className="project-scope-container"> Scope of Work  <br /> <textarea id="newprojectscope" className="project-field" onChange={event => { this.handlescope(event.target.value) }} value={this.getscope()}> </textarea></div>
                        <div className="project-message-container">{this.state.message} </div>
                        <div className="project-row-1a"><button id="btnsaveprojects" onClick={event => { this.createproject(event) }}>{clicktoSave()} </button></div>

                    </div>
                    {this.showprojectmenus()}

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
        return (
            this.handleProjects())
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid
    };
}

export default connect(mapStateToProps, actions)(Projects);
