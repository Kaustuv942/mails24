import React from "react";

export const Normal = ({ displayBtn, recipient, cc, subject, body }) => {
  let type = "none";
  let Obj;
  const handleSubmit = (e) => {
    e.preventDefault();
    if (recipient.length == 0) {
      alert("There has to be atleast 1 recipient");
    } else {
      var emailRegEx =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      let str = recipient;
      var array = str.split(",");
      for (var i = 0; i < array.length; i++) {
        var email = array[i].trim();
        if (!email.match(emailRegEx)) {
          alert("The email address " + ' "' + email + '" ' + " is invalid");
          return false;
        }
      }
      if (cc.length !== 0) {
        let str2 = cc;
        var array = str2.split(",");
        for (var i = 0; i < array.length; i++) {
          var email = array[i].trim();
          if (!email.match(emailRegEx)) {
            alert("The email address " + ' "' + email + '" ' + " is invalid");
            return false;
          }
        }
      }
      if (body.length == 0) {
        alert("Mail Body Cannot Be Empty");
        return false;
      } else {
        Obj = {
          mail: {
            to: recipient.replace(/\s+/g, ""),
            from: "N/A",
            cc: cc.replace(/\s+/g, ""),
            subject: subject,
            body: body,
          },
          schedule: {
            type: type,
          },
        };
        console.log(Obj);
      }
    }
  };
  return (
    <div>
      <button
        type="submit"
        className="scheduleBtn"
        onClick={(e) => {
          handleSubmit(e);
        }}
        style={{ display: displayBtn ? "block" : "none" }}
      >
        Schedule
      </button>
    </div>
  );
};
