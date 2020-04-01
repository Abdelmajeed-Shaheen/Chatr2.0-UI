import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

/**
 * Does this really need to be a WHOLE new page?
 * Why not open a modal?
 * Or put the form directly in the sidebar?
 */

class AddChannel extends Component {
  state = {
    name: "",
    image_url: ""
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    this.state.name && this.props.addChannel(this.state, this.props.history);
  };

  render() {
    if (!this.props.user) return <Redirect to="/welcome" />;
    const { name, image_url } = this.state;
    return (
      <div className="bgcreate">
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
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group">
                    <label
                      htmlFor="name"
                      style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                    >
                      Channel Name{" "}
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={name}
                      name="name"
                      placeholder="Add channel"
                      onChange={this.handleChange}
                      style={{ fontFamily: "Comic Sans MS" }}
                      required
                    />
                    <p style={{ color: "red" }}>
                      {this.props.errors ? this.props.errors["name"][0] : ""}
                    </p>
                  </div>
                  <div className="form-group">
                    <label
                      htmlFor="image_url"
                      style={{ fontFamily: "Comic Sans MS", color: "#1a237e" }}
                    >
                      Logo Image{" "}
                    </label>
                    <input
                      type="image_url"
                      className="form-control"
                      id="image_url"
                      value={image_url}
                      name="image_url"
                      placeholder="Add Url"
                      onChange={this.handleChange}
                      style={{ fontFamily: "Comic Sans MS" }}
                    />
                    <p style={{ color: "red" }}>
                      {this.props.errors ? this.props.errors.image_url : ""}
                    </p>
                  </div>
                  <div className="text-center">
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
                      Create
                    </button>
                  </div>
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
    addChannel: (channel, history) =>
      dispatch(actions.addChannel(channel, history))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(AddChannel);
