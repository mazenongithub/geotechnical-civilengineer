import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadlabsummary } from '../actions/api';
import "./viewlabsummary.css"
import _ from 'lodash';
class ShowLabSummary extends Component {

  constructor(props) {
    super(props);
    this.state = {
      mylab: {},
      projectnumber: '',
      datereport: '',
      projectaddress: '',
      projectcity: '',
      projectstate: '',
      title: ''
    }

  }

  componentDidMount() {
    this.loadprojectlabsummary()
  }

  async loadprojectlabsummary() {
    var projectid = this.props.match.params.projectid
    console.log(projectid)
    let labsummary = await loadlabsummary(projectid);
    console.log(labsummary)
    const mylab = labsummary.mylab;
    this.setState({
      mylab,
      projectnumber: mylab.projectnumber,
      datereport: mylab.datereport,
      projectaddress: mylab.projectaddress,
      projectcity: mylab.projectcity,
      projectstate: mylab.projectstate,
      title: mylab.title
    })

  }
  checkzero(value) {
    var valuecheck = Number(value)
    if (valuecheck === 0) {
      return ('')
    }
    return (value);
  }

  loadlabtable() {
    var returned = false;
    return _.map(this.state.mylab.labdata, (labdata, i) => {
      if (i >= 0) {
        return (<tr>
    <td className="tablecell-align-center">{labdata.sampleno}</td>
    <td className="tablecell-align-center">{labdata.depth}</td>
    <td className="tablecell-align-center">{this.checkzero(labdata.dryden)}</td>
    <td className="tablecell-align-center">{labdata.moist}</td>
    <td className="tablecell-align-center">{this.checkzero(labdata.ll)}</td>
    <td className=" tablecell-align-center">{this.checkzero(labdata.pi)}</td>
    <td className="tablecell-align-center">{this.checkzero(labdata.unconfined)}</td>
    <td className="tablecell-align-center">{this.checkzero(labdata.strain)}</td>
    <td colSpan="3" className="tablecell-align-center">{labdata.sievestr}</td>
  </tr>)
      }
      else {
        if (!returned) {
          returned = true;
          labdata = this.state.mylab.labdata;
          return (<tr>
    <td>{labdata.sampleno}</td>
    <td className="tablecell-align-center">{labdata.depth}</td>
    <td className="tablecell-align-center">{labdata.dryden}</td>
    <td className="tablecell-align-center">{labdata.moist}</td>
    <td className="tablecell-align-center">{labdata.ll}</td>
    <td className="tablecell-align-center">{labdata.pi}</td>
    <td className="tablecell-align-center">{labdata.unconfined}</td>
    <td className="tablecell-align-center"> {labdata.strain}</td>
    <td colSpan="3" className="tablecell-align-center">{labdata.sievestr}</td>
  </tr>)
        }
      }
    })
  }
  projectstring(projectnumber) {
    projectnumber = Number(projectnumber)
    if (projectnumber > 0) {
      return ("Project No. " + projectnumber)
    }
    return ("")
  }
  projecttitle(title) {
    if (title.length > 0) {
      return ("Geotechnical Investigation/" + title)
    }
    else {
      return ("")
    }
  }

  showlocation(address, city, state) {
    var addstring = "";
    if (address.length > 0) {
      addstring += address + ", "
    }
    if (city.length > 0) {
      addstring += city + ", "
    }
    if (state.length > 0) {
      addstring += state;
    }
    return addstring;
  }


  render() {


    return (<table width="98%" border="1" cellPadding="2">
  <tr>
    <td height="25" colSpan="2"  className="tablecell-align-left">{this.projectstring(this.state.projectnumber)}</td>
    <td height="25" colSpan="9"  className="tablecell-align-center">
	<div id="title">{this.projecttitle(this.state.title)} </div></td>
  </tr>
  <tr>
    <td height="25" colSpan="2"  className="tablecell-align-left">
	<div id="datereport">{this.state.datereport} </div></td>
    <td height="25" colSpan="9"  className="tablecell-align-center"><div id="location"> {this.showlocation(this.state.projectaddress, this.state.projectcity,this.state.projectstate)}</div></td>
  </tr>
  <tr>
    <th height="87" colSpan="11"  ><p><u>TABLE 1 </u> </p><p><u>SUMMARY OF LAB TEST RESULTS </u> </p></th>
  </tr>
  <tr>
    <th width="10%" rowSpan="2">Sample No.</th>
    <th width="8%" rowSpan="2">Depth (ft)</th>
    <th width="9%" rowSpan="2">Dry Density (pcf)</th>
    <th width="9%" rowSpan="2">Moisture Content (%)</th>
    <th colSpan="2">Atterberg Limits</th>
    <th colSpan="2">Unconfined Compression</th>
    <th width="27%" colSpan="3" rowSpan="2">Sieve Analysis</th>
  </tr>
  <tr>
    <th width="9%">Liquid Limit (%)</th>
    <th width="9%">Plasticity Index</th>
    <th width="9%">Strength (psf)</th>
    <th width="9%">Strain (%)</th>
  </tr>
  
  {this.loadlabtable()}
  
</table>)

  }

}

function mapStateToProps(state) {
  return { myusermodel: state.myusermodel };
}

export default connect(mapStateToProps)(ShowLabSummary);
