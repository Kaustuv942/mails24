import React, { useState } from "react";
import "./HistoryContent.css";
import Modal from "../Modal/Modal";
export const HistoryContent = ({
  recipient,
  id,
  cc,
  body,
  subject,
  scheduled,
}) => {
  const [showModal, setShowModal] = useState(false);
  const showModalFn = () => {
    setShowModal(!showModal);
    console.log(showModal);
  };
  return (
    <div className="contentCBox" onClick={showModalFn}>
      <div className="recipientHistory">
        <p>{recipient}</p>
      </div>
      <div className="subjectHistory">
        <p>{subject}</p>
      </div>
      <div className="scheduleHistory">
        <p>{scheduled}</p>
      </div>
      <div>
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          recipient={recipient}
          key={id}
          subject={subject}
          scheduled={scheduled}
          cc={cc}
          body={body}
        />
      </div>
    </div>
  );
};
