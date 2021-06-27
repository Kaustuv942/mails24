import "./LoginPage.css";
import Login from "../Login/Login";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Logo from "../../img/mail-send.png";
import axios from "axios";
// import axios from "axios";

const LoginPage = (props) => {
  const history = useHistory();
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

  const clientId =
    "743445388880-n04uveudbms4lgl342l87ne8j3j3lkvs.apps.googleusercontent.com";

  const clientSecret = "uySD0RKc6VbMU9aHfbnunJfE";
  const baseURI = "http://localhost:8080/";

  const ResponseGoogleSuccess = (response) => {
    //console.log(response);
    axios
      .post(`${baseURI}gmailsync`, response)
      .then((response) => {
        let dataObj = {
          data: {
            user: {
              gId: response.data.gId,
              id: response.data.id,
              email: response.data.email,
            },
          },
        };

        props.handleLogIn();
        props.handlePerson(dataObj);
      })
      .catch((err) => {
        console.log(err);
      });
    // props.handleLogIn();
    //console.log(props.isLoggedIn);

    history.replace("/");
    // return <Redirect to="/" />;
  };

  const responseGoogleFail = (response) => {
    console.log(response);
  };

  return (
    <div className="container">
      <div className="templateCoverBg"></div>
      <div className="row justify-content-center">
        <div className="col-4 col-md-2 col-lg-1">
          <img src={Logo} alt="logo" className="img-fluid" />
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-10 col-md-6 col-lg-4" id="logoTagline">
          Sign In to Mails24
        </div>
      </div>
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
            <Login
              btnwriteup={choices[action]}
              isLoggedIn={props.isLoggedIn}
              handleLogIn={props.handleLogIn}
              person={props.person}
              handlePerson={props.handlePerson}
            ></Login>
            <GoogleLogin
              clientId={clientId}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  id="g-btn"
                  className="login-buttons"
                >
                  LOGIN WITH GOOGLE{" "}
                </button>
              )}
              buttonText="Login"
              onSuccess={ResponseGoogleSuccess}
              onFailure={responseGoogleFail}
              cookiePolicy={"single_host_origin"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
