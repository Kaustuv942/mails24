import { Compose } from "./Compose/Compose Jsx/Compose";
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
        <Compose user={props.user}/>
      )}
    </>
  );
};

export default ComposePage;
