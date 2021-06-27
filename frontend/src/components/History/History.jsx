import "./History.css";
import React, { useState } from "react";
import { HistoryContent } from "./HistoryContent";
import data from "../data.json";
import { FaSearch } from "react-icons/fa";

const History = (props) => {
  //   console.log(data);
  const person = props.user.data.user.email
  const [Data, setData] = useState(data);
  const [search, setSearch] = useState("");
  let dataArr = Data.filter((val) => {
    if (search === "") {
      return val;
    } else if (
      val.name.toLowerCase().includes(search.toLowerCase()) ||
      val.subject.toLowerCase().includes(search.toLowerCase()) ||
      val.scheduled.toLowerCase().includes(search.toLowerCase())
    ) {
      return val;
    }
  }).map((res) => {
    return (
      <HistoryContent
        name={res.name}
        key={res.id}
        subject={res.subject}
        scheduled={res.scheduled}
      />
    );
  });

  return (
    <div>
      <div className="historyBackground"></div>
      <div className="container mainContainer historyContainers">
        <div className="search">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search in HISTORY"
          />
        </div>
        <div className="container historyContainer0 historyContainers">
          <div className="contHead">
            <div className="recipientHead">Recipient</div>
            <div className="subjectHead">Subject of the mail</div>
            <div className="scheduleHead">Sent on</div>
          </div>
          <div className="content-box">{dataArr}</div>
        </div>
      </div>
    </div>
  );
};

export default History;
