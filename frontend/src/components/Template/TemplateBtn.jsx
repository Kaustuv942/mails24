import { Link } from "react-router-dom";

const TemplateBtn = (props) => {
  const handleLogout = () => {
    props.handleLogIn();
  };

  return (
    <>
      {props.purpose === "redirect" ? (
        <Link to="/sign-up">
          <button id="templateBtn">Sign in to continue</button>
        </Link>
      ) : (
        <button id="templateBtn" onClick={handleLogout}>
          Logout
        </button>
      )}
    </>
  );
};

export default TemplateBtn;
