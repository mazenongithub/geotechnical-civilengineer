import React from 'react';
export function sortDecending(a, b) {
    return b - a;
}
export function sortAscending(a, b) {
    return a - b;
}
export function getTimezoneUTCString(timein) {
    //let timein = '2019-11-30 19:11:00';
    let offsetfactor = '';
    let datein = new Date(timein.replace(/-/g, '/'))
    let baseyear = datein.getFullYear();
    let basedatestring = `${baseyear}/01/01`;
    let basedate = new Date(basedatestring);
    let baseoffset = basedate.getTimezoneOffset();
    let offset = datein.getTimezoneOffset();
    offset = Math.abs(offset)
    baseoffset = Math.abs(baseoffset);
    if (offset < baseoffset) {
        offsetfactor = '07:00'
    } else {
        offsetfactor = '08:00'
    }
    return offsetfactor;
}
export function MyUserModel(clientid, firstname, lastname, gender, company, address, city, contactstate, zipcode, emailaddress, phonenumber) {
    return ({ clientid, firstname, lastname, gender, company, address, city, contactstate, zipcode, emailaddress, phonenumber })
}
export function rounDown100(num) {
    num = Math.floor(num / 100) * 100;
    return num;
}
export function handlezerovalue(value) {
    if (Number(value) === 0) {
        return (<span>&nbsp;</span>)
    }
    else {
        return value;
    }
}
export function checksieveanalysis(gravfrac, sandfrac, fines) {
    if (Number(gravfrac) > 0 || Number(sandfrac) > 0 || Number(fines) > 0) {
        return true;
    }
    else {
        return false;
    }
}
export function checkunconfined(un) {
    if (Number(un) > 0) {
        return true;
    }
    else {
        return false;
    }
}
export function check_31(dateobj) {
    let month = dateobj.getMonth();
    if (month === 0 || month === 2 || month === 4 || month === 6 || month === 7 || month === 9 || month === 11) {
        return 31;
    }
}

export function check_30(dateobj) {
    let month = dateobj.getMonth();
    if (month !== 1) {
        return 30;
    }
}

