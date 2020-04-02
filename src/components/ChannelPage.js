import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchMessages, clearMessages } from "../redux/actions";
import Chat from "./Chat";

class ChannelPage extends Component {
  state = {
    updated: true
  };
  scrollToBottom() {
    var objDiv = document.getElementById("divscroll");
    if (objDiv) {
      objDiv.scrollTop = objDiv.scrollHeight;
    }
  }

  setFetchMessagesInterval(channelID) {
    this.props.fetchMessages(channelID, "");
    this.interval = setInterval(() => {
      if (this.props.match.params.channelID !== undefined) {
        const msg = this.props.openedChannel;
        const lastmsg = msg[msg.length - 1];
        const timestamp = lastmsg.timestamp;
        this.props.fetchMessages(this.props.match.params.channelID, timestamp);
      }
    }, 3000);
  }

  componentDidMount() {
    const channelID = this.props.match.params.channelID;
    setTimeout(() => this.setState({ updated: false }), 3000);
    this.setFetchMessagesInterval(channelID);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;

    if (prevProps.match.params.channelID !== channelID) {
      this.setState({ updated: true });
      clearInterval(this.interval);
      this.props.clearMessages();
      this.setFetchMessagesInterval(channelID);
      setTimeout(() => this.setState({ updated: false }), 3000);
      setTimeout(() => this.scrollToBottom(), 3500);
    }
    if (prevProps.openedChannel !== null) {
      if (prevProps.openedChannel.length !== this.props.openedChannel.length) {
        setTimeout(() => this.scrollToBottom(), 1000);
      }
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const channel = this.props.channels.find(
      channel => channel.name === this.props.match.params.name
    );
    const owner = channel ? channel.owner : "";
    return (
      <>
        {!this.props.user ? (
          <Redirect to="/login" />
        ) : (
          <Chat
            owner={owner}
            name={this.props.match.params.name}
            channelID={this.props.match.params.channelID}
            updated={this.state.updated}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = state => ({
  user: state.userState.user,
  openedChannel: state.channelsState.openedChannel,
  channels: state.channelsState.channels,
  channelid: state.channelsState.channelid
});

const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (channelID, timestamp) =>
      dispatch(fetchMessages(channelID, timestamp)),
    clearMessages: () => dispatch(clearMessages())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ChannelPage);
