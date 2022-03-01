import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import "./header.styles.scss";

import { ReactComponent as Logo } from "../../assets/nobugs.svg";
import { auth } from "../../firebase/firebase.utils";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => {
  return (
    <div className="header">
      <Link className="logo-container" to="/home">
        <Logo className="logo" />
      </Link>
      <div className="options">
        <Link className="option" to="/shop">
          Shop
        </Link>
        <Link className="option" to="/contact">
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
            Sign In
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

        <div className="option">
          <CartIcon />
        </div>

        {hidden ? null : <CartDropdown />}
      </div>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

export default connect(mapStateToProps)(Header);
