import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = props => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark fixed-top nav-nav"
      id="mainNav"
      style={{ backgroundColor: "#1c2331" }}
    >
      <Link className="navbar-brand" to="/welcome">
        <h4 style={{ fontFamily: "Droid Arabic Kufi" }}>سواليف </h4>
      </Link>
      <button
        className="navbar-toggler navbar-toggler-right"
        type="button"
        data-toggle="collapse"
        data-target="#navbarResponsive"
        aria-controls="navbarResponsive"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>

      <div className="collapse navbar-collapse" id="navbarResponsive">
        <SideNav />
      </div>

      <AuthButton />
    </nav>
  );
};

/**
 * Unused
 */
const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(NavBar);
