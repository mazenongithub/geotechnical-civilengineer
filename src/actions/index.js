import { MYUSERMODEL, PROJECTS, ACTIVEPROJECTID, DATEIN, ENGINEERS, ACTIVEEVENTID } from './types';

export const reduxProjects = (projects) => async dispatch => {

    dispatch({ type: PROJECTS, payload: projects })
}
export const reduxUser = (myusermodel) => async dispatch => {

    dispatch({ type: MYUSERMODEL, payload: myusermodel })
}
export const reduxProjectID = (projectid) => async dispatch => {
    dispatch({ type: ACTIVEPROJECTID, payload: projectid })
}
export const dateIn = (datein) => async dispatch => {
    dispatch({ type: DATEIN, payload: datein })
}
export const reduxEngineers = (engineers) => async dispatch => {
    dispatch({ type: ENGINEERS, payload: engineers })
}
export const activeEventID = (activeeventid) => async dispatch => {
    dispatch({ type: ACTIVEEVENTID, payload: activeeventid })
}
