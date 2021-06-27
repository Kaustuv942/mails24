import "./Modal.css";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
const Modal = ({ recipient, cc, subject, body, showModal, setShowModal }) => {
  //   console.log(showModal);
  const [showornot, setsShowornot] = useState(showModal);
  return (
    <div className="showornot">
      <div className={` ${showModal}`}>
        <FaTimes className="cut" onClick={() => setShowModal(!showModal)} />
        <div className="ModalHead">
          <p>To : {recipient}</p>
        </div>
        <div className="Modalcc">
          <p>cc : {cc}</p>
        </div>
        <div className="ModalMain">
          <div className="ModalSubject">
            <p>Subject : {subject}</p>
          </div>
          <div className="ModalBody">
            <h5>{body}</h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
