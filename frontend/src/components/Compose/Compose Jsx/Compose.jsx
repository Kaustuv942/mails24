import React from "react";
import "../Compose css/Compose.css";
import { EmailForm } from "./EmailForm";
export const Compose = (props) => {
  return (
    <div>
      <EmailForm user={props.user}/>
    </div>
  );
};
