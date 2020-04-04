import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Clock from "./Clock";
import Notes from "./Notes";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;
  return (
    <div className="bg text-center ">
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.6)  ",
          height: "85vh"
        }}
      >
        <h1
          className="text-black pt-5"
          style={{
            fontFamily: "Calligraffitti",
            fontSize: "100px",
            color: "#1a237e  ",
            fontWeight: "1000"
          }}
        >
          Welcome {user.username}!
        </h1>

        <div className="row text-center">
          <div className="col-md-6">
            <Notes />
          </div>
          <div className="col-md-6">
            <Clock />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(SuperSecretPage);
