import React, { Component } from "react";
import { connect } from "react-redux";
import Messages from "./Messages";
import { fetchChannel } from "../redux/actions";

class ChannelPage extends Component {
  state = {
    message: "",
    show: false
  };
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        this.props.fetchChannel(this.props.match.params.channelID);
      }, 500);
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const channel = this.props.openedChannel;
    if (channel) {
      const messages = channel.map(messageObject => (
        <Messages
          key={`${messageObject.message} ${messageObject.id} ${messageObject.timestamp}`}
          messageObject={messageObject}
        />
      ));
      return (
        <div className="channel">
          <ul>
            {messages.length > 0 ? (
              messages
            ) : (
              <h3 style={{ color: "white" }}>No messages yet</h3>
            )}
          </ul>
        </div>
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
    fetchChannel: channelID => dispatch(fetchChannel(channelID))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
