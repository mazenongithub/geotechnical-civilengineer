  import React from 'react';

  export function validatephonenumber(fieldvalue) {
    if (fieldvalue.length > 0) {
      var reg_ex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
      return reg_ex.test(fieldvalue)
    }
    return true;
  }

  export function validatezipcode(fieldvalue) {
    if (fieldvalue.length > 0) {
      var reg_ex = /^\d{5}(?:[-\s]\d{4})?$/
      return reg_ex.test(fieldvalue)
    }
    return true;
  }
  export function validatenamefield(fieldvalue) {
    if (fieldvalue.length === 0) {
      return false;
    }
    if (fieldvalue.length > 32) {
      return false;
    }
    return true;
  }

  export function validatebasic(fieldvalue) {
    if (fieldvalue.length > 80) {
      return false;
    }
    return true;
  }

  export function validateprojectid(projectid) {
    projectid = Number(projectid)
    if (projectid === 0 || !projectid) {
      return false;
    }
    return true;
  }

  export function validemailaddress(emailaddress) {
    var reg_ex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/
    return reg_ex.test(emailaddress)
  }

  export function passwordfield(fieldname, errmsg, label) {
    return (
      <div className="grid-container-1">
          <div className="grid-element-1">
          {label}
          </div>
          <div className="grid-element-1">
          <input type="password" name={fieldname} id={fieldname} className="signuptext" />
          </div>
          <div> {errmsg} </div>
          </div>
    )
  }
  export function drawline(x1, y1, x2, y2) {
    const g = document.getElementById("figure-translate");
    var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'line'); //Create a path in SVG's namespace
    newElement.setAttribute("x1", x1); //Set path's data
    newElement.setAttribute("x2", x2); //Set path's data
    newElement.setAttribute("y1", y1); //Set path's data
    newElement.setAttribute("y2", y2); //Set path's data
    newElement.style.stroke = "black"; //Set stroke colour
    newElement.style.strokeWidth = "3px"; //Set stroke width
    g.appendChild(newElement);

  }


  export function drawrectangle(x1, y1, width, height) {
    const g = document.getElementById("figure-translate");
    var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttributeNS(null, 'x', x1);
    rect.setAttributeNS(null, 'y', y1);
    rect.setAttributeNS(null, 'height', height);
    rect.setAttributeNS(null, 'width', width);
    rect.setAttributeNS(null, 'class', "block");
    rect.setAttributeNS(null, 'style', 'stroke:black;stroke-width:3;fill:none')
    g.appendChild(rect);
  }
  