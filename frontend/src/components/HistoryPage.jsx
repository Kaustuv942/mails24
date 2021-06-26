import Template from "./Template/Template";
const HistoryPage = (props) => {
  return (
    <>
      {!props.isLoggedIn ? (
        <Template
          handleLogin={props.handleLogin}
          isLoggedIn={props.isLoggedIn}
          purpose="redirect"
        />
      ) : (
        <h1>History</h1>
      )}
    </>
  );
};

export default HistoryPage;
