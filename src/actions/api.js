/* global fetch */
/* global Headers */

export async function LoadClient(clientid) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/geotechnical/${clientid}/loadclient`;

    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function getEngineer() {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/getengineers`;
    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function CheckClientLogin() {
    

    const APIURL = `${process.env.REACT_APP_SERVER_API}/checkclientid`;
    console.log(APIURL)
    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function CreateNewProject(values) {

    let clientid = values.clientid;
    var APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/createnewproject`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function SaveClientData(clientid, values) {

    var APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/saveclientdata`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}

export async function UpdateUserProfile(values) {
    let clientid = values.clientid;
    let APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/updateuserprofile`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })
}
export async function getProject(clientid, projectid) {
    const APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/getproject/${projectid}`;
    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}




export async function CheckClientID(values) {
    let clientid = values.clientid;
    const APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/checkclientid`;
    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function getClient(clientid) {
                                  
    const APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/getclient`;
console.log(APIURL)
    return fetch(APIURL)
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function getMoreProjects(values) {
    let clientid = values.clientid;
  
    let APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/getmoreprojects`
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {

            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }

            return resp.json();
        })

}

export async function findfigure(projectid, figurenumber) {
    var APIURL = "/getprojectfigure/" + projectid + "/figure/" + figurenumber;

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}


export async function findfieldreport(fieldid) {
    var APIURL = "/api/fieldreports/" + fieldid

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
} // JavaScript Document
export async function deletemyclientevent(eventid) {
    var APIURL = "/googlecalendar/" + eventid + "/deleteevent"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin',

        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
} // JavaScript Document

export async function updategooglecalendarevent(values) {
    var APIURL = "/googlecalendar/updatevent"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function insertgooglecalendarevent(values) {
    var APIURL = "/googlecalendar/insertevent"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })

}

export async function getclientprojectlist(clientid) {
    var APIURL = "/getclientprojectlist/request/" + clientid
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
} // JavaScript Document


export async function loadmyclientevents(clientid) {
    var APIURL = "/googlecalendar/" + clientid + "/showmyevents"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
} // JavaScript Document
export async function deletemyservicerequest(values) {
    var APIURL = "/servicerequest/request/delete"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function insertmyservicerequest(values) {
    var APIURL = "/servicerequest/insertupdate"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function findmyservicerequest(servicerequest) {
    var APIURL = "/servicerequest/" + servicerequest + "/show"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function loadmyservicerequests(clientid) {
    var APIURL = "/servicerequest/" + clientid + "/showall"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function handleTokenProject(token, projectid, amount) {
    var bodystring = { amount, projectid, token }
    var APIURL = "/api/stripe/project"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(bodystring)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function showprojectbalance(projectid) {
    var offset = new Date().getTimezoneOffset();
    var APIURL = "/showproject/" + projectid + "/balance/" + offset

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function loadprojectbalance(clientid) {
    var offset = new Date().getTimezoneOffset();
    var APIURL = "/" + clientid + "/balance/" + offset
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
export async function ClientUpdateBudget(clientid, projectid) {

    var values = { clientid, projectid }
    var APIURL = `${process.env.REACT_APP_SERVER_API}/${clientid}/budget/${projectid}/authorize`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(values)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function loadmyclientsbudget(clientid) {
    var APIURL = "/budget/" + clientid + "/showall"

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function showmyclientsbudget(projectid) {
    var APIURL = "/findbudget/" + projectid + "/show"

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function loadlabsummary(projectid) {
    var APIURL = "/findlabsummary/" + projectid + "/show"

    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function showmyinvoice(invoiceid) {
    var APIURL = "/invoice/ " + invoiceid + "/show"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function loadmyinvoices(clientid) {
    var APIURL = "/invoice/" + clientid + "/getall"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function itsgetletterbyid(letterid) {
    var APIURL = "/letters/" + letterid + "/show"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function loadmyletters(clientid) {
    var APIURL = "/letters/" + clientid + "/getall"
    return fetch(APIURL, {
            method: 'get',
            credentials: 'same-origin'
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function handleToken(token, invoiceid, projectid, amount, description) {
    let bodystring = { token, invoiceid, projectid, amount, description }

    let APIURL = `${process.env.REACT_APP_SERVER_API}/${projectid}/stripe/${invoiceid}`

    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(bodystring)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function updateUser(val) {
    var APIURL = "/api/current_user/update"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(val)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}

export async function updateUserpassword(val) {
    var APIURL = "/api/current_user/passwordupdate"
    return fetch(APIURL, {
            method: 'post',
            credentials: 'same-origin',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),

            body: JSON.stringify(val)
        })
        .then(resp => {
            if (!resp.ok) {
                if (resp.status >= 400 && resp.status < 500) {
                    return resp.json().then(data => {
                        let err = { errorMessage: data.message };
                        throw err;
                    })
                }
                else {
                    let err = { errorMessage: 'Please try again later, server is not responding' };
                    throw err;
                }
            }
            return resp.json();
        })
}
