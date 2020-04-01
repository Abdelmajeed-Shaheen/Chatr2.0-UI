import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.props.login(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/private" />;
    const { username, password } = this.state;

    return (
      <div className="bglogin">
        <div className="container-fluid jumbotron bg-transparent  text-center align-ceneter">
          <div className=" col-6 mx-auto my-5">
            <div
              className="card my-5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)  ",
                borderRadius: "50px"
              }}
            >
              <div className="card-body">
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label
                      htmlFor="username"
                      style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      name="username"
                      placeholder="Username"
                      onChange={this.handleChange}
                      style={{ fontFamily: "Comic Sans MS" }}
                    />
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="password"
                      style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      name="password"
                      placeholder="Password"
                      onChange={this.handleChange}
                      style={{ fontFamily: "Comic Sans MS" }}
                    />
                    <p style={{ color: "red" }}>
                      {" "}
                      {this.props.errors
                        ? this.props.errors.non_field_errors
                        : ""}
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{
                      fontFamily: "Comic Sans MS",
                      backgroundColor: "#ffd600 ",
                      borderColor: "#1a237e",
                      color: "#1a237e"
                    }}
                  >
                    Login
                  </button>
                  <br />
                  <Link
                    to="/signup"
                    className="btn btn-link my-2 my-sm-0"
                    style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                  >
                    Signup for an account
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.userState.user,
    errors: state.errorsState
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (userData, history) => dispatch(actions.login(userData, history))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
