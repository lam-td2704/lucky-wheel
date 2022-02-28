import React from "react";
import { Link } from "react-router-dom";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/nobugs.svg";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
  const renderMenuAfterSignIn = (currentUser) => {
    if (currentUser) {
      return (
        <div
          className="option"
          onClick={() => auth.signOut()}
          style={{ cursor: "pointer" }}
        >
          Sign Out
        </div>
      );
    } else {
      return (
        <Link className="option" to="/login">
          Login
        </Link>
      );
    }
  };
  return (
    <div className="header">
      <Link className="logo-container" to="/home">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          Contact
        </Link>
        {currentUser ? (
          <div
            className="option"
            onClick={() => auth.signOut()}
            style={{ cursor: "pointer" }}
          >
            Sign Out
          </div>
        ) : (
          <Link className="option" to="/login">
            Login
          </Link>
        )}

        {currentUser ? (
          <div
            className="option"
            onClick={() => auth.signOut()}
            style={{ cursor: "pointer" }}
          >
            {currentUser.displayName}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
