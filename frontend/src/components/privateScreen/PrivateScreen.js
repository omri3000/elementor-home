import React, { useEffect, useState, useCallback } from "react";
import Header from "./Header/Header";
import axios from "axios";
import Posts from "../Posts/Posts";
import Form from "./Form/Form";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [user, setUser] = useState({});
  const [create, setCreate] = useState(false);

  const fetchPrivateData = useCallback(async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    };

    try {
      const { data } = await axios.get(
        "http://localhost:4000/api/private",
        config
      );
      setUser(data.user);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You are not authrized please login");
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("authToken")) {
      history.push("/login");
    }

    fetchPrivateData();
  }, [history, fetchPrivateData]);

  const logoutHandler = () => {
    localStorage.removeItem("authToken");
    setUser({});
    history.push("/login");
  };

  const cearteHnadler = () => {
    setCreate(!create);
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <div className="private-container">
      <Header user={user} logout={logoutHandler} />
      <div className="post-container">
        <Posts update={create} user={user} />
        <Form cearteHnadler={cearteHnadler} user={user} />
      </div>
    </div>
  );
};

export default PrivateScreen;
