import React, { Component } from 'react';
import { connect } from 'react-redux';
import { drawrectangle } from '../resources/userfunctions';
import { findfigure } from '../actions/api'
import './figure.css'
class Figure extends Component {

    componentDidMount() {

        this.loadmyfigure();


    }

    async loadmyfigure() {
        let projectid = this.props.match.params.projectid;
        let figurenumber = this.props.match.params.figurenumber;
        let response = await findfigure(projectid, figurenumber);
        let myfigure = response.projectfigures.myfigure;
        drawrectangle(0, 0, 1000, 1367);
        drawrectangle(0, 0, 460, 200);
        drawrectangle(460, 140, 540, 60);
        drawrectangle(460, 0, 166, 60);
        this.projectnumbertext(460, 0, 166, 60, myfigure.projectnumber);
        drawrectangle(626, 0, 227, 60);
        this.datetext(626, 0, 227, 60, myfigure.datefigure)
        drawrectangle(853, 0, 147, 60);
        this.figuretext(853, 0, 147, 60, myfigure.figurenumber)
        this.createtitle(460, 140, 540, 60, myfigure.figuretitle);
        let location = myfigure.projectaddress + ", " + myfigure.projectcity + ", " + myfigure.projectstate;
        let projectapn = myfigure.projectapn.trim();
        if (projectapn.length > 0) {
            location = "APN " + projectapn + ", " + location;
        }
        this.createblocktext(460, 60, 540, 80, myfigure.title, location);
        drawrectangle(460, 0, 540, 60);
        this.portraitlogo(0, 0, 460, 200, myfigure.companyid)
        this.portraitimages(0, 200, 1000, 1133, myfigure.companyid, myfigure.projectid, myfigure.figurenumber)

    }

    createblocktext(xpos, ypos, width, height, title, location) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width);
        foreign.setAttribute('height', height);
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'width:' + width + 'px;height:' + height + 'px;color:#000000')
        iDivele.classList.add("text-div");
        let blockhtml = title + '<br/>' + location
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    projectnumbertext(xpos, ypos, width, height, projectnumber) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width);
        foreign.setAttribute('height', height);
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'width:' + width + 'px;height:' + height + 'px;')
        iDivele.classList.add("text-div");
        let blockhtml = 'Project No. <br/>' + projectnumber
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    datetext(xpos, ypos, width, height, thedate) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width);
        foreign.setAttribute('height', height);
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'width:' + width + 'px;height:' + height + 'px;')
        iDivele.classList.add("text-div");
        let blockhtml = 'Date <br/>' + thedate
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    figuretext(xpos, ypos, width, height, figure) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width);
        foreign.setAttribute('height', height);
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'width:' + width + 'px;height:' + height + 'px;font-weight:bold;color#000000');
        iDivele.classList.add("text-div")
        let blockhtml = 'FIGURE <br/>' + figure
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    portraitlogo(xpos, ypos, width, height, companyid) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width - 3);
        foreign.setAttribute('height', height - 3);
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'font-size:24px;z-index:-1;text-align:center;width:' + width - 3 + 'px;height:' + height - 3 + 'px;margin:3px;transform:scaleY(-1); vertical-align:bottom;text-align:center')
        let blockhtml = '<img src="https://www.egeotechnical.com/companies/' + companyid + '/reportfooter.jpg" style="width:100%;height:auto;max-height:200px;margin:auto" />';
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    portraitimages(xpos, ypos, width, height, companyid, projectid, figurenumber) {

        console.log(xpos, ypos, width, height)
        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width - 4);
        foreign.setAttribute('height', height - 4);
        foreign.setAttribute('style', 'margin:4px 4px 4px 4px');
        foreign.id = "block-text";
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'font-size:24px;transform:scaleY(-1);z-index:-1; vertical-align:top;text-align:center;margin-left:4px')
        let blockhtml = '<img src="https://www.egeotechnical.com/companies/' + companyid + '/projects/' + projectid + '/figures/figure' + figurenumber + '.jpg" style="width:100%;height:auto;" />';
        iDivele.innerHTML = blockhtml;
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)

    }

    createtitle(xpos, ypos, width, height, text) {

        const g = document.getElementById("figure-translate");
        var foreign = document.createElementNS('http://www.w3.org/2000/svg', "foreignObject");
        foreign.setAttribute('x', xpos);
        foreign.setAttribute('y', ypos);
        foreign.setAttribute('width', width);
        foreign.setAttribute('height', height);
        var iDivele = document.createElement('div');
        iDivele.setAttribute('style', 'font-size:30px;font-weight:bold;text-align:left;width:' + width + 'px;height:' + height + 'px;transform:scaleY(-1); vertical-align:middle;text-align:center')
        var ob = document.createTextNode(text);
        iDivele.appendChild(ob);
        foreign.appendChild(iDivele);
        g.appendChild(foreign);
        console.log(g)
    }


    render() {
        return (<div>
	<svg id="figure-temp" width="30cm" height="38cm" viewBox="0 0 1000 1367" >
    <title>Figure Template</title>
     <g id="figure-translate" transform="translate(0,1367) scale(1,-1)">
     
     </g>;
    <defs>
 
    </defs>
 </svg></div>)
    }

}

function mapStateToProps(state) {
    return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(Figure);
