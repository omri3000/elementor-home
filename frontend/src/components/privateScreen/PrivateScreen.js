import React, { useEffect, useState, useCallback } from "react";
import Header from "../Header/Header";
import axios from "axios";

const PrivateScreen = ({ history }) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

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
      setPrivateData(data.data);
    } catch (error) {
      localStorage.removeItem("authToken");
      setError("You arf not authrized please login");
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
    history.push("/login");
  };

  return error ? (
    <span className="error-message">{error}</span>
  ) : (
    <>
      <Header logout={logoutHandler} />
      <div style={{ background: "green", color: "white" }}>{privateData}</div>
    </>
  );
};

export default PrivateScreen;
