import { combineReducers } from 'redux';
import myusermodel from './myusermodel';
import projects from './projectreducer';
import activeprojectid from './activeprojectidreducer';
import datein from './dateinreducer';
import engineers from './engineersreducer';
import activeeventid from './activeeventidreducer';
export default combineReducers({
    myusermodel,
    projects,
    activeprojectid,
    datein,
    engineers,
    activeeventid
})
