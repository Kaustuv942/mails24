import Template from "./Template/Template";
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
        <h1>Home</h1>
      )}
    </>
  );
};

export default HomePage;
