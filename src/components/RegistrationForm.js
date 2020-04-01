import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signup } from "../redux/actions";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = e => {
    e.preventDefault();
    this.props.signup(this.state, this.props.history);
  };

  render() {
    if (this.props.user) return <Redirect to="/private" />;
    const { username, password } = this.state;
    return (
      <div className="bgsignup">
        <div className="container-fluid jumbotron bg-transparent text-center align-ceneter">
          <div className=" col-6 mx-auto my-5">
            <div
              className="card my-5"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.6)  ",
                borderRadius: "50px"
              }}
            >
              <div className="card-body">
                <form onSubmit={this.submitHandler}>
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
                      onChange={this.changeHandler}
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
                      onChange={this.changeHandler}
                      style={{ fontFamily: "Comic Sans MS" }}
                    />

                    {this.props.errors ? (
                      <p style={{ color: "red" }}>
                        {this.props.errors.username}
                      </p>
                    ) : (
                      ""
                    )}
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
                    Signup
                  </button>
                  <br />
                  <Link
                    to="/login"
                    className="btn btn-link my-2 my-sm-0"
                    style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                  >
                    Login With an Existing Account
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
    signup: (userData, history) => dispatch(signup(userData, history))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
