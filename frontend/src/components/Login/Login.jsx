import { useFormik } from "formik";
import "./Login.css";
import axios from 'axios'

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

const baseURI = "http://localhost:8080/";

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
      const check = `${baseURI}${postPurpose}`;
      console.log(check);
      axios.post(`${baseURI}${postPurpose}`, values)
      .then(function (response, error) {
        console.log(response);
        if(response.status === 200){
            
            if(postPurpose === "signup"){
                alert('User Registered successfully') 
            }  
            else{
                // alert('Login Successful')
                props.handleLogIn(response)
            }
        }else if(response.status === 204){
          //User Already exists, can't register
            alert("User Already exists, can't register")
        }
        else if(response.status === 209){
            // password mismatch in login
            alert('Password mismatch in login')
        }
        // else if(response.status === 203){
        else{
            alert("User doesn't exist, try again")
        }
      })
      .catch(function (error) {
        console.log(error);
        // if(error.response.status === 401){
        //     alert('Password mismatch in login')
        // }
      })
      formik.resetForm();
    //   alert(JSON.stringify(values, null, 2));
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
