import "./LoginPage.css";
import Login from "../Login/Login";
import { useState } from "react";

const LoginPage = () => {
  const choices = ["Sign Up", "Log In"];
  const [action, setAction] = useState(0);
  const handleChoiceChange = () => {
    setAction((action + 1) % 2);
  };
  var SUclass = "";
  var LIclass = "";
  if (choices[action] === "Sign Up") {
    SUclass = "enabled";
  } else {
    LIclass = "enabled";
  }
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10 col-md-4" id="card">
          <div className="Loginform row justify-content-center">
            <div className="col-4 LIbtns-container">
              <span
                className={`${SUclass} LIbtns`}
                onClick={handleChoiceChange}
              >
                Sign Up
              </span>
            </div>
            <div className="col-4">
              <span
                className={`${LIclass} LIbtns`}
                onClick={handleChoiceChange}
              >
                Log In
              </span>
            </div>
            <Login btnwriteup={choices[action]}></Login>
            <button type="submit" id="g-btn" className="login-buttons">
              LOGIN WITH GOOGLE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
