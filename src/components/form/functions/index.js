import React from 'react';
export function formatDate(timein) {
    let datestring = timein.toLocaleDateString();
    return datestring;

}



export function inputUTCStringOutputDateObj(timeout) {
    // timeout = '2018-12-31T22:56:00-08:00';
    timeout = timeout.replace(/-/g, '/');
    let dateobj = new Date(timeout);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime - offset;
    let mytime = new Date(gettime);
    return mytime;

}
export function displayprovider(myteam) {
    return (<div>
        {myteam.firstname} {myteam.lastname}<br/>
        {myteam.company} {myteam.jobtitle}<br/>
        {myteam.provideraddress} <br/> 
        {myteam.providercity}, {myteam.providerstate} 
        <br/>{myteam.emailaddress} {myteam.phone}</div>)
}

export function NameOccupation(code) {

    let occupations = showOccupations();
    let name = "";
    // eslint-disable-next-line
    occupations.map(occupation => {

        if (occupation.code === Number(code)) {

            name = occupation.name;


        }
    })

    return name;
}
export function showOccupations() {
    let occupation = [
        { code: 11, name: "Management Occupations" },
        { code: 13, name: "Business and Financial Operations Occupations" },
        { code: 15, name: "Computer and Mathematical Occupations" },
        { code: 17, name: "Architecture and Engineering Occupations" },
        { code: 19, name: "Life, Physical, and Social Science Occupations" },
        { code: 21, name: "Community and Social Service Occupations" },
        { code: 23, name: "Legal Occupations" },
        { code: 25, name: "Educational Instruction and Library Occupations" },
        { code: 27, name: "Arts, Design, Entertainment, Sports, and Media Occupations" },
        { code: 29, name: "Healthcare Practitioners and Technical Occupations" },
        { code: 31, name: "Healthcare Support Occupations" },
        { code: 33, name: "Protective Service Occupations" },
        { code: 35, name: "Food Preparation and Serving Related Occupations" },
        { code: 37, name: "Building and Grounds Cleaning and Maintenance Occupations" },
        { code: 39, name: "Personal Care and Service Occupations" },
        { code: 41, name: "Sales and Related Occupations" },
        { code: 43, name: "Office and Administrative Support Occupations" },
        { code: 45, name: "Farming, Fishing, and Forestry Occupations" },
        { code: 47, name: "Construction and Extraction Occupations" },
        { code: 49, name: "Installation, Maintenance, and Repair Occupations" },
        { code: 51, name: "Production Occupations" },
        { code: 53, name: "Transportation and Material Moving Occupations" },
        { code: 55, name: "Military Specific Occupations" },
    ]
    return occupation;
}
export function inputDateObjOutput(mytime) {
    // timeout = '2018-12-31T22:56:00-08:00';
    //no offset
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${year}-${month}-${day}`


}
export function inputDateObjOutPutDateString(dateobj) {
    // timeout = '2018-12-31T22:56:00-08:00';

    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime + offset;
    let mytime = new Date(gettime);
    mytime.getHours()
    let day = mytime.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let month = mytime.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }


    let year = mytime.getFullYear();
    return `${year}-${month}-${day}`


}
export function capitalizeFirst(value) {
    value = value.trim();
    value = value.toLowerCase()
    value = value.charAt(0).toUpperCase() + value.slice(1);
    return value;
}
export function datefromDBString(datein) {
    let offsetdate = new Date();
    let offset = offsetdate.getTimezoneOffset();
    offset = offset / 60
    if (offset < 10) {
        offset = `0${offset}`
    }
    let dateobj = new Date(`${datein}T00:00-${offset}:00`);
    let day = dateobj.getDay();
    let month = dateobj.getMonth() + 1;
    let year = dateobj.getFullYear();
    day = dateobj.getDate();
    if (day < 10) {
        day = `0${day}`;
    }

    if (month < 10) {
        month = `0${month}`;
    }



    return (`${year}-${month}-${day}`)

}
export function datefromDBputDateObj(timein) {
    let offsetdate = new Date();
    let offset = offsetdate.getTimezoneOffset();
    offset = offset / 60
    if (offset < 10) {
        offset = `0${offset}`
    }
    return new Date(`${timein}T00:00-${offset}:00`);

}




export function stripsecondsstring(mrkyte) {
    let theend = mrkyte.search("T");
    return mrkyte.substring(0, theend)

}
export function calculateamount(quantity, unitprice) {
    let amount = (Number(quantity) * Number(unitprice))
    return amount;

}

export function calculatetotalhours(timein, timeout) {
    let totalhours = (timeout.getTime() - timein.getTime()) / (1000 * 60 * 60)
    return totalhours;
}
export function inputDateObjStripTimeOutputObj(dateobj) {
    let day = dateobj.getDate();
    let year = dateobj.getFullYear();
    let month = dateobj.getMonth() + 1;
    month = trailingzero(month);
    let dayzero = trailingzero(day);

    let timestring = `${year}/${month}/${dayzero}`;
    console.log(timestring)
    let calendardate = new Date(`${timestring} 00:00:00-07:00`);
    console.log(calendardate)
    return calendardate;
}
export function getstatelist() {
    return ([
        { name: 'ALABAMA', abbreviation: 'AL' },
        { name: 'ALASKA', abbreviation: 'AK' },
        { name: 'ARIZONA', abbreviation: 'AZ' },
        { name: 'ARKANSAS', abbreviation: 'AR' },
        { name: 'CALIFORNIA', abbreviation: 'CA' },
        { name: 'COLORADO', abbreviation: 'CO' },
        { name: 'CONNECTICUT', abbreviation: 'CT' },
        { name: 'DELAWARE', abbreviation: 'DE' },
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
        { name: 'FLORIDA', abbreviation: 'FL' },
        { name: 'GEORGIA', abbreviation: 'GA' },
        { name: 'HAWAII', abbreviation: 'HI' },
        { name: 'IDAHO', abbreviation: 'ID' },
        { name: 'ILLINOIS', abbreviation: 'IL' },
        { name: 'INDIANA', abbreviation: 'IN' },
        { name: 'IOWA', abbreviation: 'IA' },
        { name: 'KANSAS', abbreviation: 'KS' },
        { name: 'KENTUCKY', abbreviation: 'KY' },
        { name: 'LOUISIANA', abbreviation: 'LA' },
        { name: 'MAINE', abbreviation: 'ME' },
        { name: 'MARYLAND', abbreviation: 'MD' },
        { name: 'MASSACHUSETTS', abbreviation: 'MA' },
        { name: 'MICHIGAN', abbreviation: 'MI' },
        { name: 'MINNESOTA', abbreviation: 'MN' },
        { name: 'MISSISSIPPI', abbreviation: 'MS' },
        { name: 'MISSOURI', abbreviation: 'MO' },
        { name: 'MONTANA', abbreviation: 'MT' },
        { name: 'NEBRASKA', abbreviation: 'NE' },
        { name: 'NEVADA', abbreviation: 'NV' },
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
        { name: 'NEW JERSEY', abbreviation: 'NJ' },
        { name: 'NEW MEXICO', abbreviation: 'NM' },
        { name: 'NEW YORK', abbreviation: 'NY' },
        { name: 'NORTH CAROLINA', abbreviation: 'NC' },
        { name: 'NORTH DAKOTA', abbreviation: 'ND' },
        { name: 'OHIO', abbreviation: 'OH' },
        { name: 'OKLAHOMA', abbreviation: 'OK' },
        { name: 'OREGON', abbreviation: 'OR' },
        { name: 'PENNSYLVANIA', abbreviation: 'PA' },
        { name: 'RHODE ISLAND', abbreviation: 'RI' },
        { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
        { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
        { name: 'TENNESSEE', abbreviation: 'TN' },
        { name: 'TEXAS', abbreviation: 'TX' },
        { name: 'UTAH', abbreviation: 'UT' },
        { name: 'VERMONT', abbreviation: 'VT' },
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
        { name: 'VIRGINIA', abbreviation: 'VA' },
        { name: 'WASHINGTON', abbreviation: 'WA' },
        { name: 'WEST VIRGINIA', abbreviation: 'WV' },
        { name: 'WISCONSIN', abbreviation: 'WI' },
        { name: 'WYOMING', abbreviation: 'WY' }
    ])
}
export function getcountrylist() {
    return ([
        { "name": "United States", "code": "US" },
        { "name": "Afghanistan", "code": "AF" },
        { "name": "land Islands", "code": "AX" },
        { "name": "Albania", "code": "AL" },
        { "name": "Algeria", "code": "DZ" },
        { "name": "American Samoa", "code": "AS" },
        { "name": "AndorrA", "code": "AD" },
        { "name": "Angola", "code": "AO" },
        { "name": "Anguilla", "code": "AI" },
        { "name": "Antarctica", "code": "AQ" },
        { "name": "Antigua and Barbuda", "code": "AG" },
        { "name": "Argentina", "code": "AR" },
        { "name": "Armenia", "code": "AM" },
        { "name": "Aruba", "code": "AW" },
        { "name": "Australia", "code": "AU" },
        { "name": "Austria", "code": "AT" },
        { "name": "Azerbaijan", "code": "AZ" },
        { "name": "Bahamas", "code": "BS" },
        { "name": "Bahrain", "code": "BH" },
        { "name": "Bangladesh", "code": "BD" },
        { "name": "Barbados", "code": "BB" },
        { "name": "Belarus", "code": "BY" },
        { "name": "Belgium", "code": "BE" },
        { "name": "Belize", "code": "BZ" },
        { "name": "Benin", "code": "BJ" },
        { "name": "Bermuda", "code": "BM" },
        { "name": "Bhutan", "code": "BT" },
        { "name": "Bolivia", "code": "BO" },
        { "name": "Bosnia and Herzegovina", "code": "BA" },
        { "name": "Botswana", "code": "BW" },
        { "name": "Bouvet Island", "code": "BV" },
        { "name": "Brazil", "code": "BR" },
        { "name": "British Indian Ocean Territory", "code": "IO" },
        { "name": "Brunei Darussalam", "code": "BN" },
        { "name": "Bulgaria", "code": "BG" },
        { "name": "Burkina Faso", "code": "BF" },
        { "name": "Burundi", "code": "BI" },
        { "name": "Cambodia", "code": "KH" },
        { "name": "Cameroon", "code": "CM" },
        { "name": "Canada", "code": "CA" },
        { "name": "Cape Verde", "code": "CV" },
        { "name": "Cayman Islands", "code": "KY" },
        { "name": "Central African Republic", "code": "CF" },
        { "name": "Chad", "code": "TD" },
        { "name": "Chile", "code": "CL" },
        { "name": "China", "code": "CN" },
        { "name": "Christmas Island", "code": "CX" },
        { "name": "Cocos (Keeling) Islands", "code": "CC" },
        { "name": "Colombia", "code": "CO" },
        { "name": "Comoros", "code": "KM" },
        { "name": "Congo", "code": "CG" },
        { "name": "Congo, The Democratic Republic of the", "code": "CD" },
        { "name": "Cook Islands", "code": "CK" },
        { "name": "Costa Rica", "code": "CR" },
        { "name": "Cote D\"Ivoire", "code": "CI" },
        { "name": "Croatia", "code": "HR" },
        { "name": "Cuba", "code": "CU" },
        { "name": "Cyprus", "code": "CY" },
        { "name": "Czech Republic", "code": "CZ" },
        { "name": "Denmark", "code": "DK" },
        { "name": "Djibouti", "code": "DJ" },
        { "name": "Dominica", "code": "DM" },
        { "name": "Dominican Republic", "code": "DO" },
        { "name": "Ecuador", "code": "EC" },
        { "name": "Egypt", "code": "EG" },
        { "name": "El Salvador", "code": "SV" },
        { "name": "Equatorial Guinea", "code": "GQ" },
        { "name": "Eritrea", "code": "ER" },
        { "name": "Estonia", "code": "EE" },
        { "name": "Ethiopia", "code": "ET" },
        { "name": "Falkland Islands (Malvinas)", "code": "FK" },
        { "name": "Faroe Islands", "code": "FO" },
        { "name": "Fiji", "code": "FJ" },
        { "name": "Finland", "code": "FI" },
        { "name": "France", "code": "FR" },
        { "name": "French Guiana", "code": "GF" },
        { "name": "French Polynesia", "code": "PF" },
        { "name": "French Southern Territories", "code": "TF" },
        { "name": "Gabon", "code": "GA" },
        { "name": "Gambia", "code": "GM" },
        { "name": "Georgia", "code": "GE" },
        { "name": "Germany", "code": "DE" },
        { "name": "Ghana", "code": "GH" },
        { "name": "Gibraltar", "code": "GI" },
        { "name": "Greece", "code": "GR" },
        { "name": "Greenland", "code": "GL" },
        { "name": "Grenada", "code": "GD" },
        { "name": "Guadeloupe", "code": "GP" },
        { "name": "Guam", "code": "GU" },
        { "name": "Guatemala", "code": "GT" },
        { "name": "Guernsey", "code": "GG" },
        { "name": "Guinea", "code": "GN" },
        { "name": "Guinea-Bissau", "code": "GW" },
        { "name": "Guyana", "code": "GY" },
        { "name": "Haiti", "code": "HT" },
        { "name": "Heard Island and Mcdonald Islands", "code": "HM" },
        { "name": "Holy See (Vatican City State)", "code": "VA" },
        { "name": "Honduras", "code": "HN" },
        { "name": "Hong Kong", "code": "HK" },
        { "name": "Hungary", "code": "HU" },
        { "name": "Iceland", "code": "IS" },
        { "name": "India", "code": "IN" },
        { "name": "Indonesia", "code": "ID" },
        { "name": "Iran, Islamic Republic Of", "code": "IR" },
        { "name": "Iraq", "code": "IQ" },
        { "name": "Ireland", "code": "IE" },
        { "name": "Isle of Man", "code": "IM" },
        { "name": "Israel", "code": "IL" },
        { "name": "Italy", "code": "IT" },
        { "name": "Jamaica", "code": "JM" },
        { "name": "Japan", "code": "JP" },
        { "name": "Jersey", "code": "JE" },
        { "name": "Jordan", "code": "JO" },
        { "name": "Kazakhstan", "code": "KZ" },
        { "name": "Kenya", "code": "KE" },
        { "name": "Kiribati", "code": "KI" },
        { "name": "Korea, Democratic Peoples Republic of", "code": "KP" },
        { "name": "Korea, Republic of", "code": "KR" },
        { "name": "Kuwait", "code": "KW" },
        { "name": "Kyrgyzstan", "code": "KG" },
        { "name": "Lao Peoples Democratic Republic", "code": "LA" },
        { "name": "Latvia", "code": "LV" },
        { "name": "Lebanon", "code": "LB" },
        { "name": "Lesotho", "code": "LS" },
        { "name": "Liberia", "code": "LR" },
        { "name": "Libyan Arab Jamahiriya", "code": "LY" },
        { "name": "Liechtenstein", "code": "LI" },
        { "name": "Lithuania", "code": "LT" },
        { "name": "Luxembourg", "code": "LU" },
        { "name": "Macao", "code": "MO" },
        { "name": "Macedonia, The Former Yugoslav Republic of", "code": "MK" },
        { "name": "Madagascar", "code": "MG" },
        { "name": "Malawi", "code": "MW" },
        { "name": "Malaysia", "code": "MY" },
        { "name": "Maldives", "code": "MV" },
        { "name": "Mali", "code": "ML" },
        { "name": "Malta", "code": "MT" },
        { "name": "Marshall Islands", "code": "MH" },
        { "name": "Martinique", "code": "MQ" },
        { "name": "Mauritania", "code": "MR" },
        { "name": "Mauritius", "code": "MU" },
        { "name": "Mayotte", "code": "YT" },
        { "name": "Mexico", "code": "MX" },
        { "name": "Micronesia, Federated States of", "code": "FM" },
        { "name": "Moldova, Republic of", "code": "MD" },
        { "name": "Monaco", "code": "MC" },
        { "name": "Mongolia", "code": "MN" },
        { "name": "Montenegro", "code": "ME" },
        { "name": "Montserrat", "code": "MS" },
        { "name": "Morocco", "code": "MA" },
        { "name": "Mozambique", "code": "MZ" },
        { "name": "Myanmar", "code": "MM" },
        { "name": "Namibia", "code": "NA" },
        { "name": "Nauru", "code": "NR" },
        { "name": "Nepal", "code": "NP" },
        { "name": "Netherlands", "code": "NL" },
        { "name": "Netherlands Antilles", "code": "AN" },
        { "name": "New Caledonia", "code": "NC" },
        { "name": "New Zealand", "code": "NZ" },
        { "name": "Nicaragua", "code": "NI" },
        { "name": "Niger", "code": "NE" },
        { "name": "Nigeria", "code": "NG" },
        { "name": "Niue", "code": "NU" },
        { "name": "Norfolk Island", "code": "NF" },
        { "name": "Northern Mariana Islands", "code": "MP" },
        { "name": "Norway", "code": "NO" },
        { "name": "Oman", "code": "OM" },
        { "name": "Pakistan", "code": "PK" },
        { "name": "Palau", "code": "PW" },
        { "name": "Palestinian Territory, Occupied", "code": "PS" },
        { "name": "Panama", "code": "PA" },
        { "name": "Papua New Guinea", "code": "PG" },
        { "name": "Paraguay", "code": "PY" },
        { "name": "Peru", "code": "PE" },
        { "name": "Philippines", "code": "PH" },
        { "name": "Pitcairn", "code": "PN" },
        { "name": "Poland", "code": "PL" },
        { "name": "Portugal", "code": "PT" },
        { "name": "Puerto Rico", "code": "PR" },
        { "name": "Qatar", "code": "QA" },
        { "name": "Reunion", "code": "RE" },
        { "name": "Romania", "code": "RO" },
        { "name": "Russian Federation", "code": "RU" },
        { "name": "RWANDA", "code": "RW" },
        { "name": "Saint Helena", "code": "SH" },
        { "name": "Saint Kitts and Nevis", "code": "KN" },
        { "name": "Saint Lucia", "code": "LC" },
        { "name": "Saint Pierre and Miquelon", "code": "PM" },
        { "name": "Saint Vincent and the Grenadines", "code": "VC" },
        { "name": "Samoa", "code": "WS" },
        { "name": "San Marino", "code": "SM" },
        { "name": "Sao Tome and Principe", "code": "ST" },
        { "name": "Saudi Arabia", "code": "SA" },
        { "name": "Senegal", "code": "SN" },
        { "name": "Serbia", "code": "RS" },
        { "name": "Seychelles", "code": "SC" },
        { "name": "Sierra Leone", "code": "SL" },
        { "name": "Singapore", "code": "SG" },
        { "name": "Slovakia", "code": "SK" },
        { "name": "Slovenia", "code": "SI" },
        { "name": "Solomon Islands", "code": "SB" },
        { "name": "Somalia", "code": "SO" },
        { "name": "South Africa", "code": "ZA" },
        { "name": "South Georgia and the South Sandwich Islands", "code": "GS" },
        { "name": "Spain", "code": "ES" },
        { "name": "Sri Lanka", "code": "LK" },
        { "name": "Sudan", "code": "SD" },
        { "name": "Suriname", "code": "SR" },
        { "name": "Svalbard and Jan Mayen", "code": "SJ" },
        { "name": "Swaziland", "code": "SZ" },
        { "name": "Sweden", "code": "SE" },
        { "name": "Switzerland", "code": "CH" },
        { "name": "Syrian Arab Republic", "code": "SY" },
        { "name": "Taiwan, Province of China", "code": "TW" },
        { "name": "Tajikistan", "code": "TJ" },
        { "name": "Tanzania, United Republic of", "code": "TZ" },
        { "name": "Thailand", "code": "TH" },
        { "name": "Timor-Leste", "code": "TL" },
        { "name": "Togo", "code": "TG" },
        { "name": "Tokelau", "code": "TK" },
        { "name": "Tonga", "code": "TO" },
        { "name": "Trinidad and Tobago", "code": "TT" },
        { "name": "Tunisia", "code": "TN" },
        { "name": "Turkey", "code": "TR" },
        { "name": "Turkmenistan", "code": "TM" },
        { "name": "Turks and Caicos Islands", "code": "TC" },
        { "name": "Tuvalu", "code": "TV" },
        { "name": "Uganda", "code": "UG" },
        { "name": "Ukraine", "code": "UA" },
        { "name": "United Arab Emirates", "code": "AE" },
        { "name": "United Kingdom", "code": "GB" },
        { "name": "United States Minor Outlying Islands", "code": "UM" },
        { "name": "Uruguay", "code": "UY" },
        { "name": "Uzbekistan", "code": "UZ" },
        { "name": "Vanuatu", "code": "VU" },
        { "name": "Venezuela", "code": "VE" },
        { "name": "Viet Nam", "code": "VN" },
        { "name": "Virgin Islands, British", "code": "VG" },
        { "name": "Virgin Islands, U.S.", "code": "VI" },
        { "name": "Wallis and Futuna", "code": "WF" },
        { "name": "Western Sahara", "code": "EH" },
        { "name": "Yemen", "code": "YE" },
        { "name": "Zambia", "code": "ZM" },
        { "name": "Zimbabwe", "code": "ZW" }
    ])
}
export function makealocation(country, city, projectstate, zipcode) {
    let location = `${ city }, ${projectstate} ${ zipcode } ${ country }`;
    return location;
}

export function dbUTCoutputdateobject(datestring) {
    let dateobj = new Date(datestring);
    let gettime = dateobj.getTime();
    let offset = dateobj.getTimezoneOffset();
    offset = offset * 60 * 1000;
    gettime = gettime - (offset);
    let mytime = new Date(gettime);
    return mytime;
}
export function getampm(dateobj) {
    let hours = dateobj.getHours();
    let ampm = "";
    if (hours >= 12) {
        ampm = "PM";
    }
    else {
        ampm = "AM";
    }
    return ampm;
}
export function formatMinutes(minutes) {
    if (minutes < 10) {
        return (`0${minutes}`)
    }
    else {
        return minutes;
    }
}
export function trailingzero(num) {
    let reg_ex = /^0\d$/;
    var test = reg_ex.test(num.toString());

    if (!test) {
        if (Number(num) < 10) {
            return `0${ Number(num) }`;
        }
        else {
            return num;
        }
    }
    else {
        return num;
    }
}

export function getmonth(dateobj) {

    let month = dateobj.getMonth();
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
export function militaryhourstoregular(military) {
    if (military > 12) {
        military = military - 12;
    }
    else if (military === 0) {
        military = 12;
    }
    return military;
}

export function validateZipcode(zipcode) {
    let reg_ex = /^\d{5}(?:[-\s]\d{4})?$/
    let test = reg_ex.test(zipcode);
    let message = ""
    if (!test && zipcode) {
        message += " No match found for Zipcode"
    }
    return message;
}
export function validateEmail(value) {
    var reg_ex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    var test = reg_ex.test(value)
    if (!value) {
        return (" Email address is required ")

    }

    else if (value.length > 320) {

        return (" Field length for email has been exceeded  ")

    }
    else if (!test) {

        return (" Email Address register invalid ")

    }
    else {
        return;
    }
}

export function validateProviderID(value) {
    const reg_ex = /^([A-Za-z0-9_](?:(?:[A-Za-z0-9_]|(?:\.(?!\.))){0,28}(?:[A-Za-z0-9_]))?)$/
    const test = reg_ex.test(value);
    value = value.trim();
    if (!value) {
        return " ProviderID is required ";

    }
    else if (value.length >= 30) {
        return " ProviderID should be less than 30 characters";
    }
    else if (!test) {
        return " Invalid Character in user name ";
    }

    return;
}
export function validateCity(city) {
    let message = "";
    if (city.length > 60) {
        message += " Char limit for city exceeded "
    }
    return message;
}
export function validateScope(scope) {
    let message = "";
    if (!scope) {
        message += " Scope of Work is required  "
    }
    else if (scope.length > 2499) {
        message += " 2499 Char limit for city "
    }
    return message;
}

export function validateProjectTitle(title) {
    let message = "";
    if (!title) {
        message += " Project Title is required "
    }
    else if (title.length > 160) {
        message += " 160 Char limit for title "
    }
    return message;
}

export function validateProjectScope(title) {
    let message = "";
    if (title.length > 160) {
        message += " 160 Char limit for title "
    }
    return message;
}
export function validateProjectAddress(address) {
    let message = "";
    if (address.length > 230) {
        message += " 230 Char limit for project address "
    }
    return message;
}
export function randomString(len) {
    var randomString = "";

    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < len; i++)
        randomString += charset.charAt(Math.floor(Math.random() * charset.length));

    return randomString;
}
export function MyMilestone(milestoneid, milestone, projectid, start, completion) {
    return ({ milestoneid, milestone, projectid, start, completion })
}
export function mymaterial(projectid, materialid, milestoneid, datein, description, quantity, unit, unitcost, invoiceid) {
    return { projectid, materialid, milestoneid, datein, description, quantity, unit, unitcost, invoiceid }
}
export function stateArray() {
    return ([
        { name: 'ALABAMA', abbreviation: 'AL' },
        { name: 'ALASKA', abbreviation: 'AK' },
        { name: 'ARIZONA', abbreviation: 'AZ' },
        { name: 'ARKANSAS', abbreviation: 'AR' },
        { name: 'CALIFORNIA', abbreviation: 'CA' },
        { name: 'COLORADO', abbreviation: 'CO' },
        { name: 'CONNECTICUT', abbreviation: 'CT' },
        { name: 'DELAWARE', abbreviation: 'DE' },
        { name: 'DISTRICT OF COLUMBIA', abbreviation: 'DC' },
        { name: 'FLORIDA', abbreviation: 'FL' },
        { name: 'GEORGIA', abbreviation: 'GA' },
        { name: 'HAWAII', abbreviation: 'HI' },
        { name: 'IDAHO', abbreviation: 'ID' },
        { name: 'ILLINOIS', abbreviation: 'IL' },
        { name: 'INDIANA', abbreviation: 'IN' },
        { name: 'IOWA', abbreviation: 'IA' },
        { name: 'KANSAS', abbreviation: 'KS' },
        { name: 'KENTUCKY', abbreviation: 'KY' },
        { name: 'LOUISIANA', abbreviation: 'LA' },
        { name: 'MAINE', abbreviation: 'ME' },
        { name: 'MARYLAND', abbreviation: 'MD' },
        { name: 'MASSACHUSETTS', abbreviation: 'MA' },
        { name: 'MICHIGAN', abbreviation: 'MI' },
        { name: 'MINNESOTA', abbreviation: 'MN' },
        { name: 'MISSISSIPPI', abbreviation: 'MS' },
        { name: 'MISSOURI', abbreviation: 'MO' },
        { name: 'MONTANA', abbreviation: 'MT' },
        { name: 'NEBRASKA', abbreviation: 'NE' },
        { name: 'NEVADA', abbreviation: 'NV' },
        { name: 'NEW HAMPSHIRE', abbreviation: 'NH' },
        { name: 'NEW JERSEY', abbreviation: 'NJ' },
        { name: 'NEW MEXICO', abbreviation: 'NM' },
        { name: 'NEW YORK', abbreviation: 'NY' },
        { name: 'NORTH CAROLINA', abbreviation: 'NC' },
        { name: 'NORTH DAKOTA', abbreviation: 'ND' },
        { name: 'OHIO', abbreviation: 'OH' },
        { name: 'OKLAHOMA', abbreviation: 'OK' },
        { name: 'OREGON', abbreviation: 'OR' },
        { name: 'PENNSYLVANIA', abbreviation: 'PA' },
        { name: 'RHODE ISLAND', abbreviation: 'RI' },
        { name: 'SOUTH CAROLINA', abbreviation: 'SC' },
        { name: 'SOUTH DAKOTA', abbreviation: 'SD' },
        { name: 'TENNESSEE', abbreviation: 'TN' },
        { name: 'TEXAS', abbreviation: 'TX' },
        { name: 'UTAH', abbreviation: 'UT' },
        { name: 'VERMONT', abbreviation: 'VT' },
        { name: 'VIRGIN ISLANDS', abbreviation: 'VI' },
        { name: 'VIRGINIA', abbreviation: 'VA' },
        { name: 'WASHINGTON', abbreviation: 'WA' },
        { name: 'WEST VIRGINIA', abbreviation: 'WV' },
        { name: 'WISCONSIN', abbreviation: 'WI' },
        { name: 'WYOMING', abbreviation: 'WY' }
    ])
}
