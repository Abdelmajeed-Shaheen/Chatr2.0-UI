import React, { Component } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { sendMessage } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  faSmileBeam,
  faArrowAltCircleDown
} from "@fortawesome/free-solid-svg-icons";

class Chat extends Component {
  state = {
    message: "",
    showemoji: false
  };

  scrollToBottom() {
    var objDiv = document.getElementById("divscroll");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }
  addEmoji = e => {
    this.setState({ message: this.state.message + ` ${e.native}` });
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.state.message &&
      this.props.sendMessage(
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
          <div className="channel" id="divscroll">
            <ul style={{ listStyle: "none" }}>
              {messages.length > 0 ? (
                messages
              ) : (
                <h3 style={{ color: "white" }}>No messages yet</h3>
              )}
            </ul>
          </div>

          <div style={{ backgroundColor: "#546e7a", height: "20vh" }}>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <textarea
                className=" col-9 rounded mt-2"
                name="message"
                placeholder={`Message ${this.props.name} - Created By ${this.props.owner}`}
                onChange={this.changeHandler}
                value={this.state.message}
                rows="5"
                style={{ resize: "none" }}
              ></textarea>
              <div>
                <div className="row ml-1">
                  <div className=" btn">
                    <input
                      className=" btn btn-success btn-block "
                      type="submit"
                      value="Send"
                      style={{
                        backgroundColor: "#1c2331",
                        borderColor: "#1c2331"
                      }}
                    />
                  </div>
                </div>
                <div className="row ml-4">
                  <FontAwesomeIcon
                    icon={faSmileBeam}
                    onClick={() =>
                      this.setState({ showemoji: !this.state.showemoji })
                    }
                    style={{ width: "40px", height: "40px", color: "yellow" }}
                  />
                </div>
                <FontAwesomeIcon
                  icon={faArrowAltCircleDown}
                  onClick={() => this.scrollToBottom()}
                  style={{
                    position: "absolute",
                    zIndex: 9,
                    top: "80px",
                    right: "50px",
                    color: "white",
                    height: "30px",
                    width: "30px"
                  }}
                />
                <div
                  style={{
                    float: "left",
                    position: "absolute",
                    zIndex: 9,
                    top: "100px",
                    right: "10px"
                  }}
                >
                  {this.state.showemoji ? (
                    <Picker onSelect={this.addEmoji} />
                  ) : (
                    ""
                  )}
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
    sendMessage: (msg, channelID, user) =>
      dispatch(sendMessage(msg, channelID, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);