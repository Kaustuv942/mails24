import Template from "./Template/Template";
import History from "./History/History";

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
        <History user={props.user}/>
      )}
    </>
  );
};

export default HistoryPage;