export function check_29_feb_leapyear(dateobj) {
    let month = dateobj.getMonth();

    if (month === 1) {
        let year = dateobj.getFullYear();
        if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
            return 29;
        }
        else {
            return;
        }
    }
    else {
        return 29;
    }

}
export function getFirstIsOn(mydate) {
    let monthdisplay = mydate.getMonth() + 1;
    let fullyear = mydate.getFullYear();
    let thefirstofthemonth = new Date(`${fullyear}/${monthdisplay}/1`);
    let firstday = thefirstofthemonth.getDay();
    switch (firstday) {
        case 0:
            return "Sun";
        case 1:
            return "Mon";
        case 2:
            return "Tues";
        case 3:
            return "Weds";
        case 4:
            return "Thurs";
        case 5:
            return "Fri";
        case 6:
            return "Sat";
        default:
            return;
    }
}
export function getmonthstring(month) {

    month = month - 1;
    switch (month) {
        case 0:
            return ("January");
        case 1:
            return ("February");
        case 2:
            return ("March");
        case 3:
            return ("April");
        case 4:
            return ("May");
        case 5:
            return ("June");
        case 6:
            return ("July");
        case 7:
            return ("August");
        case 8:
            return ("September");
        case 9:
            return ("October");
        case 10:
            return ("November");
        case 11:
            return ("December");
        default:
            break;
    }
}
export function checkatteberglimits(ll, pi) {
    if (Number(ll) > 0 || Number(pi) > 0) {
        return true;
    }
    else {
        return false;
    }
}
export function checkformediumtests(un, ll, pi, gravfrac, sandfrac, fines) {
    if (Number(un) > 0 || Number(pi) > 0 || Number(ll) > 0 || Number(gravfrac) > 0 || Number(sandfrac) > 0 || Number(fines) > 0) {
        return true;
    }
    else {
        return false;
    }
}
export function returnSieve(gravfrac, sandfrac, fines) {
    gravfrac = Number(gravfrac)
    sandfrac = Number(sandfrac)
    fines = Number(fines)
    let sieve = "";
    if (gravfrac > 0) {
        sieve += `${gravfrac}% Gravel, `
    }
    if (sandfrac > 0) {
        sieve += `${sandfrac}% Sand, `
    }
    if (fines > 0) {
        sieve += `${fines}% Fines `
    }
    if (!sieve) {
        return (<span>&nbsp; </span>)
    }
    else {
        return sieve;
    }

}
export function calendarDateObj(timein) {
    timein = timein.replace(/-/g, '/');
    let offset = getTimezoneUTCString(timein)
    let eventdate = new Date(`${timein}-${offset}`)
    let calendarmonth = eventdate.getMonth() + 1;
    let calendaryear = eventdate.getFullYear()
    let calendarday = eventdate.getDate();
    let calendardate = new Date(`${calendaryear}/${calendarmonth}/${calendarday}`)
    return calendardate;
}
export function createclientdata(clientid, gender, firstname, lastname, company, address, city, contactstate, zipcode, email, project) {
    return ({
        clientid,
        gender,
        firstname,
        lastname,
        company,
        address,
        city,
        contactstate,
        zipcode,
        email,
        projects: { project }
    })
}
export function calculateamount(timein, timeout, rate) {
    let datein = new Date(timein.replace(/-/g, '/'));
    let dateout = new Date(timeout.replace(/-/g, '/'))
    let hours = (dateout.getTime() - datein.getTime()) / (1000 * 60 * 60)
    let amount = hours * rate;
    return amount;
}
export function ScheduleModel(itemid, projectid, engineerid, engineer, description, rate, timein, timeout, eventid) {
    return ({
        itemid,
        projectid,
        engineerid,
        engineer,
        description,
        rate,
        timein,
        timeout,
        eventid
    })
}
export function EventModel(eventid, timein, timeout, detail, engineer) {

    return ({ eventid, timein, timeout, detail, engineer })

}
export function UserModel(clientid, gender, firstname, lastname, company, address, city, contactstate, zipcode, email, phone) {
    return { clientid, gender, firstname, lastname, company, address, city, contactstate, zipcode, email, phone }
}
export function validateClientID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,34}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    let errmsg = "";
    if (value.length > 36) {
        errmsg = " Client should be less than 36 characters";
    }
    else if (!test) {
        errmsg = `${value} has an invalid format`;
    } else {
        errmsg = "";
    }

    return errmsg;
}
export function ClientProject(clientid, projectid, projectnumber, series, title, address, city, proposed, scope) {
    return { clientid, projectid, projectnumber, series, title, projectaddress: address, projectcity: city, proposed, proposedproject: scope }
}
export function inputUTCStringOutputDateString(timeout) {
    timeout = timeout.replace(/-/g, '/');
    // timeout = '2018-12-31T22:56:00-08:00';
    let offset = getTimezoneUTCString(timeout)
    let dateobj = new Date(`${timeout}-${offset}`);

    let day = dateobj.getDate();

    let month = dateobj.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }

    if (day < 10) {
        day = `0${day}`
    }
    let year = dateobj.getFullYear();

    timeout = `${year}-${month}-${day}`;
    console.log(timeout)
    return timeout;


}
export function formatTimefromDBFull(timestring) {

    timestring = timestring.replace(/-/g, '/');
    let offset = getTimezoneUTCString(timestring)
    timestring = `${timestring}-${offset}`
    let newdate = new Date(timestring)
    let hour = newdate.getHours();
    let timeofday = "";
    if (hour >= 12) {
        timeofday = 'pm'

    }
    else {
        timeofday = 'am'
    }
    if (hour > 12) {
        hour = hour - 12;
    }
    let minutes = newdate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let month = newdate.getMonth() + 1;
    let day = newdate.getDate();
    let year = newdate.getFullYear();
    let seconds = newdate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return `${month}/${day}/${year} ${hour}:${minutes}:${seconds} ${timeofday}`
}
export function getTimeFromDateObj(datein) {
    if (Object.prototype.toString.call(datein) === "[object Date]") {
        let hours = datein.getHours();
        let timeofday = '';
        if (hours >= 12) {
            timeofday = 'pm'

        }
        else {
            timeofday = 'am'
        }
        if (hours > 12) {
            hours = hours - 12;
        }
        let minutes = datein.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return `${hours}:${minutes} ${timeofday}`
    }
}
export function formatTimefromDB(timestring) {
    if (timestring) {
        timestring = timestring.replace(/-/g, '/');
        let offset = getTimezoneUTCString(timestring)
        timestring = `${timestring}-${offset}`

        let newdate = new Date(timestring)
        let hour = newdate.getHours();
        let timeofday = "";
        if (hour >= 12) {
            timeofday = 'pm'

        }
        else {
            timeofday = 'am'
        }
        if (hour > 12) {
            hour = hour - 12;
        }
        let minutes = newdate.getMinutes();
        if (minutes < 10) {
            minutes = `0${minutes}`
        }
        return `${hour}:${minutes} ${timeofday}`
    }
    else {
        return "";
    }
}
export function convertTimeSectoString(timeinsec) {
    timeinsec = Number(timeinsec)
    let timein = new Date(timeinsec)

    let month = timein.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    let day = timein.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = timein.getFullYear();
    let hours = timein.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = timein.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = timein.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }

    return (`${year}/${month}/${day} ${hours}:${minutes}:${seconds}`)
}
export function trailingzero(num) {
    if (num < 10) {
        num = `0${num}`
    }
    return num;
}
export function inputDateObjDateStringNoOffset(dateobj) {
    dateobj.getHours()
    let day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = dateobj.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }

    let year = dateobj.getFullYear();
    let timein = `${year}-${month}-${day}`
    return (timein)
}

