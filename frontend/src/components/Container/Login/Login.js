import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrors([]);

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { email, password } = values;

    if (email.trim() == "" || password == "") {
      setErrors(() => ["Invalid username or password"]);
    } else if (errors.length == 0) {
      try {
        const { data } = await axios.post(
          "http://localhost:4000/api/auth/login",
          {
            email,
            password,
          },
          config
        );

        localStorage.setItem("authToken", data.token);

        history.push("/");
      } catch (error) {
        setErrors(() => ["Invalid username or password"]);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrors([]);

    setValues({
      ...values,
      [name]: value,
    });
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleLogin}>
        <div className="inner-form">
          <h2>Login</h2>
          <span className="error-text">{errors}</span>
          <div className="form-inputs">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter Your Email"
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-inputs">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              className="form-input"
              placeholder="Enter Your Password"
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <button className="form-input-btn" type="submit">
            Login
          </button>
          <span>
            Don't have an acount? <Link to="/register">Signup</Link>
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
