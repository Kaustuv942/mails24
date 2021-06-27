import "./Modal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
const Modal = ({ recipient, cc, subject, body, showModal, setShowModal }) => {
  //   console.log(showModal);
  let dummyShow = showModal;
  return (
    <div
      className="ModalContainer container"
      style={{ display: showModal ? "block" : "none" }}
    >
      <FaTimes
        className="cut"
        onClick={() => {
          setShowModal(!dummyShow);
        }}
      />
      <div className="ModalHead">
        <p>To : {recipient}</p>
      </div>
      <div className="Modalcc">
        <p>cc : {cc}</p>
      </div>
      <div className="ModalMain">
        <div className="ModalSubject">
          <h4>Subject : {subject}</h4>
        </div>
        <div className="ModalBody">
          <h5>{body}</h5>
        </div>
      </div>
    </div>
  );
};

export default Modal;
