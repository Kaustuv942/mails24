import Template from "./Template/Template";
const ComposePage = (props) => {
  return (
    <>
      {!props.isLoggedIn ? (
        <Template
          handleLogin={props.handleLogin}
          isLoggedIn={props.isLoggedIn}
          purpose="redirect"
        />
      ) : (
        <h1>Compose</h1>
      )}
    </>
  );
};

export default ComposePage;
