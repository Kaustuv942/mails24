import React, { useState } from "react";
import "../Compose css/Yearly.css";
export const Yearly = ({ recipient, cc, subject, body }) => {
  const [monthYear, setMonthYear] = useState("");
  const [dateYear, setDateYear] = useState("");
  const [timeYear, setTimeYear] = useState("");
  const [maxYear, setMaxYear] = useState("");
  const [checkFeb, setCheckFeb] = useState(false);
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
    if (body.length === 0) {
      alert("Mail Body Cannot Be Empty");
      return false;
    } else {
      if (
        monthYear.length === 0 ||
        dateYear.length === 0 ||
        timeYear.length === 0 ||
        maxYear.length === 0
      ) {
        alert("Please fill all the scheduling fields");
        return false;
      }
      if (maxYear <= 0) {
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
          month: monthYear,
          date: dateYear,
          time: timeYear,
          max: maxYear,
        },
      };
      console.log(Obj);
    }
  };
  const setMonthfn = (e) => {
    // console.log(e.target.value);
    if (e.target.value === "Feb") {
      setCheckFeb(true);
    } else {
      setCheckFeb(false);
    }
    // console.log(checkFeb);
    setMonthYear(e.target.value);
  };
  return (
    <div className="contYearOut">
      <div className="monthlyContainer">
        <select
          name=""
          id=""
          className="dateDrop"
          onChange={(e) => {
            setMonthfn(e);
          }}
        >
          <option value="null" disabled selected>
            Month
          </option>
          <option value="Jan">January</option>
          <option value="Feb">February</option>
          <option value="Mar">March</option>
          <option value="Apr">April</option>
          <option value="May">May</option>
          <option value="Jun">June</option>
          <option value="Jul">July</option>
          <option value="Aug">August</option>
          <option value="Sep">September</option>
          <option value="Oct">October</option>
          <option value="Nov">November</option>
          <option value="Dec">December</option>
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
          <option value="29" disabled={checkFeb}>
            29
          </option>
          <option value="30" disabled={checkFeb}>
            30
          </option>
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
          min="1"
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
