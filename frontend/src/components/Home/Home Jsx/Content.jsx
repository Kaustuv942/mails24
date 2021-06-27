import React from "react";
import "../Home css/Content.css";
import Modal from "../../Modal/Modal";
import { useState } from "react";
export const Content = ({ recipient, id, subject, scheduled, cc, body }) => {
  // if (name.length > 12) {
  //   name = name.substring(0, 12) + "....";
  // }
  // if (subject.length > 40) {
  //   subject = subject.substring(0, 40) + "....";
  // }
  const [showModal, setShowModal] = useState(false);
  const showModalFn = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  return (
    <div className="contentCBox" onClick={showModalFn}>
      <div className="recipientHome">
        <p>{recipient}</p>
      </div>
      <div className="subjectHome">
        <p>{subject}</p>
      </div>
      <div className="scheduleHome">
        <p>{scheduled}</p>
      </div>
      {/* <div className="modalContent"> */}
      {/* <Modal
        setShowModal={setShowModal}
        showModal={showModal}
        recipient={recipient}
        key={id}
        subject={subject}
        scheduled={scheduled}
        cc={cc}
        body={body}
      />
      </div> */}
    </div>
  );
};
