import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getclientprojectlist } from '../actions/api';
import './viewproject.css';
import _ from 'lodash';
class ViewProject extends Component {
    constructor(props) {
        super(props);

        this.state = {
            allmyprojects: {},
            myprojects: [],
            borings: [],
            myproject: {},
            projectid: ""
        }
    }
    componentDidMount() {
        var headers = document.querySelectorAll(".collapse-header");
        for (var i = 0; i < headers.length; i++) {
            headers[i].addEventListener('click', function() {
                var headerid = (this).id;
                for (var i = 0; i < headers.length; i++) {
                    if (headers[i].id === headerid) {
                        var mycontent = headers[i]
                        mycontent.nextSibling.classList.toggle("display-none");
                    }
                }

            })
            headers[i].addEventListener("mousedown", function() {
                (this).classList.toggle("proj-highlight");
            })

            headers[i].addEventListener("mouseup", function() {
                (this).classList.toggle("proj-highlight");
            })

            headers[i].addEventListener("mouseout", function() {
                (this).classList.remove("proj-highlight");
                (this).classList.remove("proj-mouseover");
            })

        }

        this.loadmyprojects();

    } //end component did mount

    async loadmyprojects() {
        var returned = false;
        var clientid = this.props.match.params.clientid
        let loadmyprojects = await getclientprojectlist(clientid);
        var myprojects = [];
        console.log(loadmyprojects)
        _.map(loadmyprojects.allmyprojects.myproject, (myproject, i) => {
            if (i >= 0) {

                myprojects.push(myproject)
            }
            else {
                if (!returned) {
                    returned = true
                    myprojects.push(loadmyprojects.allmyprojects.myproject)
                }
            }
        })

        this.setState({ myprojects })
    }

    findprojectbyid() {
        // eslint-disable-next-line
        this.state.myprojects.map((myproject) => {

            if (myproject.projectid === this.state.projectid) {

                this.setState({ myproject })

            }



        })

    }
    getprojectlist() {
        return this.state.myprojects.map((myproject) => {
            return (<option value={myproject.projectid} key={myproject.projectid}>{myproject.projectnumber} - {myproject.title} </option>)
        })

    }
    showborings() {
        var returned = false;
        if (this.state.myproject) {
            if (this.state.myproject.borings) {

                return _.map(this.state.myproject.borings.myboring, (myboring, i) => {
                    if (i >= 0) {
                        return (<li><a href={`https://www.egeotechnical.com/logdraftreport.php?boringid=${myboring.boringid}`} target="_blank"> Boring Number {myboring.boringnumber} </a> </li>)
                    }
                    else {
                        if (!returned) {
                            returned = true;
                            myboring = this.state.myproject.borings.myboring;
                            return (<li><a href={`https://www.egeotechnical.com/logdraftreport.php?boringid=${myboring.boringid}`} target="_blank"> Boring Number {myboring.boringnumber} </a></li>)
                        }

                    }

                })
            }
        }
    }

