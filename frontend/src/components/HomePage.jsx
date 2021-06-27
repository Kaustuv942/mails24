import Template from "./Template/Template";
import { Home } from "./Home/Home Jsx/Home";

const HomePage = (props) => {
  return (
    <>
      {!props.isLoggedIn ? (
        <Template
          handleLogin={props.handleLogin}
          isLoggedIn={props.isLoggedIn}
          purpose="redirect"
        />
      ) : (
        <Home user={props.user} />
      )}
    </>
  );
};

export default HomePage;
