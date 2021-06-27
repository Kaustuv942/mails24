import "./Template.css";
import Illustration from "../../img/illustration.png";
import TemplateBtn from "./TemplateBtn";

const Template = (props) => {
  return (
    <div className="container" id="templateContainer">
      <div className="templateCoverBg"></div>
      <div className="row justify-content-center">
        <div className="col-10 col-lg-4" id="description">
          <div className="row">
            <h2>Welcome to Mails24</h2>
          </div>
          <div className="row">
            <h4>An advanced mailing service.</h4>
          </div>
          <div className="row" id="templateBtnContainer">
            <TemplateBtn
              purpose={props.purpose}
              handleLogIn={props.handleLogIn}
            />
            {/* <button id="templateBtn">{props.btnText}</button> */}
          </div>
        </div>
        <div className="col-10 col-lg-4" id="infographic">
          <img src={Illustration} alt="infographic" class="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Template;