export function formatDateforCalendarDisplay(datein) {
    let month = datein.getMonth() + 1;
    month = getmonthstring(month)
    let year = datein.getFullYear();
    return (`${month} ${year}`)
}
export function adjustdays(month, days, year) {

    switch (month) {
        case 1:
            if (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0)) {
                days = 29;
            }
            else {
                days = 28;
            }
            return days;
        case 3:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 5:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 8:
            if (days > 30) {
                days = 30;
            }
            return days;
        case 10:
            if (days > 30) {
                days = 30;
            }
            return days;
        default:
            return days;
    }

}
export function engineerEvent(lineid, eventid, timein, timeout) {
    return { lineid, eventid, timein, timeout }
}
export function inputDateStringActiveIDTimein(dateobj, timein) {
    let newmonth = dateobj.getMonth() + 1;
    if (newmonth < 10) {
        newmonth = `0${newmonth}`
    }
    let newday = dateobj.getDate();
    if (newday < 10) {
        newday = `0${newday}`
    }
    let newdate = `${dateobj.getFullYear()}-${newmonth}-${newday}`
    let offset = getTimezoneUTCString(timein)
    let eventdateobj = new Date(`${timein}-${offset}`)
    let eventhours = eventdateobj.getHours();
    if (eventhours < 10) {
        eventhours = `0${eventhours}`
    }
    let eventminutes = eventdateobj.getMinutes();
    if (eventminutes < 10) {
        eventminutes = `0${eventminutes}`
    }
    let eventseconds = eventdateobj.getSeconds();
    if (eventseconds < 10) {
        eventseconds = `0${eventseconds}`
    }
    let eventtime = `${eventhours}:${eventminutes}:${eventseconds}`
    return (`${newdate} ${eventtime}`)
}
export function sorttimes(timeina, timeinb) {
    timeina = new Date(timeina.replace(/-/g, '/'))
    timeinb = new Date(timeinb.replace(/-/g, '/'))
    if (timeina < timeinb) {
        return -1;
    }
    else if (timeinb > timeina) {
        return 1;
    }
    else {
        return 0;
    }
}
export function inputDateSecActiveIDTimein(dateencoded, timein) {
    timein = timein.replace(/-/g, '/');
    let dateobj = new Date(dateencoded)
    let newmonth = dateobj.getMonth() + 1;
    if (newmonth < 10) {
        newmonth = `0${newmonth}`
    }
    let newday = dateobj.getDate();
    if (newday < 10) {
        newday = `0${newday}`
    }
    let newdate = `${dateobj.getFullYear()}-${newmonth}-${newday}`
    let offset = getTimezoneUTCString(timein)
    let eventdateobj = new Date(`${timein}-${offset}`)
    let eventhours = eventdateobj.getHours();
    if (eventhours < 10) {
        eventhours = `0${eventhours}`
    }
    let eventminutes = eventdateobj.getMinutes();
    if (eventminutes < 10) {
        eventminutes = `0${eventminutes}`
    }
    let eventseconds = eventdateobj.getSeconds();
    if (eventseconds < 10) {
        eventseconds = `0${eventseconds}`
    }
    let eventtime = `${eventhours}:${eventminutes}:${eventseconds}`
    return (`${newdate} ${eventtime}`)
}
export function TimeDBBaseDateObj(timein) {
    timein = timein.replace(/-/g, '/');
    let offset = getTimezoneUTCString(timein)
    let datein = new Date(`${timein}-${offset}`)
    let fullyear = datein.getFullYear();
    let month = datein.getMonth() + 1;
    let date = datein.getDate();
    if (date < 10) {
        date = `0${date}`
    }
    if (month < 10) {
        month = `0${month}`
    }


    let basedate = new Date(`${fullyear}/${month}/${date} 00:00:00-${offset}`)
    return (basedate)
}
export function UTCTimefromCurrentDate() {
    let offset = new Date().getTimezoneOffset() / 60;
    let sym = "";
    if (offset < 0) {
        offset = -offset;
        sym = "+"
    }
    else {
        sym = "-"
    }
    if (offset < 10) {
        offset = `0${offset}`
    }
    let newDate = new Date();
    let month = newDate.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = newDate.getDate();
    if (day < 10) {
        day = `0${day}`
    }
    let year = newDate.getFullYear();
    let hours = newDate.getHours();
    if (hours < 10) {
        hours = `0${hours}`
    }
    let minutes = newDate.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let seconds = newDate.getSeconds();
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    let fakedate = new Date(`${year}/${month}/${day} ${hours}:${minutes}:${seconds}${sym}${2 * offset}:00`)
    year = fakedate.getFullYear();
    month = fakedate.getMonth() + 1;
    day = fakedate.getDate();
    hours = fakedate.getHours();
    minutes = fakedate.getMinutes();
    seconds = fakedate.getSeconds();
    if (month < 10) {
        month = `0${month}`;
    }
    if (day < 10) {
        day = `0${day}`
    }

    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    if (seconds < 10) {
        seconds = `0${seconds}`
    }
    return (`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`)
}
export function inputtimeDBoutputCalendarDaySeconds(datein) {

    let offset = getTimezoneUTCString(datein)
    let dateobj = new Date(`${(datein.replace(/-/g, '/'))}-${offset}`);
    let daymonth = dateobj.getMonth() + 1;
    if (daymonth < 10) {
        daymonth = `0${daymonth}`
    }
    let dayyear = dateobj.getFullYear();
    let calendarday = dateobj.getDate();

    let calendardateobj = new Date(`${dayyear}/${daymonth}/${calendarday} 00:00:00-${offset}`);
    return (calendardateobj.getTime());
}
export function convertTimeDBtoSec(timein) {
    if (timein) {
        timein = timein.replace(/-/g, '/');
        let offset = getTimezoneUTCString(timein)
        let datein = new Date(`${timein}-${offset}`);
        return (datein.getTime())
    }
}

