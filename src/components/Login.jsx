import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import noteContext from "../context/notes/noteContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const history = useHistory();
  const { showAlert, Login } = useContext(noteContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Login(credentials.email, credentials.password);
      setCredentials({ email: "", password: "" });
      showAlert("Logged in successfully", "success");
      history.push("/");
    } catch (err) {
      console.log(err);
      showAlert("Invalid Credentials", "danger");
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-5">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={credentials.email}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChange}
            value={credentials.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
