import React from "react";
import "../Home css/Content.css";
export const Content = ({ name, id, subject, scheduled }) => {
  // if (name.length > 12) {
  //   name = name.substring(0, 12) + "....";
  // }
  // if (subject.length > 40) {
  //   subject = subject.substring(0, 40) + "....";
  // }
  return (
    <div className="contentCBox">
      <div className="recipientHome">
        <p>{name}</p>
      </div>
      <div className="subjectHome">
        <p>{subject}</p>
      </div>
      <div className="scheduleHome">
        <p>{scheduled}</p>
      </div>
    </div>
  );
};
