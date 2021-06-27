import React, { useState } from "react";
import "../Compose css/Monthly.css";
export const Monthly = ({ recipient, cc, subject, body }) => {
  const [dateMonth, setDateMonth] = useState("");
  const [timeMonth, setTimeMonth] = useState("");
  const [maxMonth, setMaxMonth] = useState("");
  let type = "Monthly";
  let Obj;
  const handleSubmitMonth = (e) => {
    e.preventDefault();
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
      if (
        dateMonth.length === 0 ||
        timeMonth.length === 0 ||
        maxMonth.length === 0
      ) {
        alert("Please fill all the scheduling fields");
        return false;
      }
      if (maxMonth <= 0) {
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
          date: dateMonth,
          time: timeMonth,
          max: maxMonth,
        },
      };
      console.log(Obj);
    }
  };
  return (
    <div className="contMonthOut">
      <div className="monthlyContainer">
        <select
          name=""
          id=""
          className="dateDrop"
          onChange={(e) => {
            setDateMonth(e.target.value);
          }}
        >
          <option value="null" disabled selected>
            Date
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
        </select>
        <input
          type="time"
          className="Time dropDay"
          onChange={(e) => {
            setTimeMonth(e.target.value);
          }}
        />
        <input
          type="number"
          className="dropDay notimes"
          placeholder="No. of mails"
          onChange={(e) => {
            setMaxMonth(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="scheduleBtn"
        onClick={(e) => {
          handleSubmitMonth(e);
        }}
      >
        Schedule
      </button>
    </div>
  );
};
