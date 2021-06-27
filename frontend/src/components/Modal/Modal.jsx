import "./Modal.css";
const Modal = ({ recipient, cc, subject, body }) => {
  return (
    <div className="ModalContainer container">
      <div className="ModalHead">
        <h1>{recipient}</h1>
      </div>
      <div className="Modalcc">
        <h2>{cc}</h2>
      </div>
      <div className="ModalSubject">
        <h2>{subject}</h2>
      </div>
      <div className="ModalBody">
        <h3>{body}</h3>
      </div>
    </div>
  );
};

export default Modal;
