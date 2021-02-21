import React from "react";
import logo from "../../images/logo.png";
import "./styles.css";
import logoutIco from "../../images/exit.png";

const Header = ({ user, logout }) => {
  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} />
        </div>
        <div>
          Hello, <span>{user.username || "guest"}</span>
          <button onClick={logout}>
            <img src={logoutIco} alt="logout" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
