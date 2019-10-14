import React, { Component } from 'react';
import { getEngineer } from '../actions/api';
import { connect } from 'react-redux';
import { openMenu, closeMenu } from './svg';
import * as actions from '../actions';
import { formatCurrency } from './functions';
import './register.css';

class Engineer extends Component {
    constructor(props) {
        super(props);
        this.state = { client: {}, width: "", height: "", benefits: false }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
        if (!this.props.engineers) {
            this.getengineers();
        }
        else if (!this.props.engineers.engineer.hasOwnProperty("length")) {
            this.getengineers();
        }
    }
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }
    async getengineers() {
        let response = await getEngineer();
        console.log(response);
        if (response.hasOwnProperty("engineers")) {
            this.props.reduxEngineers(response.engineers);

        }
    }
    getfirstline() {
        let firstline = "";
        if (this.props.engineers) {

            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    let engineerid = this.props.match.params.engineerid;
                    if (engineer.engineerid === engineerid) {
                        if (engineer.firstname) {
                            firstline += `${engineer.firstname}`
                        }
                        if (engineer.lastname) {
                            firstline += ` ${engineer.lastname}`
                        }
                    }
                })
            }
        }
        if (firstline) {
            return (<div className="main-profile-container">{firstline} </div>)
        }


    }
    secondline() {

        ;
        if (this.props.engineers) {

            if (this.props.engineers.engineer.hasOwnProperty("length")) {


                return (<div className="main-profile-container">GFK & Associates, Inc.</div>)
            }

        }
    }
    thirdline() {
        let address = "";
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    let engineerid = this.props.match.params.engineerid;
                    if (engineer.engineerid === engineerid) {
                        if (engineer.address) {
                            address += `${engineer.address}`
                        }

                    }
                })


                if (address) {
                    return (<div className="main-profile-container">{address} </div>)
                }


            }

        }
    }
    fourthline() {

        let city = "";
        let contactstate = "";
        let zipcode = "";
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                // eslint-disable-next-line

                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    let engineerid = this.props.match.params.engineerid;
                    if (engineer.engineerid === engineerid) {

                        city = engineer.city;
                        contactstate = engineer.contactstate;
                        zipcode = engineer.zipcode;


                    }
                })


                if (city || contactstate || zipcode) {
                    let location = "";
                    if (city) {
                        location += city;
                    }
                    if (contactstate) {
                        location += `, ${contactstate}`
                    }
                    if (zipcode) {
                        location += ` ${zipcode}`
                    }
                    return (<div className="main-profile-container">{location} </div>)
                }







            }
        }
    }
    fifthline() {
        let email = "";
        let phone = "";
        let fifthline = [];
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    let engineerid = this.props.match.params.engineerid;
                    if (engineer.engineerid === engineerid) {

                        email = engineer.email;
                        phone = engineer.phone;



                    }
                })


                if (email && phone) {

                    fifthline.push(<div className="profile-container-2"><a className="nodecoration" href={`mailTo:${email}`}>{email} </a> </div>)
                    fifthline.push(<div className="profile-container-2"><a className="nodecoration" href={`tel:${phone}`}>{phone} </a> </div>)
                }
                else if (email) {
                    fifthline.push(<div className="main-profile-container"><a className="nodecoration" href={`mailTo:$ {email}`}>{email} </a>  </div>)
                }
                else if (phone) {
                    fifthline.push(<div className="main-profile-container"><a className="nodecoration" href={`tel:${phone}`}>{phone} </a> </div>)
                }




            }
        }
        return fifthline;
    }
    getengineerinfo() {
        let engineerinfo = "";
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {
                        engineerinfo = `${engineer.firstname} ${engineer.lastname} . Annually I estimate I need  ${engineer.workinghours} hours billable to complete Geotechnical Work in EClient. Here is the cost`
                    }

                })
            }
        }
        return (engineerinfo)
    }
    getcumulativerate() {
        let cumlativerate = 0;

        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {

                        if (engineer.hasOwnProperty("benefits")) {
                            // eslint-disable-next-line
                            engineer.benefits.benefit.map(benefit => {
                                cumlativerate += this.costperhour(benefit.type, benefit.amount, benefit.unit)



                            })
                        }
                    }
                })

            }
        }



        return cumlativerate;

    }
    costperhour(type, amount, unit) {
        let costperhour = "";
        amount = Number(amount)
        let salary = 0;
        let workinghours = 0;
        let hourlyrate = 0;
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
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
    showbenefits() {
        let benefits = [];
        if (this.state.width > 720) {

            benefits.push(<div className="benefits-medium"> Benefits </div>)
            benefits.push(<div className="benefits-small">  Amount</div>)
            benefits.push(<div className="benefits-small">  Unit  </div>)
            benefits.push(<div className="benefits-small"> Cost/Hr:</div>)
            benefits.push(<div className="benefits-small"> %</div>)
        }
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {

                        if (engineer.hasOwnProperty("benefits")) {
                            // eslint-disable-next-line
                            engineer.benefits.benefit.map(benefit => {

                                if (this.state.width < 721) {
                                    benefits.push(<div className="benefits-small-1">
                              Benefit: {benefit.benefit}
                              </div>)
                                    if (benefit.type === "Salary" || benefit.type === "Benefit") {
                                        benefits.push(<div className="benefits-small">
                              Amount: {formatCurrency(benefit.amount)}</div>)
                                    }
                                    else {

                                        benefits.push(<div className="benefits-small">
                              Amount: {(benefit.amount)}</div>)
                                    }

                                    benefits.push(<div className="benefits-small">
                              Unit: {benefit.unit}
                              </div>)
                                    benefits.push(<div className="benefits-small">
                              Cost/Hr: {formatCurrency(this.costperhour(benefit.type,benefit.amount,benefit.unit))}
                              </div>)
                                    benefits.push(<div className="benefits-small">
                             {((this.costperhour(benefit.type,benefit.amount,benefit.unit)/this.getcumulativerate())*100).toFixed(2)}%
                              </div>)

                                }
                                else {

                                    benefits.push(<div className="benefits-medium">{benefit.benefit} </div>)

                                    if (benefit.type === "Salary" || benefit.type === "Benefit") {
                                        benefits.push(<div className="benefits-small">
                              {formatCurrency(benefit.amount)}</div>)
                                    }
                                    else {

                                        benefits.push(<div className="benefits-small">
                              {(benefit.amount)}</div>)
                                    }

                                    benefits.push(<div className="benefits-small">
                              {benefit.unit}
                              </div>)
                                    benefits.push(<div className="benefits-small">
                               {formatCurrency(this.costperhour(benefit.type,benefit.amount,benefit.unit))}
                              </div>)
                                    benefits.push(<div className="benefits-small">
                             {((this.costperhour(benefit.type,benefit.amount,benefit.unit)/this.getcumulativerate())*100).toFixed(2)}%
                              </div>)


                                }
                            })
                        }

                    }
                })
            }
        }

        return benefits;
    }
    togglebenefits(event) {
        if (this.state.benefits === true) {
            this.setState({ benefits: false })
        }
        else if (this.state.benefits === false) {
            this.setState({ benefits: true })
        }
    }
    togglebenefitsicon() {
        if (this.state.benefits === true) {
            return (closeMenu())
        }
        else if (this.state.benefits === false) {
            return (openMenu());
        }
        else {
            return (<span> &nbsp;</span>)
        }
    }
    toggleclass() {
        if (this.state.benefits === false) {
            return ("inactive-menu");
        }
        else {
            return ("")
        }
    }
    getimagesrc() {
        let imgsrc = "";
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {
                        imgsrc = engineer.url;
                    }
                })

            }
        }
        return imgsrc;
    }
    getimagealt() {
        let imgalt = "";
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {
                        imgalt = `${engineer.firstname} ${engineer.lastname}`
                    }
                })

            }
        }
        return imgalt;

    }
    getbio() {
        let bio = "";
        let mybio = [];
        if (this.props.engineers) {
            if (this.props.engineers.engineer.hasOwnProperty("length")) {
                let engineerid = this.props.match.params.engineerid;
                // eslint-disable-next-line
                this.props.engineers.engineer.map(engineer => {
                    if (engineer.engineerid === engineerid) {
                        bio = `${engineer.bio}`
                        let newcontent = bio.split(/\n/g)
                        newcontent.forEach(content => {

                            mybio.push(<p> {content} </p>)

                        })
                    }
                })

            }
        }
        return mybio;
    }
    render() {

        return (

            <div className="register-container">
            <div className="main-profile-container"><div className="profilepicture-container"><img className="profile-picture" src={this.getimagesrc()} alt={this.getimagealt()}/> </div></div>
            <div className="main-profile-container">{this.getfirstline()} </div>
            {this.secondline()}
            {this.thirdline()}
            {this.fourthline()}
            {this.fifthline()}
       <div className="main-profile-general"><span className="engineer-labels">Biography</span>  </div>
        <div className="main-profile-general">{this.getbio()} </div>
        <div className="main-profile-general"><span className="engineer-labels">Benefits</span> <button className="menu-icon" onClick={event=>{this.togglebenefits(event)}}>{this.togglebenefitsicon()}</button> </div>
        <div className={`main-profile-general ${this.toggleclass()}`}>{this.getengineerinfo()} </div>
        <div className="main-profile-general">
        <div className={`benefits-subgrid ${this.toggleclass()}`}>
               
                {this.showbenefits()}
                <div className={`benefits-header ${this.toggleclass()}`}>My Hourly Rate is {formatCurrency(this.getcumulativerate())}. </div>
          </div>
           
            
            </div>
        
         </div>
        )
    }

}

function mapStateToProps(state) {
    return {

        engineers: state.engineers
    }
}

export default connect(mapStateToProps, actions)(Engineer);
