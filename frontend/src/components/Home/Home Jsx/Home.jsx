import React, { useState } from "react";
import "../Home css/Home.css";
import { Content } from "./Content";
import data from "../../data.json";

import { FaSearch } from "react-icons/fa";
import Modal from "../../Modal/Modal";

export const Home = () => {
  //   console.log(data);
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
      <Content
        recipient={res.name}
        key={res.id}
        subject={res.subject}
        scheduled={res.scheduled}
        cc={res.cc}
        body={res.body}
      />
    );
  });

  return (
    <div>
      <div className="homeBackground"></div>

      <div className="container mainContainer homeContainers">
        <div className="search">
          <FaSearch className="searchIcon" />
          <input
            type="text"
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search in HOME"
          />
        </div>
        <div className="container homeContainer0 homeContainers">
          <div className="contHead">
            <div className="recipientHead">Recipient</div>
            <div className="subjectHead">Subject of the mail</div>
            <div className="scheduleHead">Scheduled For</div>
          </div>
          <div className="content-box">{dataArr}</div>
        </div>
      </div>
    </div>
  );
};
