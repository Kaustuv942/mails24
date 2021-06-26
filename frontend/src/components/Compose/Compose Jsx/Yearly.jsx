import React, { useState } from "react";
import "../Compose css/Yearly.css";
export const Yearly = ({ recipient, cc, subject, body }) => {
  const [monthYear, setMonthYear] = useState("");
  const [dateYear, setDateYear] = useState("");
  const [timeYear, setTimeYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  let Obj;
  let type = "Yearly";
  const handleClickYear = (e) => {
    e.preventDefault();
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
          month: monthYear,
          date: dateYear,
          time: timeYear,
          max: maxYear,
        },
      };
      console.log(Obj);
    }
  };
  return (
    <div className="contYearOut">
      <div className="monthlyContainer">
        <select
          name=""
          id=""
          className="dateDrop"
          onChange={(e) => {
            setMonthYear(e.target.value);
          }}
        >
          <option value="null" disabled selected>
            Month
          </option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <select
          name=""
          id=""
          className="dateDrop"
          onChange={(e) => {
            setDateYear(e.target.value);
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
            setTimeYear(e.target.value);
          }}
        />
        <input
          type="number"
          className="dropDay notimes"
          placeholder="No. of mails"
          onChange={(e) => {
            setMaxYear(e.target.value);
          }}
        />
      </div>
      <button
        type="submit"
        className="scheduleBtn"
        onClick={(e) => {
          handleClickYear(e);
        }}
      >
        Schedule
      </button>
    </div>
  );
};
