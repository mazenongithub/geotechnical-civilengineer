import React, { Component } from 'react';
import { connect } from 'react-redux';
import './projects.css';
import * as actions from '../actions';
import { UserModel, formatDateReport, randomString, sorttimes, formatDateFromTimeIn, createclientdata } from './functions';
import { getClient, getProject, getEngineer, SaveClientData } from '../actions/api';
import { menuOpen, menuClosed, radioOpen, radioClosed, clicktoSave } from './svg';
import { Link } from 'react-router-dom';
class Project extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geotechnicalreport: false,
            technicalreports: false,
            geology: false,
            lab: false,
            figures: false,
            construction: false,
            event: false,
            budget: false,
            balance: false,
            invoice: false,
            proposal: false,
            message: ""
        }
    }
    componentDidMount() {
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

    getprojecttitle() {
        let projecttitle = "";
        let projectid = this.props.match.params.projectid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        projecttitle = `P${myproject.projectnumber}-${myproject.title}`;
                    }
                })
            }
            return projecttitle;
        }
    }
    getprojectlocation() {
        let projectlocation = "";
        let projectid = this.props.match.params.projectid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        projectlocation = `${myproject.projectaddress} ${myproject.projectcity}`;
                    }
                })
            }
        }
        return projectlocation;
    }
    getprojectscope() {
        let projectscope = "";
        let projectid = this.props.match.params.projectid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        projectscope = `${myproject.proposedproject}`;
                    }
                })
            }
        }
        return projectscope;
    }
    getprojectnumber() {
        let projectnumber = "";
        let projectid = this.props.match.params.projectid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        projectnumber = `P${myproject.projectnumber}`;
                    }
                })
            }
        }
        return projectnumber;
    }
    geotechnicalreporticon(event) {
        if (this.state.geotechnicalreport) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlegeotechnicalreport() {
        if (this.state.geotechnicalreport) {
            this.setState({ geotechnicalreport: false })
        }
        else {
            this.setState({ geotechnicalreport: true })
        }
    }
    checkactivegeotechnical() {
        if (this.state.geotechnicalreport) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    technicalreporticon(event) {
        if (this.state.technicalreports) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handletechnicalreports() {
        if (this.state.technicalreports) {
            this.setState({ technicalreports: false })
        }
        else {
            this.setState({ technicalreports: true })
        }
    }
    checkactivetechnical() {
        if (this.state.technicalreports) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }

    geologyicon(event) {
        if (this.state.geology) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlegeology() {
        if (this.state.geology) {
            this.setState({ geology: false })
        }
        else {
            this.setState({ geology: true })
        }
    }
    checkactivegeology() {
        if (this.state.geology) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }

    labicon(event) {
        if (this.state.lab) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlelab() {
        if (this.state.lab) {
            this.setState({ lab: false })
        }
        else {
            this.setState({ lab: true })
        }
    }
    checkactivelab() {
        if (this.state.lab) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    figuresicon(event) {
        if (this.state.figures) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlefigures() {
        if (this.state.figures) {
            this.setState({ figures: false })
        }
        else {
            this.setState({ figures: true })
        }
    }
    checkactivefigures() {
        if (this.state.figures) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    constructionicon(event) {
        if (this.state.construction) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handleconstruction() {
        if (this.state.construction) {
            this.setState({ construction: false })
        }
        else {
            this.setState({ construction: true })
        }
    }
    checkactiveconstruction() {
        if (this.state.construction) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }

    eventicon(event) {
        if (this.state.event) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handleevent() {
        if (this.state.event) {
            this.setState({ event: false })
        }
        else {
            this.setState({ event: true })
        }
    }
    checkactiveevent() {
        if (this.state.event) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }

    budgeticon(event) {
        if (this.state.budget) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlebudget() {
        if (this.state.budget) {
            this.setState({ budget: false })
        }
        else {
            this.setState({ budget: true })
        }
    }
    checkactivebudget() {
        if (this.state.budget) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }

    balanceicon(event) {
        if (this.state.balance) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handlebalance() {
        if (this.state.balance) {
            this.setState({ balance: false })
        }
        else {
            this.setState({ balance: true })
        }
    }
    checkactivebalance() {
        if (this.state.balance) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    invoiceicon(event) {
        if (this.state.invoice) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handleinvoice() {
        if (this.state.invoice) {
            this.setState({ invoice: false })
        }
        else {
            this.setState({ invoice: true })
        }
    }
    checkactiveinvoice() {
        if (this.state.invoice) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    proposalicon(event) {
        if (this.state.proposal) {
            return (menuOpen())
        }
        else {
            return (menuClosed())
        }

    }
    handleproposal() {
        if (this.state.proposal) {
            this.setState({ proposal: false })
        }
        else {
            this.setState({ proposal: true })
        }
    }
    checkactiveproposal() {
        if (this.state.proposal) {
            return (`active-projectlist`)
        }
        else {
            return (`inactive-projectlist`)
        }
    }
    getlinktoprojects() {
        let clientid = this.props.match.params.clientid;
        return (`/${clientid}/projects`)
    }
    addlinkforlab() {
        let labsummary = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("labsummary")) {
                            labsummary.push(<div className="innerproject-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/labsummary`}>Open Lab Summary</Link>
                                    </div>)

                        }

                    }
                })
            }
        }
        return (<div className="innerproject-container"> 
           
           {labsummary}
         
         </div>)

    }

    loadboringlist() {
        let boringlist = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                return (

                                    boringlist.push(<div className="innerprojectlist-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/geology/${boring.boringid}`}>Boring Number {boring.boringnumber}</Link>
                                    </div>)
                                )
                            })
                        }
                    }
                })
            }
        }



        return (<div className="innerprojectlist-container"> 
           
           {boringlist}
         
         </div>)
    }
    fieldreportlinks() {
        let fieldreports = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("fieldreports")) {
                            // eslint-disable-next-line
                            myproject.fieldreports.fieldreport.map(fieldreport => {
                                fieldreports.push(<div className="innerprojectlist-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/fieldreports/${fieldreport.fieldid}`}> {formatDateReport(fieldreport.datereport)}</Link>
                                    </div>)
                            })
                        }
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container"> 
           
           {fieldreports}
         
         </div>)
    }
    loadreports() {
        let letters = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("letters")) {
                            // eslint-disable-next-line
                            myproject.letters.letter.map(letter => {
                                letters.push(<div className="innerprojectlist-element" key={`${randomString(8)}`}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/reports/${letter.letterid}`}> {letter.reporttitle} {formatDateReport(letter.datereport)}</Link>
                                    </div>)
                            })
                        }
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container"> 
           
           {letters}
         
         </div>)
    }

    loadbudgetlist() {
        let balancelink = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("scheduleitems")) {
                            // eslint-disable-next-line

                            balancelink.push(<div className="innerprojectlist-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/schedule`}> View Project Schedule </Link>
                                    </div>)

                        }
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container"> 
           
           {balancelink}
         
         </div>)
    }

    loadbalancelist() {
        let balancelink = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualitems")) {
                            // eslint-disable-next-line

                            balancelink.push(<div className="innerprojectlist-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/actual`}> View Project Cost </Link>
                                    </div>)

                        }
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container"> 
           
           {balancelink}
         
         </div>)
    }
    getinvoicedate(invoiceid) {
        let costitems = [];
        let invoicedate = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("actualitems")) {
                            // eslint-disable-next-line
                            myproject.actualitems.actualitem.map(item => {
                                costitems.push(item)
                            })

                        }
                    }
                })
            }
        }

        costitems = costitems.sort((a, b) => {
            return sorttimes(a.timein, b.timein)
        })

        let dateinvoice = costitems[costitems.length - 1].timein;
        invoicedate = formatDateFromTimeIn(dateinvoice)
        return invoicedate;
    }


    getinvoicedatefromcostitems(costitems) {
        let invoicedate = "";
        return invoicedate;
    }
    loadinvoicelist() {
        let invoicelink = [];
        let projectid = this.props.match.params.projectid;
        let clientid = this.props.match.params.clientid;

        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("invoices")) {

                            // eslint-disable-next-line
                            myproject.invoices.invoice.map(invoice => {

                                invoicelink.push(<div className="innerprojectlist-element" key={randomString(10)}>
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/invoices/${invoice.invoiceid}`}> {invoice.invoiceid} {this.getinvoicedate(invoice.invoiceid)} </Link>
                                    </div>)
                            })


                        }
                    }
                })
            }
        }


        return (<div className="innerprojectlist-container"> 
           
           {invoicelink}
         
         </div>)
    }

    loadeventlist() {

        let clientid = this.props.match.params.clientid;
        let projectid = this.props.match.params.projectid;
        return (<div className="innerprojectlist-container"> 
                     <div className="innerprojectlist-element">
                                    <Link className="project-link" to={`/${clientid}/projects/${projectid}/events`}> Add Events </Link>
                                   </div>
                  </div>)
    }
    handleSingleFamily(event) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].proposed = "single-family"
                    }
                })
            }
        }

        this.setState({ render: 'render' });
    }
    handleAddition(event) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].proposed = "addition"
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    handleSubdivision(event) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].proposed = "subdivision"
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    handleOther(event) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].proposed = "other"
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    getsinglefamily() {
        let button = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.proposed === "single-family") {
                            button.push(radioClosed())
                        }
                        else {
                            button.push(radioOpen())
                        }
                    }
                })
            }
        }
        return button;
    }
    getaddition() {
        let button = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.proposed === "addition") {
                            button.push(radioClosed())
                        }
                        else {
                            button.push(radioOpen())
                        }
                    }
                })
            }
        }
        return button;

    }
    getsubdivision() {
        let button = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.proposed === "subdivision") {
                            button.push(radioClosed())
                        }
                        else {
                            button.push(radioOpen())
                        }
                    }
                })
            }
        }
        return button;
    }
    getother() {

        let button = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.proposed === "other") {
                            button.push(radioClosed())
                        }
                        else {
                            button.push(radioOpen())
                        }
                    }
                })
            }
        }
        return button;
    }
    gettitle() {
        let title = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        title = myproject.title;
                    }
                })
            }
        }
        return title;
    }
    handletitle(value) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].title = value;
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    getaddress() {
        let address = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        address = myproject.projectaddress;
                    }
                })
            }
        }
        return address;
    }
    handleaddress(value) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].projectaddress = value;
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    getcity() {
        let city = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        city = myproject.projectcity;
                    }
                })
            }
        }
        return city;
    }
    handlecity(value) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].projectcity = value;
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    handlescope(value) {
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        this.props.projects[i].proposedproject = value;
                    }
                })
            }
        }
        this.setState({ render: 'render' });
    }
    getscope() {
        let scope = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                let projectid = this.props.match.params.projectid;
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        scope = myproject.proposedproject;
                    }
                })
            }
        }
        return scope;
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
        console.log(values)
        if (response.hasOwnProperty("message")) {
            this.setState({ message: response.message })
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
    handleProject() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.clientid) {
                return (<div className="project-outercontainer">
            <div className="project-container">
              <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Projects`} </Link> </div>
                 <div className="project-title">{this.getprojecttitle()} </div>
                <div className="project-showlocation">{this.getprojectlocation()} </div>
               <div className="project-scope">
                <ul className="none">
                    <li><button className="proposed-radio" onClick={event=>{this.handleSingleFamily(event)}}><label className="radio-label">{this.getsinglefamily()} </label></button>New Single Family Residential </li>
                    <li><button className="proposed-radio" onClick={event=>{this.handleAddition(event)}}><label className="radio-label">{this.getaddition()}</label></button> Addition to Existing Residence </li>
                    <li><button className="proposed-radio" onClick={event=>{this.handleSubdivision(event)}}><label className="radio-label">{this.getsubdivision()}</label> </button> Multi Housing Unit Development </li>
                    <li><button className="proposed-radio" onClick={event=>{this.handleOther(event)}}><label className="radio-label">{this.getother()}</label></button> Other </li>
                </ul>
                </div>
            <div className="project-title-container">Project Title  <br/><input type="text" className="project-field" value={this.gettitle()} onChange={event=>{this.handletitle(event.target.value)}} /></div>
            <div className="project-address-container"> Address  <br/> <input type="text" className="project-field" value={this.getaddress()} onChange={event=>{this.handleaddress(event.target.value)}} /></div>
            <div className="project-location-container">City  <br/><input type="text" className="project-field" value={this.getcity()} onChange={event=>{this.handlecity(event.target.value)}} /> </div>
            <div className="project-location-container">State  <br/><input type="text" className="project-field" value="California" /> </div>
            <div className="project-scope-container"> Scope of Work  <br/> <textarea id="newprojectscope"className="project-field" onChange={event=>{this.handlescope(event.target.value)}} value={this.getscope()}> </textarea></div>
              <div className="project-row-1a"><button id="btnsaveprojects" onClick={event=>{this.saveclient(event)}}>{clicktoSave()} </button></div> 
              <div className="project-message-container">{this.state.message} </div>
            </div>
            
            
            
            <div className="projectid-container">{this.getprojectnumber()}</div>
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlegeotechnicalreport(event)}}>{this.geotechnicalreporticon()}</button>
                <label className="subprojectlabel">Geotechnical Report </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivegeotechnical()}`}>&nbsp; </div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handletechnicalreports(event)}}>{this.technicalreporticon()}</button>
                <label className="subprojectlabel">Technical Reports </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivetechnical()}`}>{this.loadreports()}</div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlegeology(event)}}>{this.geologyicon()}</button>
                <label className="subprojectlabel">Geology </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivegeology()}`}>{this.loadboringlist()} </div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlelab(event)}}>{this.labicon()}</button>
                <label className="subprojectlabel">Lab Summary </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivelab()}`}>{this.addlinkforlab()} </div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlefigures(event)}}>{this.figuresicon()}</button>
                <label className="subprojectlabel">Figures </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivefigures()}`}>&nbsp; </div>
            
             <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handleconstruction(event)}}>{this.constructionicon()}</button>
                <label className="subprojectlabel">Construction </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactiveconstruction()}`}>{this.fieldreportlinks()} </div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handleevent(event)}}>{this.eventicon()}</button>
                <label className="subprojectlabel">Schedule An Event </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactiveevent()}`}>{this.loadeventlist()} </div>
            
             <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlebudget(event)}}>{this.budgeticon()}</button>
                <label className="subprojectlabel">Budget/Schedule </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivebudget()}`}>{this.loadbudgetlist()}</div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handlebalance(event)}}>{this.balanceicon()}</button>
                <label className="subprojectlabel">Balance/Actual </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactivebalance()}`}>{this.loadbalancelist()}</div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handleinvoice(event)}}>{this.invoiceicon()}</button>
                <label className="subprojectlabel">Invoices </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactiveinvoice()}`}>{this.loadinvoicelist()} </div>
            
            <div className={`projectid-subcontainer`}>
                <button className="project-subicon" onClick={event=>{this.handleproposal(event)}}>{this.proposalicon()}</button>
                <label className="subprojectlabel">Proposals </label>
            </div>
            <div className={`projectid-projectlist ${this.checkactiveproposal()}`}>&nbsp; </div>
        
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
            this.handleProject())
    }

}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid,
        engineers: state.engineers
    };
}

export default connect(mapStateToProps, actions)(Project);
