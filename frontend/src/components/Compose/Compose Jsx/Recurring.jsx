import React, { useState } from "react";
import "../Compose css/Recurring.css";

export const Recurring = ({ recipient, cc, subject, body }) => {
  const [timeRec, setTimeRec] = useState("");
  const [maxRec, setmaxRec] = useState("N/A");
  let type = "Recurring";
  let Obj;
  const handleSubmit = (e) => {
    // console.log(recipient);
    e.preventDefault();
    if (recipient.length == 0) {
      alert("There has to be atleast 1 recipient");
    } else {
      var emailRegEx =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let str = recipient;
      var array = str.split(",");
      for (var i = 0; i < array.length; i++) {
        var email = array[i].trim();
        if (!email.match(emailRegEx)) {
          alert("The email address " + ' "' + email + '" ' + " is invalid");
          return false;
        }
      }
      if (cc.length !== 0) {
        let str2 = cc;
        var array = str2.split(",");
        for (var i = 0; i < array.length; i++) {
          var email = array[i].trim();
          if (!email.match(emailRegEx)) {
            alert("The email address " + ' "' + email + '" ' + " is invalid");
            return false;
          }
        }
      }
      if (body.length == 0) {
        alert("Mail Body Cannot Be Empty");
        return false;
      } else {
        if (timeRec.length === 0 || maxRec.length === 0) {
          alert("Please fill all the scheduling fields");
          return false;
        }
        if (maxRec <= 0) {
          alert("Number of mails to be sent cannot be negative or 0");
          return false;
        }
        Obj = {
          mail: {
            to: recipient.replace(/\s+/g, ""),
            from: "N/A",
            cc: cc.replace(/\s+/g, ""),
            subject: subject,
            body: body,
          },
          schedule: {
            type: type,
            time: timeRec,
            max: maxRec,
          },
        };
        console.log(Obj);
      }
    }
  };

  return (
    <div className="contRecOut">
      <div className="recContainer">
        <select
          name="Time"
          className="timeSelect"
          onChange={(e) => {
            setTimeRec(e.target.value);
          }}
        >
          <option value="null" disabled selected>
            Time (s)
          </option>
          <option value="20">20s</option>
          <option value="30">30s</option>
        </select>
        <input
          type="number"
          className="dropDay notimes"
          placeholder="No. of mails"
          onChange={(e) => {
            setmaxRec(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="scheduleBtn"
        onClick={(e) => {
          handleSubmit(e);
        }}
      >
        Schedule
      </button>
    </div>
  );
};
