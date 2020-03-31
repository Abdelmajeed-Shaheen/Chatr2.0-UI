import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user }) => {
  if (user) return <Redirect to="/private" />;
  return (
    <div className="bg text-center">
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.5)  ",
          height: "85vh"
        }}
      >
        <h1
          className="mb-1"
          style={{
            fontFamily: "Comic Sans MS",
            fontSize: 100,
            color: "#1a237e",
            fontWeight: "1000"
          }}
        >
          WELCOME TO
        </h1>
        <h1
          className="mb-1"
          style={{
            fontSize: 100,
            color: "#1a237e",

            fontFamily: "Droid Arabic Kufi"
          }}
        >
          سواليف
        </h1>

        <Link
          to="/login"
          className="btn btn-primary btn-lg"
          style={{
            fontFamily: "Comic Sans MS",
            backgroundColor: "#ffd600 ",
            borderColor: "#1a237e",
            color: "#1a237e"
          }}
        >
          Login
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(Welcome);
