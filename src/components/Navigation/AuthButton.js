import React from "react";
import { observer } from "mobx-react";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

function AuthButton(props) {
  const authStore = props.authStore;
  let buttons;

  if (authStore.isLoggedIn) {
    buttons = (
      <li className="nav-item">
        <a className="nav-link" data-toggle="modal" data-target="#logoutModal">
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </a>
      </li>
    );
  } else {
    buttons = [
      <li key="loginButton" className="nav-item">
        <a className="nav-link" data-toggle="modal" data-target="#loginModal">
          <FontAwesomeIcon icon={faSignInAlt} /> Login
        </a>
      </li>,
      <li key="signupButton" className="nav-item">
        <a className="nav-link" data-toggle="modal" data-target="#signupModal">
          <FontAwesomeIcon icon={faUserPlus} /> Signup
        </a>
      </li>
    ];
  }

  return <ul className="navbar-nav ml-auto">{buttons}</ul>;
}

export default observer(AuthButton);