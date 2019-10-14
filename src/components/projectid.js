import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
class ProjectID extends Component {
    render() {
        return (<div>Project ID </div>)
    }
}

function mapStateToProps(state) {
    return {
        myusermodel: state.myusermodel,
        projects: state.projects,
        projectid: state.projectid
    };
}

export default connect(mapStateToProps, actions)(ProjectID);