export function formatCurrency(dollar) {

    dollar = Number(dollar).toFixed(2);
    return `$${dollar.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`
}
export function formatTimeTest(timetest) {
    timetest = timetest.replace(/-/g, '/');
    let offset = getTimezoneUTCString(timetest)
    timetest = `${timetest}-${offset}`
    let timeobj = new Date(timetest)

    let day = timeobj.getDate();
    let month = timeobj.getMonth() + 1;
    let year = timeobj.getFullYear();

    if (day < 10) {
        day = `0${day}`
    }
    if (month < 10) {
        month = `0${month}`
    }
    return (`${month}/${day}/${year}`)
}
export function formatDateFromTimeIn(datestring) {
    datestring = datestring.replace(/-/g, '/');
    let offset = getTimezoneUTCString(datestring)
    let dateobj = new Date(`${datestring}-${offset}`);

    let month = Number(dateobj.getMonth());
    let datereport = "";
    switch (month) {
        case 0:
            datereport += "January";
            break;
        case 1:
            datereport += "February";
            break;
        case 2:
            datereport += "March";
            break;
        case 3:
            datereport += "April";
            break;
        case 4:
            datereport += "May";
            break;
        case 5:
            datereport += "June";
            break;
        case 6:
            datereport += "July";
            break;
        case 7:
            datereport += "August";
            break;
        case 8:
            datereport += "September";
            break;
        case 9:
            datereport += "October";
            break;
        case 10:
            datereport += "November";
            break;
        case 11:
            datereport += "December";
            break;
        default:
            break;
    }
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    return `${datereport} ${day}, ${year}`

}
export function formatDateReport(datestring) {
    datestring = datestring.replace(/-/g, '/');
    let dateob = new Date(datestring);

    let offset = dateob.getTimezoneOffset();
    offset = offset * 60 * 1000;

    let gettime = dateob.getTime() + offset;
    let dateobj = new Date(gettime);
    let month = Number(dateob.getMonth());
    let datereport = "";
    switch (month) {
        case 0:
            datereport += "January";
            break;
        case 1:
            datereport += "February";
            break;
        case 2:
            datereport += "March";
            break;
        case 3:
            datereport += "April";
            break;
        case 4:
            datereport += "May";
            break;
        case 5:
            datereport += "June";
            break;
        case 6:
            datereport += "July";
            break;
        case 7:
            datereport += "August";
            break;
        case 8:
            datereport += "September";
            break;
        case 9:
            datereport += "October";
            break;
        case 10:
            datereport += "November";
            break;
        case 11:
            datereport += "December";
            break;
        default:
            break;
    }
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    return `${datereport} ${day}, ${year}`

}
export function createBaseDate() {
    let dateobj = new Date();
    let month = dateobj.getMonth() + 1;
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    if (month < 10) {
        month = `0${month}`
    }
    if (day < 10) {
        day = `0${day}`
    }
    let baseoffset = `${year}/${month}/${day} 00:00:00`
    let offset = getTimezoneUTCString(baseoffset)
    return (new Date(`${year}/${month}/${day} 00:00:00-${offset}`))
}
export function randomString(len) {
    var randomString = "";

    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < len; i++)
        randomString += charset.charAt(Math.floor(Math.random() * charset.length));

    return randomString;
}
