import LoginPage from "./LoginPage";
import Template from "../Template/Template";

const SignInPage = (props) => {
  return (
    <>
      {!props.isLoggedIn ? (
        <LoginPage
          isLoggedIn={props.isLoggedIn}
          handleLogIn={props.handleLogIn}
          person={props.person}
          handlePerson={props.handlePerson}
        />
      ) : (
        <Template
          handleLogIn={props.handleLogIn}
          isLoggedIn={props.isLoggedIn}
          purpose="logout"
        />
      )}
    </>
  );
};

export default SignInPage;
