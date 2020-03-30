import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;

  return (
    <div className="bg text-center ">
      <h1
        className="text-black pt-5"
        style={{
          fontFamily: "Calligraffitti",
          fontSize: "100px",
          color: "#000080"
        }}
      >
        Welcome {user.username}!
      </h1>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.userState.user
});

export default connect(mapStateToProps)(SuperSecretPage);
