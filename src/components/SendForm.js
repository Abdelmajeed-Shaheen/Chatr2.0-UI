import React, { Component } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { sendMsg } from "../redux/actions";

class SendForm extends Component {
  state = {
    message: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.state.message &&
      this.props.sendMsg(
        this.state.message,
        this.props.channelID,
        this.props.user.username
      );
    this.setState({ message: "" });
  };

  render() {
    const channel = this.props.openedChannel;
    if (channel) {
      const messages = channel.map(messageObject => (
        <Message
          key={`${messageObject.message} ${messageObject.id} ${messageObject.timestamp}`}
          user={this.props.user.username}
          messageObject={messageObject}
        />
      ));
      return (
        <>
          <div className="channel">
            <h4 style={{ color: "red", fontSize: "15px" }} className=" ml-2">
              By {this.props.owner.owner}
            </h4>
            <ul>
              {messages.length > 0 ? (
                messages
              ) : (
                <h3 style={{ color: "white" }}>No messages yet</h3>
              )}
            </ul>
          </div>
          <div style={{ backgroundColor: "grey", height: "20vh" }}>
            <form onSubmit={this.handleSubmit}>
              <div className=" col-12 ">
                <textarea
                  className=" col-9 rounded mt-2"
                  name="message"
                  placeholder={`Message ${this.props.name}`}
                  onChange={this.changeHandler}
                  value={this.state.message}
                  rows="4"
                  style={{ resize: "none" }}
                ></textarea>
                <div className=" btn">
                  <input
                    className=" btn btn-success btn-block "
                    type="submit"
                    value="Send"
                  />
                </div>
              </div>
            </form>
          </div>
        </>
      );
    } else {
      return <div> Not Found </div>;
    }
  }
}
const mapStateToProps = state => ({
  user: state.userState.user,
  openedChannel: state.channelsState.openedChannel,
  channels: state.channelsState.channels
});
const mapDispatchToProps = dispatch => {
  return {
    sendMsg: (msg, channelID, user) => dispatch(sendMsg(msg, channelID, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendForm);
