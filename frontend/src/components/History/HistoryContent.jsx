import React from "react";
import "./HistoryContent.css";
export const HistoryContent = ({ name, id, subject, scheduled }) => {
  return (
    <div className="contentCBox">
      <div className="recipientHistory">
        <p>{name}</p>
      </div>
      <div className="subjectHistory">
        <p>{subject}</p>
      </div>
      <div className="scheduleHistory">
        <p>{scheduled}</p>
      </div>
    </div>
  );
};
