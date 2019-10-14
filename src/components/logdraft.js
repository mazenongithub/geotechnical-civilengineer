import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { UserModel, formatDateReport, inputUTCStringOutputDateString } from './functions';
import { getClient, getProject } from '../actions/api';
import { Link } from 'react-router-dom';
import './logdraft.css';

class Logdraft extends Component {
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
    }
    async getclient(clientid) {
        let response = await getClient(clientid);
        console.log(response)
        let myusermodel = UserModel(response.clientid, response.gender, response.firstname, response.lastname, response.contactcompany, response.contactaddress, response.contactcity, response.contactstate, response.contactzipcode, response.contactemail, response.contactphonenumber)
        this.props.reduxUser(myusermodel)


        if (response.hasOwnProperty("projects")) {
            this.props.reduxProjects(response.projects.project)
            if (response.projects.project.hasOwnProperty("length")) {
                let projectlength = response.projects.project.length;
                let activeprojectid = response.projects.project[projectlength - 1].projectid;
                this.props.reduxProjectID(activeprojectid);
            }

        }
        this.setState({ render: 'render' })

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
    showdescription(description, depth) {


        return (
            <foreignObject x="156" y={`${Math.ceil(115.5+(30*depth))}`} width="431" height="700">
<div className="logdraft-description">
<text>{description} </text>
</div>
</foreignObject>
        )




    }
    drawfootlabel(depth) {
        return (<text className="logdraft-7" width="22" text-anchor="middle" transform={`translate(12.5 ${130.5 + (30*depth)}) scale(1 1)`}>{depth}</text>)
    }
    showsamplenumber(samplenos, depth) {
        return (<text className="logdraft-7" width="26" text-anchor="middle" transform={`translate(36.5 ${131.5 + (30*depth)}) scale(0.7 0.65)`}>{samplenos}</text>)
    }
    loadsamplenumber() {
        let samplenumber = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (boringdata.samplenumber) {
                                                    samplenumber.push(this.showsamplenumber(boringdata.samplenumber, boringdata.depth))
                                                }

                                            })
                                        }

                                    }

                                }
                            })
                        }
                    }
                })
            }
        }
        return samplenumber;
    }
    loaddescription() {
        let description = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {

                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (boringdata.description) {
                                                    description.push(this.showdescription(boringdata.description, boringdata.depth))
                                                }

                                            })
                                        }
                                    }



                                }
                            })
                        }
                    }
                })
            }
        }
        return description;
    }
    loaddryden() {
        let dryden = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (Number(boringdata.dryden) > 0) {
                                                    dryden.push(this.showdryden(boringdata.dryden, boringdata.depth))
                                                }

                                            })
                                        }
                                    }



                                }
                            })
                        }
                    }
                })
            }
        }
        return dryden;
    }
    showdryden(dryden, depth) {
        if (Number(dryden > 0)) {
            return (<text width="59" className="logdraft-label" text-anchor="middle" x="735" y={`${131.5  + (30*depth)}`}>{dryden} </text>)
        }
    }
    loadmoisturecontent() {
        let moisturecontent = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (Number(boringdata.moisturecontent) > 0) {
                                                    moisturecontent.push(this.showmoisturecontent(boringdata.moisturecontent, boringdata.depth))
                                                }

                                            })
                                        }

                                    }

                                }
                            })
                        }
                    }
                })
            }
        }
        return moisturecontent;
    }
    showmoisturecontent(moisturecontent, depth) {
        if (Number(moisturecontent > 0)) {
            return (<text x="778" className="logdraft-label" y={`${131.5  + (30*depth)}`}>{moisturecontent} </text>)
        }
    }
    loadspt() {
        let spt = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (boringdata.spt) {
                                                    spt.push(this.showspt(boringdata.spt, boringdata.depth))
                                                }

                                            })
                                        }
                                    }



                                }
                            })
                        }
                    }
                })
            }
        }
        return spt;
    }
    showspt(spt, depth) {
        if (spt) {
            return (<text width="59" className="logdraft-label" text-anchor="middle" x="675" y={`${131.5  + (30*depth)}`}>{spt} </text>)
        }
    }
    loadremarks() {
        let remarks = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (boringdata.remarks) {
                                                    remarks.push(this.showremarks(boringdata.remarks, boringdata.depth))
                                                }

                                            })
                                        }

                                    }

                                }
                            })
                        }
                    }
                })
            }
        }
        return remarks;
    }
    showremarks(remarks, depth) {
        if (remarks) {
            return (<foreignObject x="824" y={`${115.5  + (30*depth)}`} width="176" height="600">
            <div className="logdraft-description"><text>{remarks} </text></div></foreignObject>)
        }
    }

    loaduscs() {
        let uscs = [];
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {

                                    if (boring.hasOwnProperty("boringdata")) {

                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (boringdata.uscs) {
                                                    uscs.push(this.showuscs(boringdata.uscs, boringdata.depth))
                                                }

                                            })
                                        }
                                    }



                                }
                            })
                        }
                    }
                })
            }
        }
        return uscs;
    }
    showuscs(uscs, depth) {
        if (uscs) {
            return (<text className="logdraft-label" x="616" width="59" y={`${131.5  + (30*depth)}`} text-anchor="middle">{uscs} </text>)
        }
    }
    completeblock() {
        let boringid = this.props.match.params.boringid;
        let projectid = this.props.match.params.projectid;
        let completeblock = [];
        let bottomdepth = 0;
        let title = "";
        let projectnumber = "";
        let figure = "";
        let datereport = "";
        let address = ""
        let city = "";
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        address = myproject.projectaddress;
                        projectnumber = myproject.projectnumber;
                        city = myproject.projectcity;
                        title = myproject.title;
                        if (myproject.hasOwnProperty("borings")) {

                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {

                                if (boring.boringid === boringid) {
                                    datereport = boring.datereport;
                                    figure = boring.figure;

                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            bottomdepth = Number(boring.boringdata.data[boring.boringdata.data.length - 1].depth);
                                        }
                                    }
                                }

                            })
                        }
                    }

                })
            }
        }
        if (bottomdepth > 0) {
            completeblock.push(<line className="logdraft-2" x1="49.5" y1="131.5" x2="49.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="75.5" y1="131.5" x2="75.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="155.5" y1="131.5" x2="155.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="586.5" y1="131.5" x2="586.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="646.5" y1="131.5" x2="646.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="705.5" y1="131.5" x2="705.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="764.5" y1="131.5" x2="764.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="823.5" y1="131.5" x2="823.5" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)
            completeblock.push(<line className="logdraft-2" x1="23.5" y1={`${131.5 + (30 * Number(bottomdepth))}`} x2="1000" y2={`${131.5 + (30 * Number(bottomdepth))}`}/>)

        }

        if (Math.ceil(bottomdepth) < 32) {
            completeblock.push(<rect className="logdraft-2" x="1.5" y="1095.5" width="416" height="198.5"/>)
            completeblock.push(<rect className="logdraft-2" x="417.5" y="1095.5" width="584" height="50"/>)
            completeblock.push(<rect className="logdraft-2" x="417.5" y="1244.5" width="194.33" height="49"/>)
            completeblock.push(<rect className="logdraft-2" x="611.83" y="1244.5" width="194.33" height="49"/>)
            completeblock.push(<rect className="logdraft-2" x="806.17" y="1244.5" width="194.33" height="49"/>)
            completeblock.push(<line className="logdraft-2" x1="23.5" y1="1091.5" x2="23.5" y2="1095.5"/>)
            completeblock.push(<rect className="logdraft-1" x="1" y="1" width="1000" height="1293"/>)

            completeblock.push(<text className="logdraft-16" transform="translate(441.9 1131)">
                   EXP<tspan className="logdraft-17" x="77.27" y="0">L</tspan>
                   <tspan x="99.33" y="0">OR</tspan><tspan className="logdraft-18" x="154.07" y="0">A</tspan>
                   <tspan className="logdraft-19" x="179.62" y="0">T</tspan><tspan x="204.69" y="0">O</tspan>
                   <tspan className="logdraft-20" x="233.25" y="0">R</tspan><tspan x="258.58" y="0">Y BORING </tspan>
                   <tspan className="logdraft-17" x="462.08" y="0">L</tspan><tspan x="484.13" y="0">OG</tspan></text>)


            completeblock.push(<text className="logdraft-21" transform="translate(462.54 1263)">P
                                <tspan className="logdraft-22" x="13.3" y="0">r</tspan>
                                <tspan x="20.37" y="0">oject No.</tspan></text>)
            completeblock.push(<text className="logdraft-21" transform="translate(687.24 1263)">Date</text>)
            completeblock.push(<text className="logdraft-21" transform="translate(868.08 1263)">FIGURE</text>)

            completeblock.push(<foreignObject x="418" y="1141" width="582" height="140">
            <div className="logdraft-title"><text>{title} </text></div></foreignObject>)
            completeblock.push(<foreignObject x="418" y="1191" width="582" height="140">
            <div className="logdraft-title"><text>{address} {city}, CA </text></div></foreignObject>)
            completeblock.push(<text x="510" y="1290" text-anchor="middle" className="logdraft-title">{projectnumber} </text>)
            completeblock.push(<text className="logdraft-title" x="710" y="1290" text-anchor="middle">{formatDateReport(datereport)} </text>)
            completeblock.push(<text className="logdraft-title" x="904" y="1290" text-anchor="middle">{figure} </text>)

            //add ft labels
            for (let i = 5; i <= 32; i += 5) {
                completeblock.push(this.drawfootlabel(i));
            }
        }
        else {

            completeblock.push(<rect className="logdraft-2" x="1.5" y={1091.5 + (30*(Math.ceil(bottomdepth)-32))} width="416" height="198.5"/>)
            completeblock.push(<rect className="logdraft-2" x="417.5" y={1091.5 + (30*(Math.ceil(bottomdepth)-32))} width="584" height="50"/>)
            completeblock.push(<rect className="logdraft-2" x="417.5" y={1240.5 + (30*(Math.ceil(bottomdepth)-32))} width="194.33" height="49"/>)
            completeblock.push(<rect className="logdraft-2" x="611.83" y={1240.5 + (30*(Math.ceil(bottomdepth)-32))} width="194.33" height="49"/>)
            completeblock.push(<rect className="logdraft-2" x="806.17" y={1240.5 + (30*(Math.ceil(bottomdepth)-32))} width="194.33" height="49"/>)
            completeblock.push(<rect className="logdraft-1" x="1" y="1" width="1000" height={1289.5 + (30*(Math.ceil(bottomdepth)-32))}/>)


            completeblock.push(<text className="logdraft-16" transform={`translate(441.9 ${1127+ (30*(Math.ceil(bottomdepth)-32))})`}>
                   EXP<tspan className="logdraft-17" x="77.27" y="0">L</tspan>
                   <tspan x="99.33" y="0">OR</tspan><tspan className="logdraft-18" x="154.07" y="0">A</tspan>
                   <tspan className="logdraft-19" x="179.62" y="0">T</tspan><tspan x="204.69" y="0">O</tspan>
                   <tspan className="logdraft-20" x="233.25" y="0">R</tspan><tspan x="258.58" y="0">Y BORING </tspan>
                   <tspan className="logdraft-17" x="462.08" y="0">L</tspan><tspan x="484.13" y="0">OG</tspan></text>)


            completeblock.push(<text className="logdraft-21" transform={`translate(462.54 ${1259 + + (30*(Math.ceil(bottomdepth)-32))})`}>P
                                <tspan className="logdraft-22" x="13.3" y="0">r</tspan>
                                <tspan x="20.37" y="0">oject No.</tspan></text>)
            completeblock.push(<text className="logdraft-21" transform={`translate(687.24 ${1259 + + (30*(Math.ceil(bottomdepth)-32))})`}>Date</text>)
            completeblock.push(<text className="logdraft-21" transform={`translate(868.08 ${1259 + + (30*(Math.ceil(bottomdepth)-32))})`}>FIGURE</text>)

            completeblock.push(<foreignObject x="418" y={1137+ (30*(Math.ceil(bottomdepth)-32))} width="582" height="140">
            <div className="logdraft-title"><text>{title} </text></div></foreignObject>)
            completeblock.push(<foreignObject x="418" y={1187+ (30*(Math.ceil(bottomdepth)-32))} width="582" height="140">
            <div className="logdraft-title"><text>{address} {city}, CA </text></div></foreignObject>)
            completeblock.push(<text x="510" y={1286+ (30*(Math.ceil(bottomdepth)-32))} text-anchor="middle" className="logdraft-title">{projectnumber} </text>)
            completeblock.push(<text className="logdraft-title" x="710" y={1286 + (30*(Math.ceil(bottomdepth)-32))} text-anchor="middle">{formatDateReport(datereport)} </text>)
            completeblock.push(<text className="logdraft-title" x="904" y={1286 + (30*(Math.ceil(bottomdepth)-32))} text-anchor="middle">{figure} </text>)



            let limit = Math.ceil(bottomdepth) - 32
            let maxlabel = Math.ceil(bottomdepth);
            for (let i = 0; i <= limit; i++) {
                completeblock.push(<rect className="logdraft-2" x="0.5" y={1061.5+ (30*i)} width="23" height="30"/>)
            }
            for (let i = 5; i <= maxlabel; i += 5) {
                completeblock.push(this.drawfootlabel(i));
            }

        }
        return completeblock;
    }
    showgraphic(y1, y2, url) {
        let graphic = `http://www.egeotechnical.com/${url}`

        let style = {
            backgroundImage: `url(${graphic}`,
            width: "100%",
            height: "100%"
        }
        return (
            <g transform="translate(75.5,131.5)">
    <foreignObject width="80" height={(y2 - y1)*30} x="0" y={y1*30}>
        <div style={style}>
&nbsp;
        </div>
    </foreignObject>
</g>)

    }

    loadsampletype() {
        let boringid = this.props.match.params.boringid;
        let projectid = this.props.match.params.projectid;
        let sampletype = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {

                                if (boring.boringid === boringid) {
                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            // eslint-disable-next-line
                                            boring.boringdata.data.map(boringdata => {
                                                if (Number(boringdata.sampletype) > 0) {
                                                    sampletype.push(this.drawsample(boringdata.depth, Number(boringdata.samplelength), Number(boringdata.sampletype)))
                                                }
                                            })
                                        }


                                    }
                                }

                            })
                        }
                    }

                })
            }
        }
        return sampletype;
    }
    drawsample(depth, length, sampletype) {
        let style = { stroke: "black", strokeWidth: 1, fill: "none" }
        let style_1 = { stroke: "black" }
        let style_2 = { stroke: "black", strokeWidth: 1 };
        switch (sampletype) {
            case 1:
                return (<g transform={`translate(50,${131.5 +(30*depth)})`}>
                <rect x="0" y="0" height={length * 30} width="25" style={style_2}></rect>
                <line x1="25" x2="0" y1="0" y2={length * 30} style={style_1}></line>
                </g>)
            case 2:
                return (<g transform={`translate(50,${131.5 +(30*depth)})`}>
        <line x1="0" x2="25" y1="0" y2={length * 30} style={style_1}></line>
        <rect x="0" y="0" height={length * 30} width="25"  style={style}></rect>
        <line x1="25" x2="0" y1="0" y2={length * 30}  style={style_1}></line></g>);
            case 3:
                return (
                    <g transform={`translate(50,${131.5 +(30*depth)})`}>
        <path d={`M 25 0 L 0 ${length * 30} L 25 ${length * 30} Z`}></path>
        <rect x="0" y="0" height={length * 30} width="25" style={style}> </rect>
        <line x1="25" x2="0" y1="0" y2={length * 30} style={style_1}></line></g>)
            default:
                return;
        }

    }

    loadgraphics() {

        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        let graphics = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map((myproject, i) => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map((boring, j) => {
                                if (boring.boringid === boringid) {
                                    if (boring.hasOwnProperty("graphics")) {
                                        // eslint-disable-next-line 
                                        for (let k = 0; k < boring.graphics.graphic.length; k++) {

                                            let url = boring.graphics.graphic[k].url;
                                            if (k === 0) {
                                                let y1 = 0;
                                                let y2 = boring.graphics.graphic[k].depth;
                                                graphics.push(this.showgraphic(y1, y2, url))

                                            }
                                            else {
                                                let y1 = boring.graphics.graphic[k - 1].depth;
                                                let y2 = boring.graphics.graphic[k].depth;
                                                graphics.push(this.showgraphic(y1, y2, url))

                                            }


                                        }
                                    }

                                }
                            })
                        }
                    }
                })

            }
        }
        return graphics;
    }

    viewBox() {
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        let viewBox = "0 0 1002 1295"
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {
                                    if (boring.hasOwnProperty("boringdata")) {
                                        if (boring.boringdata.data.hasOwnProperty("length")) {
                                            let bottomdepth = Math.ceil(Number(boring.boringdata.data[boring.boringdata.data.length - 1].depth));
                                            if (bottomdepth > 32) {
                                                viewBox = `0 0 1002 ${1291 + 30*(bottomdepth - 32)}`
                                            }
                                        }

                                    }
                                }
                            })
                        }
                    }
                })

            }
        }
        return viewBox;
    }
    showloginfo() {
        let projectid = this.props.match.params.projectid;
        let boringid = this.props.match.params.boringid;
        let loggedby = [];
        if (this.props.projects) {
            if (this.props.projects.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.projects.map(myproject => {
                    if (myproject.projectid === projectid) {
                        if (myproject.hasOwnProperty("borings")) {
                            // eslint-disable-next-line
                            myproject.borings.boring.map(boring => {
                                if (boring.boringid === boringid) {
                                    loggedby.push(<text className="logdraft-label" transform="translate(2,16)">Logged By: {boring.loggedby}</text>)
                                    loggedby.push(<text className="logdraft-label" transform="translate(335,16)">Boring Diameter: {boring.boringdiameter}</text>)
                                    loggedby.push(<text className="logdraft-label" transform="translate(668,16)">Boring Number: {boring.boringnumber}</text>)

                                    loggedby.push(<text className="logdraft-label" transform="translate(2,46)">Drill Rig: {boring.drillrig}</text>)
                                    loggedby.push(<text className="logdraft-label" transform="translate(335,46)">Surface Elevation: {boring.boringdiameter}</text>)
                                    loggedby.push(<text className="logdraft-label" transform="translate(668,46)">Date Drilled: {inputUTCStringOutputDateString(boring.datedrilled)}</text>)
                                }
                            })
                        }
                    }
                })
            }
        }
        return loggedby;
    }
    getlinktoprojects() {
        let clientid = this.props.match.params.clientid;
        let projectid = this.props.match.params.projectid;
        return (`/${clientid}/projects/${projectid}`)
    }
    handleLogdraft() {
        if (this.props.myusermodel) {
            if (this.props.myusermodel.hasOwnProperty("clientid")) {
                return (<div className="logdraft-container">
             <div className="project-linktoprojects"><Link to={this.getlinktoprojects()} className="project-link"> {`<< Back to Project`} </Link> </div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox={this.viewBox()}><defs><style></style></defs><title>logdraftblock</title>
                <g id="Layer_2" data-name="Layer 2"><g id="Frame">
                <rect className="logdraft-2" x="0.5" y="0.5" width="1000.5" height="61.5"/>
                <rect className="logdraft-2" x="0.5" y="1.5" width="333.33" height="30"/>
                {this.showloginfo()}
                <rect className="logdraft-2" x="333.83" y="1.5" width="333.33" height="30"/>
                
                <rect className="logdraft-2" x="667.17" y="1.5" width="333.33" height="30"/>
                <rect className="logdraft-2" x="0.5" y="31.5" width="333.33" height="30"/>
                <rect className="logdraft-2" x="333.83" y="31.5" width="333.33" height="30"/>
                <rect className="logdraft-2" x="667.17" y="31.5" width="333.33" height="30"/>
                
                
                
                
                
                <text className="logdraft-3" transform="translate(41.27 71.15) scale(1 0.65)">Sample<tspan x="0" y="79.2"> </tspan><tspan x="-12" y="19.8">No.</tspan></text>
                <text className="logdraft-3" transform="translate(69.27 71.15) scale(1 0.65)">Sample<tspan x="0" y="79.2"> </tspan><tspan x="-12" y="13.2">Type</tspan></text><text className="logdraft-4" transform="translate(12.69 64) scale(0.99 0.58)">D<tspan className="logdraft-5" x="0" y="16">epth</tspan></text>
                <text className="logdraft-6" transform="translate(12.69 111.51) scale(1 0.65)"> </text><text className="logdraft-7" transform="translate(3.85 124) scale(0.7 0.65)">(ft)</text>
                <text className="logdraft-8" transform="translate(79.46 99.5) scale(0.7 0.79)">G<tspan className="logdraft-9" x="12.43" y="0">r</tspan><tspan x="19.36" y="0">aphic Log</tspan></text>
                <text className="logdraft-8" transform="translate(336.89 99.5) scale(0.7 0.79)">Description</text>
                <text className="logdraft-8" transform="translate(600.97 99.5) scale(0.7 0.79)">USCS</text>
                <text className="logdraft-8" transform="translate(665.33 99.5) scale(0.7 0.79)">SP<tspan className="logdraft-10" x="22.9" y="0">T</tspan></text>
                <text className="logdraft-11" transform="translate(706.99 99.5) scale(0.56 0.79)">D<tspan className="logdraft-12" x="12.09" y="0">r</tspan><tspan x="19.54" y="0">y Density</tspan><tspan x="28.27" y="24.05">(pc</tspan><tspan className="logdraft-13" x="56.57" y="24.05">f</tspan><tspan x="64.26" y="24.05">)</tspan></text>
                <text className="logdraft-11" transform="translate(773.38 99.5) scale(0.56 0.79)">Moistu<tspan className="logdraft-14" x="59.88" y="0">r</tspan>
           
            <tspan className="logdraft-15" x="67.01" y="0">e</tspan><tspan x="32.02" y="24.05">%</tspan></text>
            <text className="logdraft-11" transform="translate(891.6 99.5) scale(0.56 0.79)">Remarks</text>
           
          
                
               
                
                   <rect className="logdraft-2" x="0.5" y="61.5" width="1000" height="70"/>
                   <rect className="logdraft-2" x="1.5" y="61.5" width="22" height="70"/>
                   
                    <rect className="logdraft-2" x="23.5" y="61.5" width="26" height="70"/>
                    {this.loadsamplenumber()}
                    <rect className="logdraft-2" x="49.5" y="61.5" width="26" height="70"/>
                    {this.loadsampletype()}
                    <rect className="logdraft-2" x="75.5" y="61.5" width="80" height="70"/>
                    {this.loadgraphics()}
                    <rect className="logdraft-2" x="155.5" y="61.5" width="431" height="70"/>
                    {this.loaddescription()}
                    <rect className="logdraft-2" x="586.5" y="61.5" width="60" height="70"/>
                    {this.loaduscs()}
                    <rect className="logdraft-2" x="646.5" y="61.5" width="59" height="70"/>
                    {this.loadspt()}
                    <rect className="logdraft-2" x="705.5" y="61.5" width="59" height="70"/>
                    {this.loaddryden()}
                    <rect className="logdraft-2" x="764.5" y="61.5" width="59" height="70"/>
                    {this.loadmoisturecontent()}
                    {this.loadremarks()}
                    
                    <rect className="logdraft-2" x="0.5" y="131.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="161.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="191.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="221.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="251.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="281.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="311.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="341.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="371.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="401.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="431.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="461.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="491.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="521.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="551.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="581.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="611.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="641.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="671.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="701.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="731.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="761.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="791.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="821.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="851.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="881.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="911.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="941.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="971.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="1001.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="1031.5" width="23" height="30"/>
                    <rect className="logdraft-2" x="0.5" y="1061.5" width="23" height="30"/>
                    
                  
                   
                  
                   
                   
                   {this.completeblock()}
                    
             </g></g></svg>
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
            this.handleLogdraft())

    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        activeprojectid: state.activeprojectid
    }
}
export default connect(mapStateToProps, actions)(Logdraft)
