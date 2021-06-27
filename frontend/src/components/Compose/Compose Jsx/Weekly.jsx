import React, { useState } from "react";
import "../Compose css/Weekly.css";
export const Weekly = ({ recipient, cc, subject, body }) => {
  const [dayWeek, setDayWeek] = useState("");
  const [timeWeek, setTimeWeek] = useState("");
  const [maxWeek, setMaxWeek] = useState("");
  let type = "Weekly";
  let Obj;
  const handleSubmitWeek = (e) => {
    e.preventDefault();
    if (recipient.replace(/\s+/g, "").length == 0) {
      alert("There has to be atleast 1 recipient");
      return false;
    }
    var emailRegEx =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    let str = recipient;
    // console.log(str);
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
      // console.log(str2);
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
      if (
        dayWeek.length === 0 ||
        timeWeek.length === 0 ||
        maxWeek.length === 0
      ) {
        alert("Please fill all the scheduling fields");
        return false;
      }
      if (maxWeek <= 0) {
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
          day: dayWeek,
          time: timeWeek,
          max: maxWeek,
        },
      };
      console.log(Obj);
    }
  };
  return (
    <div className="contWeekOut">
      <div className="weeklyContainer">
        <select
          name="Day"
          className="dropDay"
          onChange={(e) => {
            setDayWeek(e.target.value);
          }}
        >
          <option value="null" disabled selected>
            Day
          </option>
          <option value="Mon">Monday</option>
          <option value="Tues">Tuesday</option>
          <option value="Wednes">Wednesday</option>
          <option value="Thur">Thursday</option>
          <option value="Fri">Friday</option>
          <option value="Satur">Saturday</option>
          <option value="Sun">Sunday</option>
        </select>
        <input
          type="time"
          className="Time dropDay"
          onChange={(e) => {
            setTimeWeek(e.target.value);
          }}
        />
        <input
          type="number"
          className="dropDay notimes"
          placeholder="No. of mails"
          onChange={(e) => {
            setMaxWeek(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="scheduleBtn"
        onClick={(e) => {
          handleSubmitWeek(e);
        }}
      >
        Schedule
      </button>
    </div>
  );
};
