import React, { useRef } from "react";
import logo from "../../images/logo.png";
import "./styles.css";

const Header = () => {
  const user = { name: "" };
  const logout = false;

  return (
    <div className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} />
        </div>
        {user.name != "" ? (
          <div>
            Hello, <span>{user.name}</span>
            <button onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="user-menu">
            <div className="login">
              <button>Login</button>
            </div>
            <div className="Signup">
              <button>Signup</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
