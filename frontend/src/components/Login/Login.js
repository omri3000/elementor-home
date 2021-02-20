import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      history.push("/");
    }
  }, [history]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    if (email.trim() == "") {
      setErrors((prev) => [...prev, "Invalid username or password"]);
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/auth/login",
        {
          email,
          password,
        },
        config
      );

      console.log("token ", data.token);

      localStorage.setItem("authToken", JSON.stringify(data.token));

      history.push("/");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleCahngeUsername = (e) => {
    setErrors([]);
    setEmail(e.target.value);
  };

  const handleCahngePasword = (e) => {
    setErrors([]);
    setPassword(e.target.value);
  };

  return (
    <form className="form" onSubmit={handleLogin}>
      <div className="inner-form">
        <h2>Login</h2>
        {errors}
        <div className="form-inputs">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-input"
            placeholder="Enter Your Email"
            onChange={handleCahngeUsername}
          />
        </div>
        <div className="form-inputs">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            name="password"
            className="form-input"
            placeholder="Enter Your Password"
            onChange={handleCahngePasword}
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
  );
};

export default Login;
