import React, { useEffect } from "react";
import useForm from "../../hooks/useForm";
import validate from "../helpers/validateInfo";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = ({ history }) => {
  const registerHandler = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const { username, email, password } = values;

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/register",
        {
          username,
          email,
          password,
        },
        config
      );

      localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const { values, handleChange, handleSubmit, errors } = useForm(
    registerHandler,
    validate
  );

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2>Register</h2>
      <div className="form-inputs">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          className="form-input"
          placeholder="Enter Your Username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="form-inputs">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-input"
          placeholder="Enter Your Email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p>{errors.email}</p>}
      </div>
      <div className="form-inputs">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          name="password"
          className="form-input"
          placeholder="Enter Your Password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>
      <div className="form-inputs">
        <label htmlFor="password2">Confirm Password:</label>
        <input
          id="password2"
          type="password"
          name="password2"
          className="form-input"
          placeholder="Re-Enter Your Password"
          value={values.password2}
          onChange={handleChange}
        />
        {errors.password2 && <p>{errors.password2}</p>}
      </div>
      <button className="form-input-btn" type="submit">
        Sign up
      </button>
      <span>
        Already have an acount? <Link to="/login">Login</Link>
      </span>
    </form>
  );
};

export default Signup;
