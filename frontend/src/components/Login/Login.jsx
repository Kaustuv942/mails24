import { useFormik } from "formik";
import "./Login.css";

const validate = (values) => {
  const errors = {};
  if (!values.password) {
    errors.password = "Required";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  return errors;
};

const baseURI = "http://localhost:3000/";

const Login = (props) => {
  let postPurpose;
  const purpose = props.btnwriteup;
  purpose === "Sign Up" ? (postPurpose = "signup") : (postPurpose = "login"); //whether the button is for signup or login

  const formik = useFormik({
    initialValues: {
      password: "",
      email: "",
    },
    validate,
    onSubmit: (values) => {
      const check = `${baseURI}${postPurpose}/`;
      console.log(check);
      // axios.post(`${baseURI}${postPurpose}/`,JSON.stringify(values, null, 2))
      // .then(function (response) {
      //   console.log(response);
      //   if(response.statusCode===200){
      //     //check purpose
      //       //if purpose is signup display success message but dont redirect
      //       //if purpose is login set isLoggedIn to true and redirect to homepage
      //   }else{
      //     //display reason for error but dont redirect
      //   }
      // })
      // .catch(function (error) {
      //   console.log(error);
      // })
      formik.resetForm();
      alert(JSON.stringify(values, null, 2));
    },
  });
  var emailErr;
  var passErr;

  formik.errors.email ? (emailErr = "redmarker") : (emailErr = "");

  formik.errors.password ? (passErr = "redmarker") : (passErr = "");

  return (
    <div className="container">
      <div className="row justify-content-center">
        <form onSubmit={formik.handleSubmit}>
          <div className="email">
            <label htmlFor="email" className="h6">
              Username
            </label>
            <br />
            <input
              id="email"
              name="email"
              type="textarea"
              onChange={formik.handleChange}
              value={formik.values.email}
              className={emailErr}
            />
            {formik.errors.email ? (
              <span className="error-message">{formik.errors.email}</span>
            ) : null}
          </div>
          <br />
          <label htmlFor="password" className="h6">
            Password
          </label>
          <br />
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className={passErr}
          />
          {formik.errors.password ? (
            <span className="error-message">{formik.errors.password}</span>
          ) : null}
          <br />
          <button type="submit" id="sub-btn" className="login-buttons">
            {purpose}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
