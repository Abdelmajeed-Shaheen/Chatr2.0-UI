import React, { Component } from "react";
import { connect } from "react-redux";
import Message from "./Message";
import { sendMsg } from "../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import {
  faSmileBeam,
  faArrowDown,
  faArrowAltCircleDown
} from "@fortawesome/free-solid-svg-icons";

class SendForm extends Component {
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
      this.props.sendMsg(
        this.state.message,
        this.props.channelID,
        this.props.user.username
      );
    this.setState({ message: "" });
    setTimeout(() => this.scrollToBottom(), 500);
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

          <div style={{ backgroundColor: "gray", height: "20vh" }}>
            <form className="form-inline" onSubmit={this.handleSubmit}>
              <textarea
                className=" col-9 rounded mt-2"
                name="message"
                placeholder={`Message ${this.props.name}`}
                onChange={this.changeHandler}
                value={this.state.message}
                rows="4"
                style={{ resize: "none", margin: "20px" }}
              ></textarea>
              <div>
                <div className="row ml-2">
                  <div className=" btn">
                    <input
                      className=" btn btn-success btn-block "
                      type="submit"
                      value="Send"
                    />
                  </div>
                </div>
                <div className="row ml-2">
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
                    color: "white"
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
    sendMsg: (msg, channelID, user) => dispatch(sendMsg(msg, channelID, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SendForm);
