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
import Loading from "./Loading";
class Chat extends Component {
  state = {
    message: this.props.msg,
    showemoji: false
  };

  scrollToBottom() {
    var objDiv = document.getElementById("divscroll");
    if (objDiv) {
      objDiv.scrollIntoView({ behavior: "smooth" });
    }
  }
  addEmoji = e => {
    const message = this.state.message + ` ${e.native}`;
    this.setState({ message: message });
    localStorage.setItem(this.props.channelID, message);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
    const msg = event.target.value;
    if (msg) {
      localStorage.setItem(this.props.channelID, msg);
    } else {
      localStorage.removeItem(this.props.channelID);
    }
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
    localStorage.removeItem(this.props.channelID);
  };
  key_up = e => {
    //Key Code for Enter Key
    if (!(e.key === "Enter" && e.shiftKey) && e.key === "Enter") {
      this.handleSubmit(e);
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.msg !== this.props.msg) {
      this.setState({ message: this.props.msg });
    }
  }
  render() {
    const channel = this.props.openedChannel;
    if (channel && !this.props.updated) {
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
            <ul style={{ listStyle: "none" }}>
              {messages.length > 0 ? (
                messages
              ) : (
                <h3 style={{ color: "white" }}>No messages yet</h3>
              )}
            </ul>
            <div id="divscroll"></div>
          </div>

          <div
            style={{
              backgroundColor: "#546e7a",
              height: "100%",
              paddingLeft: "10em",
              paddingBottom: "1em"
            }}
          >
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <textarea
                className=" col-9 rounded mt-2"
                name="message"
                placeholder={`Message ${this.props.name} - Created By ${this.props.owner}`}
                onChange={this.changeHandler}
                value={this.state.message}
                rows="5"
                style={{ resize: "none" }}
                onKeyPress={this.key_up}
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
                    color: "#1c2331",
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
                    <Picker onSelect={this.addEmoji} title="سواليف" />
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
      return <Loading />;
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