    showfigures() {
        var returned = false;
        if (this.state.myproject) {
            if (this.state.myproject.hasOwnProperty("projectfigures")) {

                return _.map(this.state.myproject.projectfigures.myfigure, (myfigure, i) => {
                    if (i >= 0) {
                        return (<li>
                        <a href={`/${myfigure.projectid}/figures/${myfigure.figurenumber}`} 
                            target="_blank">
                            Figure Number {myfigure.figurenumber} 
                            </a> </li>)
                    }
                    else {
                        if (!returned) {
                            returned = true;
                            myfigure = this.state.myproject.projectfigures.myfigure;
                            return (<li><a href={`/${myfigure.projectid}/figures/${myfigure.figurenumber}`} 
                            target="_blank">
                            Figure Number {myfigure.figurenumber} 
                            </a></li>)
                        }

                    }

                })
            }
        }
    }
    showfieldreports() {
        var returned = false;
        if (this.state.myproject) {
            if (this.state.myproject.fieldreport) {

                return _.map(this.state.myproject.fieldreport, (fieldreport, i) => {
                    if (i >= 0) {
                        return (<li><a href={`/fieldreport/${fieldreport.fieldid}`} target="_blank">  {fieldreport.datereport} </a> </li>)
                    }
                    else {
                        if (!returned) {
                            returned = true;
                            fieldreport = this.state.myproject.fieldreport;
                            return (<li><a href={`/fieldreport/${fieldreport.fieldid}`} target="_blank">  {fieldreport.datereport} </a> </li>)
                        }

                    }

                })
            }
        }
    }
    showlabsummary() {
        if (this.state.projectid > 0) {
            if (this.state.myproject) {
                return (<a href={`/showlabsummary/${this.state.myproject.projectid}`} target="_blank"> Lab Summary Project Number: {this.state.myproject.projectnumber} {this.state.myproject.title}</a>)
            }
        }
        else {
            return (<span>&nbsp;</span>)
        }
    }
    showprojectletters() {
        if (this.state.projectid > 0) {
            var returned = false;
            if (this.state.myproject) {
                return _.map(this.state.myproject.myletter, (myletter, i) => {
                    if (i >= 0) {
                        return (<li><a href={`/showletter/${myletter.letterid}`} target="_blank"> {myletter.dateletter} {myletter.reporttitle} </a> </li>)
                    }
                    else {
                        myletter = this.state.myproject.myletter;
                        if (!returned) {
                            returned = true;
                            return (<li><a href={`/showletter/${myletter.letterid}`} target="_blank"> {myletter.dateletter} {myletter.reporttitle} </a> </li>)
                        }
                    }
                })
            }

        }
        else {
            return (<span>&nbsp; </span>)
        }

    }
    showbalance() {
        if (this.state.projectid > 0) {
            if (this.state.myproject) {

                return (<a href={`/showbalance/${this.state.myproject.projectid}`} target="_blank"> Project Number {this.state.myproject.projectnumber} {this.state.myproject.title} </a>)
            }
        }
        else {
            return (<span>&nbsp; </span>)
        }
    }
    showbudget() {
        if (this.state.projectid > 0) {
            if (this.state.myproject) {
                return (<a href={`/showbudget/${this.state.myproject.projectid}`} target="_blank"> Project Number: {this.state.myproject.projectnumber} {this.state.myproject.title}</a>)
            }
        }
        else {
            return (<span>&nbsp;</span>)
        }
    }
    showprojectinvoices() {
        if (this.state.projectid > 0) {
            var returned = false;
            if (this.state.myproject) {
                return _.map(this.state.myproject.myinvoice, (myinvoice, i) => {
                    if (i >= 0) {
                        return (<li><a href={`/showinvoice/${myinvoice.invoiceid}`} target="_blank"> Invoice No. {myinvoice.invoice} {myinvoice.enddate} </a> </li>)
                    }
                    else {
                        myinvoice = this.state.myproject.myinvoice;
                        if (!returned) {
                            returned = true;
                            return (<li><a href={`/showinvoice/${myinvoice.invoiceid}`} target="_blank"> Invoice No. {myinvoice.invoice} {myinvoice.enddate} </a> </li>)
                        }
                    }
                })
            }

        }
        else {
            return (<span>&nbsp; </span>)
        }
    }



    showservicerequest() {
        if (this.state.myproject) {
            if (this.state.myproject.servicerequest > 0) {
                return (<a href={`/showservicerequest/${this.state.myproject.servicerequest}`} target="_blank"> Service Request: {this.state.myproject.servicerequest} </a>)

            }
            else {
                return (<span>&nbsp;</span>)
            }
        }
        else {
            return (<span>&nbsp;</span>)
        }
    }

    render() {
        return (<div className="collapse-container">
<div className="proj-fullWidth" id="proj-header-div"> <select id="proj-projid" name="projectid" value={this.state.projectid}     
    onChange={event => this.setState({[event.target.name]: event.target.value}, () => {
    this.findprojectbyid();
    })
    }> <option value="">Select A Project to View </option>{this.getprojectlist()}</select> </div>
<div className="collapse-header" id="proj-logs"> Project Geologic Logs </div>
<div className="collapse-content"><ul>{this.showborings()} </ul> </div>
<div className="collapse-header" id="proj-lab"> Project Lab Summary </div>
<div className="collapse-content"><ul>{this.showlabsummary()} </ul> </div>
<div className="collapse-header" id="proj-letters"> Project Letters</div>
<div className="collapse-content"><ul>{this.showprojectletters()} </ul> </div>
<div className="collapse-header" id="proj-field"> Field Reports</div>
<div className="collapse-content">{this.showfieldreports()}</div>
<div className="collapse-header" id="proj-projectsummary">Project Balance </div>
<div className="collapse-content"> {this.showbalance()} </div>
<div className="collapse-header" id="proj-projectbudget"> Project Budget </div>
<div className="collapse-content">{this.showbudget()}  </div>
<div className="collapse-header" id="proj-invoices"> Project Invoices </div>
<div className="collapse-content"><ul>{this.showprojectinvoices()} </ul> </div>
<div className="collapse-header" id="proj-service"> Project Figures </div>
<div className="collapse-content"><ul>{this.showfigures()} </ul> </div>
<div className="collapse-header" id="proj-service"> Project Service Request </div>
<div className="collapse-content">{this.showservicerequest()}  </div>
</div>)
    }


} // end of component

function mapStateToProps(state) {
    return { myusermodel: state.myusermodel }
}
export default connect(mapStateToProps)(ViewProject)
