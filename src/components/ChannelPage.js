import React, { Component } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel, sendMsg } from "../redux/actions";

class ChannelPage extends Component {
  /**
   * This state management shouldn't be here
   * Make a separate component for the message form
   */

  state = {
    message: "",
    show: false
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * There's some repetition between `componentDidMount` and `componentDidUpdate`
   *
   * How about a method like:
   *
   * `setFetchMessagesInterval` ?
   */

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    this.props.fetchChannel(channelID);
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined)
        this.props.fetchChannel(this.props.match.params.channelID);
    }, 500);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchChannel(channelID);
      clearInterval(this.interval); // <-- clear first THEN re-fetch
      this.interval = setInterval(() => {
        this.props.fetchChannel(this.props.match.params.channelID);
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  handleSubmit = event => {
    event.preventDefault();

    this.state.message &&
      this.props.sendMsg(
        this.state.message,
        this.props.match.params.channelID,
        this.props.user.username
      );
    this.setState({ message: "" });
  };

  render() {
    const channel = this.props.openedChannel;
    console.log(channel);
    if (channel) {
      const messages = channel.map(messageObject => (
        <Messages
          key={`${messageObject.message} ${messageObject.id} ${messageObject.timestamp}`}
          messageObject={messageObject}
        />
      ));
      return (
        <>
          <div className="channel">
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
                  placeholder={`Message ${this.props.match.params.name}`}
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
  user: state.user,
  openedChannel: state.channels.openedChannel,
  channels: state.channels.channels
});
const mapDispatchToProps = dispatch => {
  return {
    fetchChannel: channelID => dispatch(fetchChannel(channelID)),
    sendMsg: (msg, channelID, user) => dispatch(sendMsg(msg, channelID, user))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
