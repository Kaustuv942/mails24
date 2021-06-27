import React, { useState } from "react";
import { Recurring } from "./Recurring";
import { Monthly } from "./Monthly";
import { Yearly } from "./Yearly";
import { Weekly } from "./Weekly";
import { Normal } from "./Normal";
export const EmailForm = () => {
  const [showRec, setshowRec] = useState(false);
  const [showWeek, setshowWeek] = useState(false);
  const [showMonth, setshowMonth] = useState(false);
  const [showYear, setshowYear] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(true);

  const fnWeek = (e) => {
    setDisplayBtn(false);
    e.target.classList.add("abc");
    document.querySelector(".RecBtn").classList.remove("abc");
    document.querySelector(".YearlyBtn").classList.remove("abc");
    document.querySelector(".MonthlyBtn").classList.remove("abc");
    setshowMonth(false);
    setshowRec(false);
    setshowYear(false);
    setshowWeek(true);
  };
  const fnMonth = (e) => {
    setDisplayBtn(false);
    e.target.classList.add("abc");
    document.querySelector(".RecBtn").classList.remove("abc");
    document.querySelector(".YearlyBtn").classList.remove("abc");
    document.querySelector(".WeeklyBtn").classList.remove("abc");
    setshowMonth(true);
    setshowRec(false);
    setshowYear(false);
    setshowWeek(false);
  };
  const fnYear = (e) => {
    setDisplayBtn(false);
    e.target.classList.add("abc");
    document.querySelector(".MonthlyBtn").classList.remove("abc");
    document.querySelector(".RecBtn").classList.remove("abc");
    document.querySelector(".WeeklyBtn").classList.remove("abc");
    setshowMonth(false);
    setshowRec(false);
    setshowYear(true);
    setshowWeek(false);
  };
  const fnRec = (e) => {
    setDisplayBtn(false);
    e.target.classList.add("abc");
    document.querySelector(".MonthlyBtn").classList.remove("abc");
    document.querySelector(".YearlyBtn").classList.remove("abc");
    document.querySelector(".WeeklyBtn").classList.remove("abc");
    setshowMonth(false);
    setshowRec(true);
    setshowYear(false);
    setshowWeek(false);
  };

  const [recipient, setRecipient] = useState("");
  const [cc, setCC] = useState("");
  const [subject, setSubject] = useState(null);
  const [body, setBody] = useState("");

  const handleRecipientChange = (e) => {
    setRecipient(e.target.value);
  };
  const handleCCChange = (e) => {
    setCC(e.target.value);
  };
  const handleSubjectChange = (e) => {
    setSubject(e.target.value);
  };
  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  return (
    <div>
      <div className="emailBackground"></div>
      <div className="container mainEmailContainer composeContainer">
        <div className="buttons">
          <button
            className="choose RecBtn"
            onClick={(e) => {
              fnRec(e);
            }}
          >
            Recurring
          </button>
          <button
            className="choose WeeklyBtn"
            onClick={(e) => {
              fnWeek(e);
            }}
          >
            Weekly
          </button>
          <button
            className="choose MonthlyBtn"
            onClick={(e) => {
              fnMonth(e);
            }}
          >
            Monthly
          </button>
          <button
            className="choose YearlyBtn"
            onClick={(e) => {
              fnYear(e);
            }}
          >
            Yearly
          </button>
        </div>
        <div className="container formContainer composeContainer">
          <form className="emailForm">
            <div className="recipientContainer">
              <p>Recipient</p>
              <input
                type="email"
                className="recipient formItem"
                placeholder="xyz@gmail.com , abc@gmail.com"
                onChange={(e) => {
                  handleRecipientChange(e);
                }}
              />
            </div>
            <div className="ccContainer">
              <p>CC</p>
              <input
                type="text"
                className="cc formItem"
                placeholder="xyz@gmail.com , abc@gmail.com"
                onChange={(e) => {
                  handleCCChange(e);
                }}
              />
            </div>
            <div className="ccContainer subjectContainer">
              <p>Subject</p>
              <input
                type="text"
                className="subject formItem"
                onChange={(e) => {
                  handleSubjectChange(e);
                }}
              />
            </div>
            <textarea
              name="mailBody"
              id="mailBody"
              className="mailBody formItem"
              onChange={(e) => {
                handleBodyChange(e);
              }}
            ></textarea>
            <Normal
              displayBtn={displayBtn}
              recipient={recipient}
              cc={cc}
              subject={subject}
              body={body}
            />
            <div className="optionSelect">
              {showRec ? (
                <Recurring
                  recipient={recipient}
                  cc={cc}
                  subject={subject}
                  body={body}
                />
              ) : null}
              {showWeek ? (
                <Weekly
                  recipient={recipient}
                  cc={cc}
                  subject={subject}
                  body={body}
                />
              ) : null}
              {showMonth ? (
                <Monthly
                  recipient={recipient}
                  cc={cc}
                  subject={subject}
                  body={body}
                />
              ) : null}
              {showYear ? (
                <Yearly
                  recipient={recipient}
                  cc={cc}
                  subject={subject}
                  body={body}
                />
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
